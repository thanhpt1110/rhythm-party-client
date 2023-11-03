import './App.css';
import 'remixicon/fonts/remixicon.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { Footer } from './components/Footer';
import Player from './components/Player';
import '../../front-end/src/utils/Global.css';
function App() {
    return (
        <div>
            <Header />
            <main>
                <MainContent/>
            </main>
            <div className=' sticky bottom-0 z-[99]'>
                <Player/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
