import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";


import Home from './Home';
import Login from './Login';
import Join from './Join';

import './App.scss';

import Stores from './Stores';

function App() {

    return (
        <Provider stores={Stores}>
            <BrowserRouter>
                <Route path='/' exact component={Home}/>
            <section>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
                <Route path='/top' component={Home}/>
                <Route path='/pants' component={Home}/>
                <Route path='/shoes' component={Home}/>
                <Route path='/bag' component={Home}/>
                <Route path='/accessory' component={Home}/>
            </section>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
