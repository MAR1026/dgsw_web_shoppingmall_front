import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';
import ProductList from "../Home/ProductList";
import CommentList from "./CommentList"

@inject('stores')
@observer
class Product extends Component {

    state = {
        amount: 1,
        content: '',
        goToOrderList: false
    }

    componentDidMount() {
        const productId = this.props.location.pathname.split("/").slice(-1)[0];
        this.props.stores.ProductStore.fetchItems();
        this.props.stores.ProductStore.fetchItem(productId);
    }

    updateAmount = event => {
        this.setState({
            ...this.state,
            amount: event.target.value
          });
    }

    updateContent = event => {
        this.setState({
            ...this.state,
            content: event.target.value
        });
    }

    createComment = async () => {
        if(!this.props.stores.UserStore.user)
        {
            alert('로그인 해주세요.');
            return;
        }

        if(this.state.content) {
            if(await this.props.stores.ProductStore.createComment(this.props.stores.ProductStore.item.id, this.state.content, this.props.stores.UserStore.user)) {
                window.location.reload();
            }
        }
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

        if(!product || !this.props.stores.ProductStore.items)
            return (
                <div></div>
            )

        const imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;
        return (
            <div className='product-body'>
                <div className='event-product'>
                    <div className='mark'>이런 상품은 어때요?</div>
                    <div className='product-item'>{<ProductList category={product.category} subCategory='none' items={this.props.stores.ProductStore.items}/>}</div>
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
                            <div>제조사: {product.company}</div>
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
                        <div>
                            <input placeholder='내용' value={this.state.content} onChange={this.updateContent}/>
                            <button onClick={this.createComment}>작성하기</button>
                        </div>
                        <table className="comments">
                            <thead>
                                <tr>
                                    <th>아이디</th>
                                    <th>내용</th>
                                    <th>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.comments && <CommentList items={product.comments}/>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}


export default Product;