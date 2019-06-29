import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";


import Home from './Home';
import Login from './Login';
import Join from './Join';

import './App.scss';

import Stores from './Stores';
import Product from "./Product";
import Order from './Order';
import Header from './Header';

function App() {
     return (
        <Provider stores={Stores}>
            <BrowserRouter>
            <Header/>
            <section className='app-body'>
                <Route path='/' exact component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
                <Route path='/main/:mainCategory/:subCategory?' component={Home}/>
                <Route path='/product/:productid' component={Product}/>
                <Route path='/orderlist' component={Order}/>
                <Route path='/myOrder' component={Order}/>
            </section>
            <footer>
                <div className='footerDiv'>
                    <div className='shopname'>
                        00 0000 000 쇼핑몰 |
                    </div>
                    <div className='shopinfo'>
                        ☎ 문의 전화 : 053)0000-0000/ 000)0000-0000/ Fax 053)0000-0000 <br/>
                        구입문의 : 053-000-0000(일반), 000-0000~0(군)<br/>
                        Copyright 2018 0000000000. All rights reserved.
                    </div>
                </div>
            </footer>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
