import React from 'react';
import MainContent from '../components/MainContent';
import Header from '../components/Header';
import Player from '../components/Player';
import { Footer } from '../components/Footer';

export const Home = () => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main className='bg-black opacity-90'>
                <MainContent />
            </main>
            <footer className='bg-black opacity-90'>
                <Footer />
            </footer>
             <div >
                    <Player />
              </div>
        </div>
    );
};
