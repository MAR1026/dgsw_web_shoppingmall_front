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

function App() {

    const loginStatus = Stores.UserStore.user ? '로그아웃' : '로그인';

         return (
        <Provider stores={Stores}>
            <BrowserRouter>
                <header className="app-header">
                    <button className='loginbtn'>장바구니</button>
                    <button className='loginbtn'>고객센터</button>
                    <Link to='/login'><button className='loginbtn'>{loginStatus}</button></Link>
                    <Link to='/join'><button className='loginbtn'>회원가입</button></Link>
                    <ul className='menubar'>
                        <li>OO OOOO OO 쇼핑몰&nbsp;|</li>
                        <li><Link to='/'>전체</Link></li>
                        <li><Link to='/top'>상의</Link></li>
                        <li><Link to='/pants'>바지</Link></li>
                        <li><Link to='/shoes'>신발</Link></li>
                        <li><Link to='/bag'>가방</Link></li>
                        <li><Link to='/accessory'>소품</Link></li>
                    </ul>
                </header>
            <section className='app-body'>
                <Route path='/' exact component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/join' component={Join}/>
                <Route path='/top' component={Home}/>
                <Route path='/pants' component={Home}/>
                <Route path='/shoes' component={Home}/>
                <Route path='/bag' component={Home}/>
                <Route path='/accessory' component={Home}/>
                <Route path='/product/:productid' component={Product}/>
                <Route path='/orderlist' component={Order}/>
            </section>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
