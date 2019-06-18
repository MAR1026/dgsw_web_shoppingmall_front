import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";


import Home from './Home';
import Login from './Login';
import Join from './Login';

import './App.scss';

import Stores from './Stores';

function App() {

    return (
        <Provider stores={Stores}>
            <BrowserRouter>
                <Route path='/' exact component={Home}/>
            <section className='app-body'>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
            </section>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
