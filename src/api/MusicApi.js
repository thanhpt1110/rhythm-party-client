import api from "./Api"
const sendMessage = async(message,id)=>{
    return await api.post(`/api/music/music-message/${id}`,message);
}
const getMusicByID = async(id)=>{
    return await api.get(`/api/music/${id}`);
}
const updateViewMusic = async(id)=>{
    return await api.get(`/api/music/listen/${id}`)
}
const getTop20Music = async()=>{
   return await api.get('/api/music/top-music?quantity=20&index=0')
}
export {sendMessage,getMusicByID,updateViewMusic,getTop20Music};