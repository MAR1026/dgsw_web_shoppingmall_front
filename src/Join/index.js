import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect, Link} from 'react-router-dom';

@inject('stores')
@observer
class Join extends Component {

    state = {
        account: '',
        checkAccount: '',
        password: '',
        checkPassword: '',
        noticePassword: '패스워드를 한번 더 입력해주세요.',
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
                <div className='join'>
                    <div className='joinNotice'>
                        <div>회원가입</div>
                        <hr/>
                        <p>00 가족을 위한 전문 쇼핑몰로 저렴한 가격과 신개념 고객서비스를 통해 고객 만족을 최우선으로 합니다.<br/> 쇼핑몰에 회원으로 가입하시면 보다 나은 서비스를 경험하실 수 있습니다.</p>
                        <hr/>
                    </div>
                    <div>
                        희망아이디: <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/> <button onClick={this.checkAccount}>중복확인</button> {this.state.checkAccount}
                    </div>
                    <div>
                        희망패스워드: <input type='password' placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div>
                        패스워드확인: <input type='password' placeholder='비밀번호 확인' value={this.state.checkPassword} onChange={this.updateCheckPassword}/> {this.state.noticePassword}
                    </div>
                    <div>
                        성명: <input placeholder='이름' value={this.state.name} onChange={this.updateName}/> (이름에 공백은 제거해주세요)
                    </div>
                    <div>
                        전화번호: <input placeholder='집 전화번호' value={this.state.tel} onChange={this.updateTel}/>
                    </div>
                    <div>
                        핸드폰: <input placeholder='휴대폰 번호' value={this.state.phone} onChange={this.updatePhone}/>
                    </div>
                    <div>
                        우편번호: <input placeholder='우편 번호' value={this.state.zip} onChange={this.updateZip}/>
                    </div>
                    <div>
                        주소: <input placeholder='집 주소' value={this.state.address} onChange={this.updateAddress}/>
                    </div>
                    <div>
                        이메일 주소: <input placeholder='이메일' value={this.state.email} onChange={this.updateEmail}/>
                    </div>
                    <div>
                        <button onClick={this.join}>회원가입</button>
                        <Link to='/'><button>취소</button></Link>
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
            noticePassword: event.target.value === this.state.checkPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'
        });
    }

    updateCheckPassword = event => {
        this.setState({
            ...this.state,
            checkPassword: event.target.value,
            noticePassword: event.target.value === this.state.password ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'
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

    checkAccount = async () => {
        console.log(this.state.account);
        if(this.state.account) {
            if(await this.props.stores.UserStore.checkAccount(this.state.account)) {
                this.setState({
                                  ...this.state,
                                  checkAccount: '이미 존재하는 아이디입니다.'
                              });
            } else {
                this.setState({
                                  ...this.state,
                                  checkAccount: '사용가능한 아이디입니다.'
                              });
            }
        }
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