import React, { useState, useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CModalHeader, CModal, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

import userLogo from 'src/assets/images/logo/user.jpg'
import adminLogo from 'src/assets/images/logo/admin.png'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'
import Axios from 'axios'
import { firebaseDbRealtime } from 'src/config/configFirebaseRealtime'

// Import CoreUI
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Sidebar,
  Search,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  EllipsisButton,
  VideoCallButton,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

const Chat = () => {
  const user01 = 'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'
  // Set initial message input value to an empty string
  const [messageInputValue, setMessageInputValue] = useState('')

  const [listUser_, setlistUser_] = useState([])
  const [listUser, setlistUser] = useState([])
  const [showListUser, setShowListUser] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const [getMessage, setGetMessage] = useState(false)

  const [searchUser, setSearchUser] = useState('')

  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessages] = useState([])

  // Fetch Data User
  useEffect(() => {
    const fetdata = async () => {
      await fetch('http://localhost:3001/chats/userAll')
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setlistUser(data.data)
          setlistUser_(data.data)
          setShowListUser(true)
        })
    }
    fetdata()
  }, [])

  // Fetch Data Chat Message
  useEffect(() => {
    const fetdata = async () => {
      if (userName !== '') {
        console.log(userName)
        firebaseDbRealtime.ref(`/userChats/${userName}`).once('value', async (snapshot) => {
          const userChats = snapshot.val()
          if (userChats === null) {
            setMessages([])
          } else {
            let chatId = userChats.chatUID
            await firebaseDbRealtime
              .ref(`/chatMessages/${chatId}`)
              .on('value', (snapshotMessage) => {
                const dataChats = snapshotMessage.val()
                // const setDataChat = []

                // for (let i in dataChats) {
                //   setDataChat.push(dataChats[i])
                // }

                setMessages(dataChats.messages)
              })
          }
        })

        // await fetch(`http://localhost:3001/chats/user/${userName}`)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data.data)
        //     setMessages(data.data)
        //   })
      }
    }
    fetdata()
  }, [getMessage, userName])

  const selectUser = (userName) => {
    setUserName(userName)
    setShowContent(true)
  }

  const newMessage = (newMessage) => {
    // setMessages(...message, {
    //   message: newMessage,
    //   messageDate: '10/10/2019',
    //   messageTime: '10:16pm',
    //   sentBy: 'admin',
    // })

    let payload = {
      userName: userName,
      message: {
        message: newMessage,
        messageDate: dateFormat('dateFormat', 'dd/MM/yyyy'),
        messageTime: dateFormat('dateFormat', 'HH/mm/ss'),
        sentBy: 'admin',
      },
      oldMessage: message,
    }

    console.log(payload)

    Axios.post('http://localhost:3001/chats/createChat', payload)
      .then((result) => {
        console.log(result)
        setGetMessage(!getMessage)
        console.log(message)
      })
      .catch((error) => {
        console.log(error)
      })
    setMessageInputValue('')
  }

  const filterSearchUser = (valueSearch) => {
    setSearchUser(valueSearch)
    setlistUser(
      listUser_
        .map((item) => {
          valueSearch = valueSearch.toLowerCase().trim()
          let itemSearch = (item.firstName + item.lastName).toLowerCase().trim()
          if (itemSearch.indexOf(valueSearch) > -1 === true) {
            return item
          } else {
            return ''
          }
        })
        .filter((item) => item !== ''),
    )

    if (valueSearch === '') {
      setlistUser(listUser_)
    }
  }

  return (
    <div
      style={{
        height: '550px',
        position: 'relative',
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true}>
          <Search
            placeholder="Search..."
            value={searchUser}
            onChange={(value) => filterSearchUser(value)}
            onClearClick={() => {
              setSearchUser('')
              setlistUser(listUser_)
            }}
          />
          <ConversationList>
            {showListUser &&
              listUser.map((item, index) => {
                return (
                  <Conversation
                    key={index}
                    name={item.firstName + ' ' + item.lastName}
                    // lastSenderName="test"
                    // info="Yes i can do it for you"
                    onClick={() => {
                      selectUser(item.userName)
                      setFullName(item.firstName + ' ' + item.lastName)
                    }}
                  >
                    <Avatar src={userLogo} name={item.userName} status="available" />
                  </Conversation>
                )
              })}
          </ConversationList>
        </Sidebar>

        {showContent && (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={userLogo} name={fullName} />
              <ConversationHeader.Content userName={fullName} info="Active 10 mins ago" />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <EllipsisButton orientation="vertical" />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content={fullName + 'is typing'} />}
              // loading
            >
              {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
              {message.length > 0
                ? message.map((item, index) => {
                    return (
                      <Message
                        key={index}
                        model={{
                          message: item.message,
                          sentTime: '15 mins ago',
                          sender: 'Patrik',
                          direction: item.sentBy === 'admin' ? 'outgoing' : 'incoming',
                          position: 'last',
                        }}
                      >
                        <Avatar src={item.sentBy === 'admin' ? adminLogo : userLogo} name="Zoe" />
                      </Message>
                    )
                  })
                : ''}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              // onChange={(e) => setMessageInputValue(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  newMessage(messageInputValue)
                }
              }}
            />
          </ChatContainer>
        )}
      </MainContainer>
    </div>
  )
}

export default Chat
