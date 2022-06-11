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
    // var setDataSendToClient = [];

    // dateStart = '2022-05-23'
    // dateEnd = '2022-05-23'

    let dataCategory = firestoreDB.collection("appointment");
    let data = await dataCategory.get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
      dateAppointment: formatDate(doc.data().date_appointment)
    })).filter(item => new Date(dateStart) <= new Date(item.dateAppointment) && new Date(dateEnd) >= new Date(item.dateAppointment))

    // .filter(item => new Date(item.date_appointment) >= new Date(dateStart) && new Date(item.date_appointment) >= new Date(dateEnd))

    console.log(list);

    resSucess(res, 200, list, "Get Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }
});
module.exports = router;
