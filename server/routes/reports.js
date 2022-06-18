const router = require('express').Router();
const { firestoreDB } = require('../config');
const { resSucess, resError } = require("../modules/sender");
const { dateNow, formatDate } = require("../modules/dateTimeCalculator");

router.get('/', async (req, res, next) => {  
  res.send({ message: 'Hello Report 🚩' });
});

router.get("/getAppointment", async (req, res) => {
  try {
    var { dateStart, dateEnd } = req.query;
    let dataCategory = firestoreDB.collection("appointment").where('status', 'in', ['2','3']);
    let data = await dataCategory.get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
      dateAppointment: formatDate(doc.data().date_appointment)
    })).filter(item => new Date(dateStart) <= new Date(item.dateAppointment) && new Date(dateEnd) >= new Date(item.dateAppointment))
    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});
module.exports = router;
