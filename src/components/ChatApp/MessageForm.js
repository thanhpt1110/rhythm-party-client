import React, { useState } from 'react'

const MessageForm = () => {
  const [value, setValue] = useState("");
  const handleSendMessage = (e) =>{
    e.preventDefault();
    console.log(value);
    setValue("");
  }
  return (
    <div className="bg-[#181818] fixed bottom-20 w-[70%] py-6 shadow-lg ">
      <form onSubmit={handleSendMessage} className="containerWrap px-2 flex flex-row h-10 ">
          <input value={value} onChange={ e => setValue(e.target.value)} className=" focus:outline-none bg-[#2B3440]  w-full px-4 rounded" type="text" />
          <button type="submit" className=" bg-gray-500 text-white rounded-r px-5 text-sm font-semibold">Send</button>
      </form>
    </div>
  );
}

export default MessageForm
