import React, {useState, useContext, useEffect} from "react";

const MusicContext = React.createContext();

export function useMusicContext(){
    return useContext(MusicContext)
}
export const MusicContextProvider = (props) => {
    const [music, setMusic] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [listOfSong, setListOfSong] = useState([])
    const value = {
        music,
        setMusic,
        isPlaying,
        setIsPlaying,
        isActive,
        setIsActive
    }
    return (
        <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>
    )
}
