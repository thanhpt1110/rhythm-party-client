import api from "./Api";
const createPlaylist = async(playlist)=>{
    return await api.post(`/api/playlist`,playlist);
}
const addMusicToPlaylist = async(musicId,playlistId)=>{
    const music = {musicId: musicId};
    return await api.put(`/api/playlist/add-music/${playlistId}`,music);
}
const removeMusicFromPlaylist = async(musicId,playlistId)=>{
    const music = {musicId: musicId};
    return await api.put(`/api/playlist/remove-music/${playlistId}`,music);
}
const getPlaylistCurrentUser = async() =>{
    return await api.get('/api/playlist')
}
export {createPlaylist,addMusicToPlaylist,removeMusicFromPlaylist,getPlaylistCurrentUser};
