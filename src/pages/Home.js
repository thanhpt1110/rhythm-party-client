import React from 'react';
import MainContent from '../components/MainContent';
import Header from '../components/Header';
import Player from '../components/Player';
import Footer from '../components/Footer';
import Error from '../components/Error'
import { MusicContextProvider } from '../utils/MusicContext'

export const Home = () => {
    return (
        <div>
            <MusicContextProvider>
            <header>
                <Header  type='home' />
            </header>
            <main className='bg-black opacity-90'>
                <MainContent />
            </main>
            <footer className='bg-black opacity-90'>
                <Footer />
            </footer>
            <div>
                <Player />
            </div>
            </MusicContextProvider>

        </div>
    );
};
