import React, {useEffect} from 'react';
import MainContent from '../components/MainContent';
import Header from '../components/Header';
import Player from '../components/Player';
import Footer from '../components/Footer';
import { useMusicContext } from '../utils/MusicContext';
import Error from '../components/Error'
export const Home = () => {
    const {music, setIsActive} = useMusicContext();
    useEffect(()=>{
      if(music!==null && music !==undefined)
        setIsActive(true)
      else
        setIsActive(false)
    },[music])
    return (
        <div>
            <header>
                <Header  type='home' />
            </header>
            <main className='bg-black opacity-90'>
                <MainContent />
            </main>
            <footer className='bg-black opacity-90'>
                <Footer />
            </footer>
        </div>
    );
};
