import React, {useState, useContext, useEffect} from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}
export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false) //không cần isLoggedIn như này, muốn check User đã login hay chưa chỉ cần xem thử có authUser hay không mà thoi
    const logOut = ()=>{
        console.log('object logged out');
        setAuthUser(null)
        setIsLoggedIn(false)
        console.log("logout success")

    }
    
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,logOut
    }
    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}
