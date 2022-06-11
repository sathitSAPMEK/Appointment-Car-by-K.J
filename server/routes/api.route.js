const router = require('express').Router();
const { firestoreDB } = require('../config');
const { resSucess, resError } = require("../modules/sender");

router.get('/', async (req, res, next) => {  
  res.send({ message: 'Hello API Data Phet Garage 🚩' });
});

router.get("/getStatus", async (req, res) => {
  try {
    let dataCategory = firestoreDB.collection("status");
    let data = await dataCategory.orderBy('status_id', 'asc').get();
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

router.get("/getDetailBill/:ap_code", async (req, res) => {
  try {

    let apointmentCode = req.params.ap_code;

    const getAppointment = async () =>{
      try {
        let dataAppointment = await firestoreDB.collection("appointment").where('ap_code', '==', apointmentCode).limit(1).get();
        let list = dataAppointment.docs.map((doc, index) => ({
          index: index + 1,
          id: doc.id,
          ...doc.data(),
        }));
        return list
      } catch (error) {
        console.log(error);
        resError(res, 400, "Can't Get Data Bill Appointment Please Try Again!!");
      }
    }

    const getAppointmentDetail = async () =>{
      try {
        let dataAppointment = await firestoreDB.collection("appointments_detail").where('ap_code', '==', apointmentCode).limit(1).get();
        let list = dataAppointment.docs.map((doc, index) => ({
          index: index + 1,
          id: doc.id,
          ...doc.data(),
        }));
        return list
      } catch (error) {
        console.log(error);
        resError(res, 400, "Can't Get Data Bill Appointment Please Try Again!!");
      }
    }

    resSucess(res, 200, {
      appointment: await getAppointment(),
      appointmentDetail: await getAppointmentDetail()
    }, 'Get Data Appointment Success!');
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can't Get Data Bill Please Try Again!!");
  }
});
module.exports = router;
