import React from 'react'
import Message from './Message'

const ChatBox = () => {

  const messages =[
    {
      id: 1,
      text : 'Hello world',
      name : 'DungLe',
    },
    {
      id: 2,
      text : 'Hi',
      name : 'BiBi',
    },
    {
      id: 3,
      text : 'Nice to see you',
      name : 'Lunaa',
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
