import React, {useState, useContext, useEffect} from "react";
import { updateViewMusic } from "../api/MusicApi";
import {getRoomById} from '../api/RoomApi'
import { useAuth } from "./AuthContext";
const RoomContext = React.createContext();

export function useRoomContext(){
    return useContext(RoomContext)
}
export const RoomContextProvider = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [updatePlaylist, setUpdatePlaylist] = useState(false);
    const [roomCurrent,setRoomCurrent] = useState(null);
    const [firstTime,setFirstTime] = useState(true);
    const {socket} = useAuth();
    const UpdateRoomInfo = async ()=>{
            const respone = await getRoomById(roomCurrent._id)
            if(respone.status === 200)
                setRoomCurrent(respone.data.data)
    }
    const cleanRoom = ()=>{
        setRoomCurrent(null);
        setIsPlaying(false);
    }
    useEffect(()=>{
    if(socket)
        socket.on('update_music_current',(room)=>{isPlaying&&setRoomCurrent(room);})
    },[socket,setRoomCurrent])
    const value = {

        isPlaying,
        setIsPlaying,
        roomCurrent,
        setRoomCurrent,
        UpdateRoomInfo,
        updatePlaylist,setUpdatePlaylist,cleanRoom,firstTime,setFirstTime
    }
    return (
        <RoomContext.Provider value={value}>{props.children}</RoomContext.Provider>
    )
}
