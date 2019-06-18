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
                    <button className='loginbtn' onClick={this.onLogin}>{this.state.loginStatus}</button>
                </header>
            </div>
        );
    }

    onLogin = () => {
        console.log("1234");
    }
}

export default Home;