import './App.css';
import 'remixicon/fonts/remixicon.css';
import '../../front-end/src/utils/Global.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Room from './pages/Room';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/rooms' element={<Room />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
