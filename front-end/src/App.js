import './App.css';
import 'remixicon/fonts/remixicon.css';
import '../../front-end/src/utils/Global.css';
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
function App() {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const getUser = ()=>{
            fetch('http://localhost:8080/auth/google/success',
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
                setUser(resObject.user)
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
                <Route path='/accountsetting' element={<Account user = {user} />} />
                <Route path='/about' element={<About user = {user} />} />
            </Routes>
        </div>
    );
}

export default App;
