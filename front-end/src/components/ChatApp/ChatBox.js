import React from 'react'
import Message from './Message'

const ChatBox = () => {

  const messages =[
    {
      id: 1,
      message : 'Hello world'
    },
    {
      id: 2,
      message : 'Hi'
    },
    {
      id: 3,
      message : 'Nice to see you'
    },
  ]
  return (
    <div className='containerWrap pb-20'>
      {messages.map(message =>(
        <Message key={message.id} message={message}/>
      ))}
    </div>
  )
}

export default ChatBox
