import React, { useState, useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CModalHeader, CModal, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

// Import CoreUI
import { CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import userLogo from 'src/assets/images/logo/user.jpg'
import adminLogo from 'src/assets/images/logo/admin.png'

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
  InfoButton,
} from '@chatscope/chat-ui-kit-react'

import cookie from 'react-cookies'

// Import Component Date Format
import dateFormat from 'src/components/date/dateFormat'
import Axios from 'axios'
import { firebaseDbRealtime } from 'src/config/configFirebaseRealtime'

import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

const Chat = () => {
  const user01 = 'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'

  const [userName, setUserName] = useState(cookie.load('userId').userName)

  const [messageInputValue, setMessageInputValue] = useState('')

  const [showContent, setShowContent] = useState(false)

  const [getMessage, setGetMessage] = useState(false)

  const [message, setMessages] = useState([])

  // Fetch Data Chat Message
  useEffect(() => {
    const fetdata = async () => {
      firebaseDbRealtime.ref(`/userChats/${userName}`).once('value', async (snapshot) => {
        const userChats = snapshot.val()
        if (userChats === null) {
          setMessages([])
        } else {
          let chatId = userChats.chatUID
          await firebaseDbRealtime.ref(`/chatMessages/${chatId}`).on('value', (snapshotMessage) => {
            const dataChats = snapshotMessage.val()
            // const setDataChat = []

            // for (let i in dataChats) {
            //   setDataChat.push(dataChats[i])
            // }

            console.log(dataChats.messages)

            setMessages(dataChats.messages)
            setShowContent(true)
          })
        }
      })
    }
    fetdata()
  }, [getMessage])

  const newMessage = (newMessage) => {
    let payload = {
      userName: userName,
      message: {
        message: newMessage,
        messageDate: dateFormat('dateFormat', 'dd/MM/yyyy'),
        messageTime: dateFormat('dateFormat', 'HH/mm/ss'),
        sentBy: 'user',
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

  return (
    <div
      style={{
        height: '550px',
      }}
    >
      <ChatContainer>
        <ConversationHeader>
          <Avatar src={adminLogo} name="Admin" />
          <ConversationHeader.Content userName="Admin" info="Active 10 mins ago" />
          <ConversationHeader.Actions>
            <VoiceCallButton />
            <VideoCallButton />
            <InfoButton />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content={userName + 'is typing'} />}
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
                      // direction: 'outgoing',
                      direction: item.sentBy === 'admin' ? 'incoming' : 'outgoing',
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
    </div>
  )
}

export default Chat
