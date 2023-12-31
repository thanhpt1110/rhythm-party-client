import React, { useState } from 'react'
import { uploadMessage } from '../../api/RoomApi';
import { useAuth } from '../../utils/AuthContext';

const MessageForm = ({idRoom, onAddMessage}) => {
  const [message, setMessage] = useState("");
  const {authUser,socket} = useAuth();

  const handleSendMessage = async(e) =>{
    e.preventDefault();
    try{
      const sendMessage = {
        message: message
      }
      const respone = await uploadMessage(sendMessage, idRoom)
      if(respone.status===200)
      {
        respone.roomId = idRoom
        onAddMessage(respone);
        setMessage("")
        socket.emit("send_message_room",respone)
      }
    }
    catch(e)
    {
      console.log(e)
    }
  }
  return (
    <div className="bg-[#181818] fixed bottom-20 w-[70%] py-6 shadow-lg ">
      <form onSubmit={handleSendMessage} className="containerWrap px-2 flex flex-row h-10 ">
          <input value={message} onChange={ e => setMessage(e.target.value)} className=" focus:outline-none bg-[#2B3440]  w-full px-4 rounded" type="text" />
          <button type="submit" className=" bg-gray-500 text-white rounded-r px-5 text-sm font-semibold">Send</button>
      </form>
    </div>
  );
}

export default MessageForm
