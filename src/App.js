import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import RoutesList from './RoutesList';
import NavBar from './NavBar'
import UserProvider from './UserProvider';

import './App.css';


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
                    <NavBar />
                    <RoutesList />
                </UserProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
