import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Join extends Component {

    state = {
        account: '',
        password: '',
        name: '',
        tel: '',
        phone: '',
        zip: '',
        address: '',
        email: '',
        goToHome: false
    };

    render () {
        if(this.state.goToMain)
            return <Redirect to='/'/>

        return (
                <div>
                    <div>회원가입</div>
                    <div>
                        <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div>
                        <input placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div>
                        <input placeholder='이름' value={this.state.name} onChange={this.updateName}/>
                    </div>
                    <div>
                        <input placeholder='집 전화번호' value={this.state.tel} onChange={this.updateTel}/>
                    </div>
                    <div>
                        <input placeholder='휴대폰 번호' value={this.state.phone} onChange={this.updatePhone}/>
                    </div>
                    <div>
                        <input placeholder='우편 번호' value={this.state.zip} onChange={this.updateZip}/>
                    </div>
                    <div>
                        <input placeholder='집 주소' value={this.state.address} onChange={this.updateAddress}/>
                    </div>
                    <div>
                        <input placeholder='이메일' value={this.state.email} onChange={this.updateEmail}/>
                    </div>
                    <div>
                        <button onClick={this.join}>회원가입</button>
                    </div>
                </div>
            );
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
            password: event.target.value,
        });
    }

    updateName = event => {
        this.setState({
            ...this.state,
            name: event.target.value,
        });
    }

    updateTel = event => {
        this.setState({
            ...this.state,
            tel: event.target.value,
        });
    }

    updatePhone = event => {
        this.setState({
            ...this.state,
            phone: event.target.value,
        });
    }

    updateZip = event => {
        this.setState({
            ...this.state,
            zip: event.target.value,
        });
    }

    updateAddress = event => {
        this.setState({
            ...this.state,
            address: event.target.value,
        });
    }

    updateEmail = event => {
        this.setState({
            ...this.state,
            email: event.target.value,
        });
    }

    join = async () => {

        console.log(this.state.password);
        if (this.state.account && this.state.password && this.state.name && this.state.tel
            && this.state.phone && this.state.zip && this.state.address && this.state.email
            && await this.props.stores.UserStore.register(this.state))
        {
            this.setState(
                {
                          ...this.state,
                          goToMain: true
                      });
        }
    }


};


export default Join;