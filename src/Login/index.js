import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {

    state = {
        password: '',
        id: '',
        goToHome: false
    };

    render () {
        if(this.state.goToMain)
            return <Redirect to='/'/>

        let p = this.props.stores.UserStore;
        if(p.user === null) {
            return (
                <div>
                    <div>로그인</div>
                    <div>
                        <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div>
                        <input placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div>
                        <button onClick={this.login}>로그인</button>
                    </div>
                </div>
            )
        }
    }

    updateAccount = event => {
        this.setState({
                          ...this.state,
                          account: event.target.value,
                      });
    }

    updatePassword = event => {
        this.setState({
                          ...this.state,
                          password: event.target.value
                      });
    }

    login = async () => {
        if (this.state.account && this.state.password && await this.props.stores.UserStore.login(this.state)) {
            this.setState({
                              ...this.state,
                              goToMain: true
                          });
        }
    }

    logout = async () => {
        if(this.props.stores.UserStore.logout()) {
            this.setState({
                              ...this.state,
                              goToMain: true
                          });
        }
    }

}


export default Login;