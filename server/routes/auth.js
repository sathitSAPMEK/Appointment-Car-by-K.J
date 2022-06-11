const router = require('express').Router();
const bcrypt = require('bcrypt');
const { firestoreDB } = require('../config');
const { resSucess, resError } = require("../modules/sender");

router.post('/', async (req, res, next) => {    

  const { userName, password } = req.body;

  const checkUserName = async(userName) =>{
    return new Promise(async (resolve, reject) =>{
      try {
        let dataCategory = await firestoreDB.collection("users").where('userName', '==', userName).get();            
        let list = dataCategory.docs.map((doc, index) => ({
          index: index + 1,
          id: doc.id,
          ...doc.data(),
        }));      
        resolve(list);
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
  
  let userNameCheck = await checkUserName(userName);

  if(userNameCheck.length > 0){
    let encode = await bcrypt.compare(password, userNameCheck[0].password)
    if(encode){
      req.session.isLoggedIn = true;
      console.log(req.session);
      resSucess(res, 200, userNameCheck[0], 'Login Successfully!');  
    }else{
      resError(res, 404, 'User Name Or Password Not Found Please Try Again!');
    }
  }else{
    resError(res, 404, 'User Name Or Password Not Found Please Try Again!');
  }  
});

module.exports = router;
