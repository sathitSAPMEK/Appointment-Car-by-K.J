const router = require('express').Router();
const { firestoreDB } = require('../config');
const { resSucess, resError } = require("../modules/sender");
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {  
  // console.log(req.body)
  
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

  let userNameCheck = await checkUserName(req.body.userName);
  
  if(userNameCheck.length == 0){
    
    let { firstName, lastName, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let payload = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: hashedPassword,
      role: 'user',
    }

    console.log(payload);

    firestoreDB
    .collection("users")
    .add(payload)
    .then((docRef) => {
      resSucess(res, 200, "", `Register User Successfully REF: ${docRef.id}`);
    })
    .catch((error) => {
      console.log(error);
      resError(res, 400, "Can`t Register User Please Try Again");
    });

  }else{
    resSucess(res, 201, '', 'User Name is Already Please New User Name!')
  }
});

module.exports = router;
