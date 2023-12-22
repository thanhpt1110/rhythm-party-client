import api from "./Api"
const sendMessage = async(message,id)=>{
    return await api.post(`/api/music//music-message/${id}`,message);
}
const getMusicByID = async(id)=>{
    return await api.get(`/api/music/${id}`);
}
export {sendMessage,getMusicByID};