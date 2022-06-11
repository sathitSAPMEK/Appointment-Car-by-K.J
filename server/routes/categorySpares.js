const router = require("express").Router();
const { firestoreDB } = require("../config");
const { resSucess, resError } = require("../modules/sender");
const { datetimeNow } = require("../modules/dateTimeCalculator");

router.get("/", async (req, res, next) => {
  res.send({ message: "Hello API Data Phet Garage 🚩" });
});

router.get("/getAll", async (req, res) => {
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

router.post("/add", async (req, res) => {
  const body = req.body;
  firestoreDB
    .collection("category_spares")
    .add(body)
    .then((docRef) => {
      resSucess(res, 200, "", `Add Category Successfully REF: ${docRef.id}`);
    })
    .catch((error) => {
      console.log(error);
      resError(res, 400, "Can`t Add Category Please Try Again");
    });
});

router.put("/edit", async (req, res) => {
  const data = req.body;
  console.log(data);
  delete req.body.id;
  try {
    await firestoreDB
      .collection("category_spares")
      .doc(data.categoryId)
      .update(data);
    resSucess(res, 200, "", `Update Category Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Update Category Please Try Again");
  }
});

router.delete("/delete/:categoryID", async (req, res) => {
  const categoryID = req.params.categoryID;
  try {
    await firestoreDB.collection("category_spares").doc(categoryID).delete();
    resSucess(res, 200, "", `Delete Category Successfully`);
  } catch (error) {
    console.log(error);
    resError(res, 400, "Can`t Delete Category Please Try Again");
  }
});

module.exports = router;
