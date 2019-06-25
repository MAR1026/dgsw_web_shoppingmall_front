import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Product extends Component {

    state = {
        amount: 1,
        goToOrderList: false
    }

    componentDidMount() {
        const productId = this.props.location.pathname.split("/").slice(-1)[0];
        this.props.stores.ProductStore.fetchItem(productId);
    }

    updateAmount = event => {
        this.setState({
            ...this.state,
            amount: event.target.value
          });
    }

    goToOrderList = () => {
        console.log(this.state.amount);
        if(this.state.amount) {
            this.props.stores.ProductStore.addOrder(this.state.amount);
            this.setState(
                {
                    ...this.state,
                    goToOrderList: true
                });
        }
    }

    render() {
        if(this.state.goToOrderList)
            return <Redirect to='/orderlist'/>

        const product = this.props.stores.ProductStore.item;

        if(!product)
            return (
                <div></div>
            )

        const imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;

        return (
            <div className='product-body'>
                <div className='relative-product'>
                    연관 상품
                </div>
                <div className='product-view'>
                    <div className='product-title'>
                        <div>{product.title}</div>
                        <hr/>
                    </div>
                    <div className='product-info'>
                        <div>
                            <img src={imgLink}/>
                        </div>
                        <div className='info'>
                            <div>{product.title}</div>
                            <div>마일리지: {product.mileage}</div>
                            <div>주문 수량: <input type='number' value={this.state.amount} onChange={this.updateAmount} min='1' max={product.remainAmount}/></div>
                            <div>----------------------------</div>
                            <div className='originalPrice'>시중 가격: {product.originalPrice}</div>
                            <div>판매 가격: {product.price}</div>
                            <div className='shopBtn'>
                                <button>쇼핑하기</button>
                                <button onClick={this.goToOrderList}>장바구니</button>
                            </div>
                        </div>
                    </div>

                    <div className='product-detail'>
                        <div className='mark'>제품 상세 정보</div>
                        <div>{product.content}</div>
                        <div className='mark'>구매 정보</div>
                        <div>{product.notice}</div>
                        <div className='mark'>고객의 상품 평</div>
                    </div>

                </div>
            </div>
        );
    }

}


export default Product;