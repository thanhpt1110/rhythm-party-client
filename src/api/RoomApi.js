import api from "./Api";
const getCurrentRoomMusic = async()=>{
    return await api.get('/api/room');
}
const postNewRoom = async(room)=>{
    return await api.post('/api/room',room);
}
const addNewMusic = async(musicID, id)=>
{
    return await api.put(`/api/room/post-music/${id}`,{musicId: musicID})
}
const removeMusicFromRoom = async(musicID, id)=>{
    return await api.put(`/api/room/remove-music/${id}`, {musicId: musicID})
}
const getRoomById = async(id)=>{
    return await api.get(`/api/room/${id}`)
}
const uploadMessage = async(message, id) =>
{
    return await api.put(`/api/room/message/${id}`,message)
}
export {getCurrentRoomMusic, postNewRoom, addNewMusic
    ,removeMusicFromRoom, getRoomById, uploadMessage}