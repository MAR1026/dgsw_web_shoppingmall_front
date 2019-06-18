import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";


import Home from './Home';
import './App.scss';

import Stores from './Stores';

function App() {

    return (
        <Provider stores={Stores}>
            <div>
                <Home/>
            </div>
        </Provider>
    );
}

export default App;
