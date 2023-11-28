import './App.css';
import 'remixicon/fonts/remixicon.css';
import './utils/Global.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Room from './pages/Room';
import Upload from './pages/Upload';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Account from './pages/Account';
import About from './pages/About';
import ReportIssues from './pages/ReportIssues';
import { useAuth } from './utils/AuthContext';
import { AllPlaylist } from './pages/AllPlaylist';
import AllTopSong from './pages/AllTopSong';
import RoomDetails from './pages/RoomDetails';
import { AllArtist } from './pages/AllArtist';
import AlbumDetail from './pages/AlbumDetail';
function App() {
    const [user, setUser] = useState(null)
    const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
    useEffect(()=>{//khong can fetchh user data o cho nay, luc login xong đã co user data set vao trong context
        const getUser = ()=>{
            fetch('http://localhost:8080/auth/success',
            {
                method: 'GET',
                credentials: 'include',
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
            }
        ).then(respone => {
            if(respone.status === 200)
                return respone.json();
            return {user: null, isAuthentication: false }
        }).then(resObject=>{
            console.log('resObject', resObject);

            if(resObject.user!==null)
             {
                setUser(resObject.user)
                setAuthUser(resObject.user)
                setIsLoggedIn(true)
             }
             else
             {
                setUser(resObject.user)
                setAuthUser(resObject.user)
                setIsLoggedIn(false)
                console.log(authUser)

             }
        })
        }
        getUser();
    },[])
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home user = {user}/>} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/rooms' element={<Room user = {user}/>} />
                <Route path='/upload' element={<Upload user = {user}/>} />
                <Route path='/profile' element={<Profile user = {user} />} />
                {/* khong can truyen user vaof trong element ntn, trong component, lay user data tu context */}
                <Route path='/accountsetting' element={<Account user = {user} />} />
                <Route path='/about' element={<About user = {user} />} />
                <Route path='/report' element={<ReportIssues user = {user} />} />
                <Route path='/AllPlaylists' element={<AllPlaylist user = {user} />} />
                <Route path='/AllTopSongs' element={<AllTopSong user = {user} />} />
                <Route path='/AllArtist' element={<AllArtist user = {user} />} />
                <Route path='/playlist-detail/:playlistName' element={<AlbumDetail user = {user} />} />
                <Route path='/room-detail/:roomName' element={<RoomDetails user = {user} />} />
            </Routes>
        </div>
    );
}

export default App;