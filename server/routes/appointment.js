const router = require("express").Router();
const { firestoreDB } = require("../config");
const { resSucess, resError } = require("../modules/sender");
const {
  formatDateNowToMonth,
  fromatToDateMonth,
  formatDate
} = require("../modules/dateTimeCalculator");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const DIR = "./public/uploads/appointments";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/add", upload.array("profileImg"), (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  var body = req.body;

  let files = req.files;
  let listPictureName = files.map((item) => {
    return `${url}/uploads/appointments/${item.filename}`;
  });

  body["linkImage"] = listPictureName;

  firestoreDB
    .collection("appointment")
    .add(body)
    .then((docRef) => {
      resSucess(
        res,
        200,
        "",
        `Add Appointment and Upload Picture Successfully! REF: ${docRef.id}`
      );
    })
    .catch((error) => {
      console.log(error);
      resError(res, 400, "Can`t Add Appointment Please Try Again");
    });
});

router.post('/checkMaxAppointment', async(req, res) =>{
  let { dateAppointment } = req.body;
  // dateAppointment = 'Fri Jun 24 2022 00:05:11 GMT+0700 (Indochina Time)'
  try {
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory.orderBy("created", "desc").get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
      dateAppointment: formatDate(doc.data().date_appointment)
    })).filter((item) => item.dateAppointment === formatDate(dateAppointment))
    resSucess(res, 200, list.length, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
})

router.post("/addAppointment", async (req, res) => {
  console.log(req.body);
  let {
    id,
    ap_code,
    firstName,
    lastName,
    listItemAppointment,
    appointmentDetail,
    charge,
    created,
    updated,
  } = req.body;

  let sumTotal = listItemAppointment.reduce((sumTotal, item) => {
    let sumPrice = item.quantity * item.price;
    return sumTotal + sumPrice;
  }, 0);

  let playLoad = {
    id_appointment: id,
    ap_code: ap_code,
    fullName: `${firstName} ${lastName}`,
    appointmentDetail: listItemAppointment,
    created: created,
    updated: updated,
  };

  await firestoreDB
    .collection("appointments_detail")
    .add(playLoad)
    .then(async (docRef) => {
      await firestoreDB
        .collection("appointment")
        .doc(id)
        .update({
          total_charge: Number(sumTotal) + Number(charge),
          charge: charge,           
          remarkAppointment: appointmentDetail,
          status: '2'
        });
      resSucess(
        res,
        200,
        "",
        `Add Appointment and Upload Picture Successfully! REF: ${docRef.id}`
      );
    })
    .catch((error) => {
      console.log(error);
      resError(res, 400, "Can`t Add Appointment Please Try Again");
    });
});

router.get("/getAll", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory.orderBy("created", "desc").get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    }));
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/getList", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");

    let data = await dataCategory.where("status", "not-in", ["2", "3"]).get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    }));
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/getList/:userName", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");

    let data = await dataCategory.where("status", "not-in", ["2", "3"]).get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    })).filter((item) => item.user_id === req.params.userName)
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/getSuccess", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");

    let data = await dataCategory.where("status", "in", ["2", "3"]).get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    }));
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/getSuccess/:userName", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");

    let data = await dataCategory.where("status", "in", ["2", "3"]).get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    })).filter((item) => item.user_id === req.params.userName)
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/getAppointment", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory.orderBy("created", "desc").get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      // start: new Date(doc.data().date_appointment),
      // end: new Date(doc.data().date_appointment),
      start: doc.data().date_appointment,
      end: doc.data().date_appointment,
      title: `คุณ${doc.data().first_name} ${doc.data().last_name} ${
        doc.data().ap_code
      }`,
    }));

    console.log(list);
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.put("/edit", async (req, res) => {
  const data = req.body;
  console.log(data);
  // delete req.body.id;
  try {
    await firestoreDB.collection("appointment").doc(data.id).update(data);
    resSucess(res, 200, "", `Update Appointment Success Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Update Appointment Success Please Try Again");
  }
});

router.delete("/delete/:appointment", async (req, res) => {
  const appointmentId = req.params.appointment;
  try {
    await firestoreDB.collection("appointment").doc(appointmentId).delete();
    resSucess(res, 200, "", `Delete Appointment Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Delete Appointment Please Try Again");
  }
});

router.put("/update/sataus", async (req, res) => {
  const data = req.body;
  try {
    await firestoreDB.collection("appointment").doc(data.id).update(data);
    resSucess(res, 200, "", `Update Status Appointment Success Successfully`);
  } catch (error) {
    console.log(error);
    resError(
      res,
      400,
      "Can`t Update Status Appointment Success Please Try Again"
    );
  }
});

router.get("/getAppointmentDashboardUser/:userName", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory
      .where("user_id", "==", req.params.userName)
      .get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      start: new Date(doc.data().date_appointment),
      end: new Date(doc.data().date_appointment),
      title: `คุณ${doc.data().first_name} ${doc.data().last_name} ${
        doc.data().ap_code
      }`,
      ...doc.data(),
    }));

    console.log(list);
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/summaryDashboard", async (req, res) => {
  try {
    let dateNowMonth = formatDateNowToMonth();
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory.get();
    let list = data.docs
      .map((doc, index) => ({
        index: index + 1,
        id: doc.id,
        ...doc.data(),
        formatMonth: fromatToDateMonth(new Date(doc.data().date_appointment)),
      }))
      .filter((item) => item.formatMonth === dateNowMonth);

    let countFix = list.filter((item) => item.status === "1");
    let countSuccess = list.filter((item) => item.status === "2");
    let totalCharge = list.reduce((sumPrice, item) => sumPrice + Number(isNaN(item.total_charge) ? 0 : item.total_charge), 0);
    console.log(totalCharge);
    resSucess(res, 200, {
      total: list.length,
      countFix: countFix.length,
      countSuccess: countSuccess.length,
      totalCharge: totalCharge
    }, "Get Data OK");
    
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

router.get("/summaryDashboard/:userName", async (req, res) => {
  try {
    let dateNowMonth = formatDateNowToMonth();
    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory
      .where("user_id", "==", req.params.userName)
      .get();
    let list = data.docs
      .map((doc, index) => ({
        index: index + 1,
        id: doc.id,
        ...doc.data(),
        formatMonth: fromatToDateMonth(new Date(doc.data().date_appointment)),
      }))
      .filter((item) => item.formatMonth === dateNowMonth);

    let countFix = list.filter((item) => item.status === "1");
    let countSuccess = list.filter((item) => item.status === "2");
    let totalCharge = list.reduce((sumPrice, item) => sumPrice + Number(isNaN(item.total_charge) ? 0 : item.total_charge), 0);
    resSucess(res, 200, {
      total: list.length,
      countFix: countFix.length,
      countSuccess: countSuccess.length,
      totalCharge: totalCharge
    }, "Get Data OK");

  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});

module.exports = router;
