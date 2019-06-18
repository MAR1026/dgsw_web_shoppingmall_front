import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Home extends Component {

    state = {
        loginStatus: '로그인',
    };

    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <Link to='/login'><button className='loginbtn'>{this.state.loginStatus}</button></Link>
                    <Link to='/join'><button className='loginbtn'>회원가입</button></Link>
                </header>
            </div>
        );
    }
}

export default Home;