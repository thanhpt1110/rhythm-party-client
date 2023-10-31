import './App.css';
import 'remixicon/fonts/remixicon.css';
import Header from './components/Header';

function App() {
    return (
        <div>
            <Header />
            <div className='container w-full flex flex-row '>
                <div className='w-[70%] bg-indigo-400'>Left Main</div>
                <div className='w-[30%] bg-green-200'>Right Content</div>
            </div>
            <div className='audio bg-black text-white'>Audio</div>
            <footer className=' bg-slate-500'>About us</footer>
        </div>
    );
}

export default App;
