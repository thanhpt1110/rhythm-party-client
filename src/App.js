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
            fetch("http://localhost:8080/" + 'auth/success',
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
            if(resObject.user!==null)
            {
                setAuthUser(resObject.user.user)
                var jsonStringUser = JSON.stringify(resObject.user.user);
                localStorage.setItem('user',jsonStringUser);
                localStorage.setItem('accessToken',resObject.user.accessToken);
            }
        })
        }
        if(localStorage.getItem('user')===null || localStorage.getItem('accessToken')===null)
            getUser();
        else
        {
            var storedJsonUser = localStorage.getItem('user');
            var storedUser = JSON.parse(storedJsonUser);
            setAuthUser(storedUser)  
        }
    },[])
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/rooms' element={<Room />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='/profile' element={<Profile />} />
                {/* khong can truyen user vaof trong element ntn, trong component, lay user data tu context */}
                <Route path='/accountsetting' element={<Account/>} />
                <Route path='/about' element={<About />} />
                <Route path='/report' element={<ReportIssues />} />
                <Route path='/AllPlaylists' element={<AllPlaylist />} />
                <Route path='/AllTopSongs' element={<AllTopSong  />} />
                <Route path='/AllArtist' element={<AllArtist />} />
                <Route path='/playlist-detail/:playlistName' element={<AlbumDetail />} />
                <Route path='/room-detail/:roomName' element={<RoomDetails/>} />
            </Routes>
        </div>
    );
}

export default App;
