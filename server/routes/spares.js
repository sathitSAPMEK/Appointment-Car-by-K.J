const router = require("express").Router();
const { firestoreDB } = require("../config");
const { resSucess, resError } = require("../modules/sender");
const { datetimeNow } = require("../modules/dateTimeCalculator");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const DIR = "./public/uploads/spares";

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

router.post("/spares", upload.single("profileImg"), (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  var body = req.body;
  body["linkImage"] = url + "/uploads/spares/" + req.file.filename;

  firestoreDB
    .collection("spares")
    .add(body)
    .then((docRef) => {
      resSucess(res, 200, "", `Add Data and Upload Picture Successfully! REF: ${docRef.id}`);
    })
    .catch((error) => {
      console.log(error);
      resError(res, 400, "Can`t Add Spares Please Try Again");
    });
});

router.get("/getAll", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("spares");
    let data = await dataCategory.get();
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

router.get("/categoryAll", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("category_spares");
    let data = await dataCategory.get();
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

router.put("/edit", async (req, res) => {
  const data = req.body;
  console.log(data);
  // delete req.body.id;
  try {
    await firestoreDB
      .collection("spares")
      .doc(data.id)
      .update(data);
    resSucess(res, 200, "", `Update Success Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Update Success Please Try Again");
  }
});

router.delete("/delete/:spares", async (req, res) => {
  const sparesId = req.params.spares;
  try {
    await firestoreDB.collection("spares").doc(sparesId).delete();
    resSucess(res, 200, "", `Delete Spares Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Delete Spares Please Try Again");
  }
});

module.exports = router;
