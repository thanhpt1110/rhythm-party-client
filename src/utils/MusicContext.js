import React, {useState, useContext, useEffect} from "react";

const MusicContext = React.createContext();

export function useMusicContext(){
    return useContext(MusicContext)
}
export const MusicContextProvider = (props) => {
    const [music, setMusic] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const value = {
        music,
        setMusic,
        isPlaying,
        setIsPlaying
    }
    return (
        <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>
    )
}
