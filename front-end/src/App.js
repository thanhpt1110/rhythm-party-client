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
            throw new Error('Authentication has been fail')
        }).then(resObject=>{
            setUser(resObject.user)
        })
        }
        getUser();
        console.log('hello from app.js')
    },[])
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home user = {user}/>} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/rooms' element={<Room />} />
                <Route path='/upload' element={<Upload />} />
            </Routes>
        </div>
    );
}

export default App;
