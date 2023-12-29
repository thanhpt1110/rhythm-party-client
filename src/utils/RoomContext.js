import React, {useState, useContext, useEffect} from "react";
import { updateViewMusic } from "../api/MusicApi";
const RoomContext = React.createContext();

export function useRoomContext(){
    return useContext(RoomContext)
}
export const RoomContextProvider = (props) => {
    const [music, setMusicCurrent] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isActivePlayer, setIsActivePlayer] = useState(false)
    const [listOfSong, setListOfSong] = useState([])
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const setMusic = async (song) =>{
        setMusicCurrent(song);
       //await updateViewMusic(song._id);
    }
    const value = {
        music,
        setMusic,
        isPlaying,
        setIsPlaying,
        setIsActivePlayer,
        listOfSong,
        setListOfSong,updatePlaylist,setUpdatePlaylist
    }
    return (
        <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>
    )
}
