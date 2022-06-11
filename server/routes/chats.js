const router = require("express").Router();
const { firestoreDB, firebaseDbRealtime } = require("../config");
const { resSucess, resError } = require("../modules/sender");
const { datetimeNow } = require("../modules/dateTimeCalculator");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  res.status(200).json(uuidv4());
});

router.get("/userAll", async (req, res) => {
  try {
    let dataCategory = firestoreDB
      .collection("users")
      .where("role", "!=", "admin");
    let data = await dataCategory.get();
    let list = data.docs.map((doc, index) => ({
      index: index + 1,
      id: doc.id,
      ...doc.data(),
    }));
    resSucess(res, 200, list, "Get User Data OK");
  } catch (error) {
    console.log(error);
    resError(res, 400, "Something Wrong");
  }  
});

router.get("/user/:user_id", async (req, res) => {
  await firebaseDbRealtime
    .ref(`/userChats/${req.params.user_id}`)
    .once("value", async (snapshot) => {
      const userChats = snapshot.val();      
      try {
        let chatId = userChats.chatUID;
        await firebaseDbRealtime
          .ref(`/chatMessages/${chatId}`)                          
          .on("value", (snapshotMessage) => {
            const dataChats = snapshotMessage.val();
            const setDataChat = [];

            for (i in dataChats) {
              setDataChat.push(dataChats[i]);
            }

            res.status(200).json({
              status: 200,
              data: setDataChat,
              message: "Get Data OK!",
            });
          });
      } catch (error) {
        res.status(200).json({
          status: 200,
          data: [],
          message: "Chat ID Not Found!",
        });
      }
    });  
});

router.post("/createChat", async (req, res) => {
  const { userName, message, oldMessage } = req.body;

  const admin = `admin_admin`;
  const messageId = uuidv4();

  // let member = `user_user2`;
  // let chatId = '6ee6c4fa-29e6-410a-a747-7adf320dd3ce';

  const CheckUserChat = async () => {
    return new Promise((resolve, reject) => {
      try {        
        firebaseDbRealtime
          .ref(`/userChats/${userName}`)
          .once("value", (snapshotMessage) => {            
            resolve(snapshotMessage.val());
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const createUserChat = async (chatId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create User Chat
        await firebaseDbRealtime.ref(`userChats/${userName}`).set({
          chatUID: chatId,
        });
        resolve("Create User Chat Success");
      } catch (error) {
        reject(error);
      }
    });
  };

  const createChat = async (chatId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create Chats
        await firebaseDbRealtime.ref(`chats/${chatId}`).set({
          members: [userName, admin],
          lastMessageSents: messageId,
        });
        resolve("Create Chat Success");
      } catch (error) {
        reject(error);
      }
    });
  };

  const createMessage = async (chatId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create Chat Message
        // await firebaseDbRealtime
        //   .ref(`chatMessages/${chatId}/${messageId}`)
        //   .set({
        //     chatId: chatId,
        //     messageId: messageId,
        //     message: message,
        //   });

        await firebaseDbRealtime
          .ref(`chatMessages/${chatId}`)
          .set({
            // chatId: chatId,
            messages: [...oldMessage, message ],            
          });
        resolve("Create Message Success");
      } catch (error) {
        reject(error);
      }
    });
  };

  await CheckUserChat().then(async (result) => {
    console.log(result);
    if (result === null) {
      chatId = uuidv4();
    } else {
      chatId = result.chatUID;    
    }

    await Promise.all([
      createUserChat(chatId),
      createChat(chatId),
      createMessage(chatId),
    ]).then((result) => {
      console.log(result);      
      res.send('success')
      res.end()
    });
  });  
});

module.exports = router;
