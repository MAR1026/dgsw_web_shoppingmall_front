import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import ProductList from './ProductList';

@inject('stores')
@observer
class Home extends Component {

    componentDidMount() {
        this.props.stores.ProductStore.fetchItems();

        console.log(this.props.match);

        if (this.props.match) {
            const { match : { params : { mainCategory, subCategory } } } = this.props;
            this.setState({
                              ...this.state,
                              mainCategory: mainCategory ? mainCategory : 'none',
                              subCategory: subCategory ? subCategory : 'none'
            });
        } else {
            this.setState({
                              ...this.state,
                              mainCategory: 'none',
                              subCategory: 'none'
                          });
        }
    }

    state = {
        loginStatus: this.props.stores.UserStore.user ? '로그아웃' : '로그인',
        name: this.props.stores.UserStore.user ? this.props.stores.UserStore.user.name + '님 반갑습니다.' : '로그인 해주세요.',
        mainCategory: 'none',
        subCategory: 'none'
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { match : { params : { mainCategory, subCategory } } } = this.props;
        if(prevProps.match.params.mainCategory !== mainCategory || prevProps.match.params.subCategory !== subCategory ) {
            this.setState({
                ...this.state,
                mainCategory: mainCategory ? mainCategory : 'none',
                subCategory: subCategory ? subCategory : 'none'
            });
        }
    }

    render() {
        if(this.state.mainCategory === 'none') {
            return (
                <div className="App">

                    <div className='home-body'>
                        <nav className='event-product'>
                            <div className='mark'>추천상품</div>
                            <div className='product-item'>{this.props.stores.ProductStore.items && <ProductList category='suggest' subCategory='none' items={this.props.stores.ProductStore.items}/>}</div>
                        </nav>
                        <section className='main-visual'>
                            <div className='product-list'>
                                <div>
                                    <div className='mark'>인기 상품 (5개 이상 판매)</div>
                                    <div className='product-item'>{this.props.stores.ProductStore.items && <ProductList category='hit' subCategory='none' items={this.props.stores.ProductStore.items}/>}</div>
                                </div>
                                <div>
                                    <div className='mark'>세일 상품</div>
                                    <div className='product-item'>{this.props.stores.ProductStore.items && <ProductList category='sale' subCategory='none' items={this.props.stores.ProductStore.items}/>}</div>
                                </div>
                            </div>
                        </section>
                        <aside className='advertise'>
                            <div>
                                <a href='http://www.patagonia.co.kr/shop/main/index.php'  target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad1.jpg'/>
                                </a>
                            </div>
                            &nbsp;
                            <div>
                                <a href='https://www.guesskorea.com/main/main.php' target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad2.jpg'/>
                                </a>
                            </div>
                            &nbsp;
                            <div>
                                <a href='https://www.plac-official.com/' target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad3.jpg'/>
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <div className='home-body'>
                        <nav className='event-product'>
                            <div className='mark'>추천상품</div>
                            <div className='product-item'>{this.props.stores.ProductStore.items && <ProductList category='suggest' subCategory='none' items={this.props.stores.ProductStore.items}/>}</div>
                        </nav>
                        <section className='main-visual'>
                            <div className='product-list'>
                                <div>
                                    <div className='product-item'>{this.props.stores.ProductStore.items && <ProductList category={this.state.mainCategory} subCategory={this.state.subCategory} items={this.props.stores.ProductStore.items}/>}</div>
                                </div>
                            </div>
                        </section>
                        <aside className='advertise'>
                            <div>
                                <a href='http://www.patagonia.co.kr/shop/main/index.php'  target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad1.jpg'/>
                                </a>
                            </div>
                            &nbsp;
                            <div>
                                <a href='https://www.guesskorea.com/main/main.php' target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad2.jpg'/>
                                </a>
                            </div>
                            &nbsp;
                            <div>
                                <a href='https://www.plac-official.com/' target='_blank'>
                                    <img src='http://localhost:8080/api/image/download/ad3.jpg'/>
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            );
        }

    }
}

export default Home;