import React from 'react';
import MainContent from '../components/MainContent';
import Header from '../components/Header';
import Player from '../components/Player';
import { Footer } from '../components/Footer';
import Error from '../components/Error'
export const Home = ({user}) => {
    const isAuthenticated = user !==null
    console.log('hello')
    return (
        <div>
            <header>
                <Header user = {user} type='home'/>
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
