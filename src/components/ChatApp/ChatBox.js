import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'

const ChatBox = ({messages}) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className='containerWrap  '>
      {messages.map((message, index) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}
export default ChatBox
