import React, {useState, useContext, useEffect} from "react";
import { updateViewMusic } from "../api/MusicApi";
const RoomContext = React.createContext();

export function useRoomContext(){
    return useContext(RoomContext)
}
export const RoomContextProvider = (props) => {
    const [musicCurrent, setMusicCurrent] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [listOfSong, setListOfSong] = useState([])
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const setMusic = async (song) =>{
        setMusicCurrent(song);
       //await updateViewMusic(song._id);
    }
    const cleanRoom = ()=>{
        setMusicCurrent(null);
        setIsPlaying(false);
        setListOfSong([]);
    }
    const value = {
        musicCurrent,
        setMusicCurrent,
        isPlaying,
        setIsPlaying,
        listOfSong,
        setListOfSong,updatePlaylist,setUpdatePlaylist,cleanRoom
    }
    return (
        <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>
    )
}
