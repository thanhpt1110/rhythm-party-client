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
const getTop20Playlist = async() =>{
    return await api.get('/api/playlist/top-playlist')
}
const getPlaylistById = async(id)=>{
    return await api.get(`/api/playlist/${id}`)
}
const updatePlaylistById = async(updatePlaylist,id)=>{
    return await api.put(`/api/playlist/${id}`,updatePlaylist)
}
export {createPlaylist,addMusicToPlaylist,removeMusicFromPlaylist,getPlaylistCurrentUser
    ,getTop20Playlist,getPlaylistById, updatePlaylistById};
