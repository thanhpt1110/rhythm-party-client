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
const deleteMusicByID = async(id)=>{
    return await api.delete(`/api/music/${id}`)
 }
const searchMusicByName = async(musicName) =>{
    return await api.get(`/api/music/search?music_name=${musicName}`)
}
const getTop6Music = async()=>{
    return await api.get('/api/music/top-music?quatity=6&index=0')
} 
const search6MusicByName = async(musicName) =>{
    return await api.get(`/api/music/search?music_name=${musicName}&quantity=6`)
}
export {sendMessage,getMusicByID,updateViewMusic,getTop20Music,deleteMusicByID,searchMusicByName, getTop6Music, search6MusicByName};