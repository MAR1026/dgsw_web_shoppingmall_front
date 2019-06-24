import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import ProductList from './ProductList';

@inject('stores')
@observer
class Home extends Component {

    componentDidMount() {
        this.props.stores.ProductStore.fetchItems();
        if(this.props.location) {
            switch (this.props.location.pathname) {
                case "/top" :
                    this.setState(
                {
                          ...this.state,
                          category: 'top'
                      });
                    break;

                case "/pants" :
                    this.setState(
                {
                          ...this.state,
                          category: 'pants'
                      });
                    break;

                case "/shoes" :
                    this.setState(
                {
                          ...this.state,
                          category: 'shoes'
                      });
                    break;

                case "/bag" :
                    this.setState(
                {
                          ...this.state,
                          category: 'bag'
                      });
                    break;

                case "/accessory" :
                    this.setState(
                  {
                            ...this.state,
                            category: 'accessory'
                        });
                    break;

                default:
                    this.setState(
                {
                          ...this.state,
                          category: 'none'
                      });
                    break;

            }
        }
    }

    state = {
        loginStatus: this.props.stores.UserStore.user ? '로그아웃' : '로그인',
        name: this.props.stores.UserStore.user ? this.props.stores.UserStore.user.name + '님 반갑습니다.' : '로그인 해주세요.',
        category: 'none'
    };

    render() {
        return (
            <div className="App">
                <header className="app-header">
                    <button className='loginbtn'>장바구니</button>
                    <button className='loginbtn'>고객센터</button>
                    <Link to='/login'><button className='loginbtn'>{this.state.loginStatus}</button></Link>
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
                <div className='home-body'>
                    <nav className='event-product'>
                        <div>공동구매</div>
                        <hr/>
                    </nav>
                    <section className='main-visual'>
                        <div className='product-list'>
                            <div>{this.props.stores.ProductStore.items && <ProductList category={this.state.category} items={this.props.stores.ProductStore.items}/>}</div>
                        </div>
                    </section>
                    <aside className='advertise'>
                        <div>광고</div>
                        <hr/>
                    </aside>
                </div>
            </div>
        );
    }
}

export default Home;