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
            <main>
                <MainContent />
                <div className=' sticky bottom-0 z-[99]'>
                    <Player />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};
