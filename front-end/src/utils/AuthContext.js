import React, {useState, useContext, useEffect} from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}
export const AuthProvider = (props) => {
    const [authUser, setAuthUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const logOut = ()=>{
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