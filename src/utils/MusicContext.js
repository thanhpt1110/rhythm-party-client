import React, {useState, useContext, useEffect} from "react";
import { updateViewMusic } from "../api/MusicApi";
const MusicContext = React.createContext();

export function useMusicContext(){
    return useContext(MusicContext)
}
export const MusicContextProvider = (props) => {
    const [music, setMusicCurrent] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [listOfSong, setListOfSong] = useState([])
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const setMusic = async (song) =>{
        setMusicCurrent(song);
       await updateViewMusic(song._id);
    }
    const value = {
        music,
        setMusic,
        isPlaying,
        setIsPlaying,
        isActive,
        setIsActive,
        listOfSong,
        setListOfSong,updatePlaylist,setUpdatePlaylist
    }
    return (
        <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>
    )
}
