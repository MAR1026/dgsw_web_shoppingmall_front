import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';
import OrderList from './OrderList';

@inject('stores')
@observer
class Order extends Component {

    componentDidMount() {
        if(this.props.stores.UserStore.user) {
            this.props.stores.ProductStore.getMyOrder(this.props.stores.UserStore.user.account);
        }
    }


    state = {
        goToHome: false
    }

    render() {

        if(this.state.goToHome)
            return <Redirect to="/"/>

        if(this.props.location.pathname === '/orderlist') {

            const items = this.props.stores.ProductStore.orderItems;
            let totalPrice = 0;
            this.props.stores.ProductStore.orderItems.map(item => {
                totalPrice += item.price * item.amount;
            });

            return(
                <div className='order'>
                    <div className='mark'>장바구니</div>
                    <div>
                        ·고객님께서 추가하신 상품내역을 변경하시거나 삭제하실 수 있습니다.<br/>
                        ·다른 상품을 더 알아보고 싶다면 [쇼핑하기]을 클릭하시면 됩니다.<br/>
                        ·상품을 주문하시면 마일리지가 계속해서 누적됩니다.<br/>
                        ·누적된 마일리지에 따라 사은품이 지금되며 다음 주문 시 동봉하여 발송됩니다.
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>주문 상품</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>주문 수</th>
                            <th>합계</th>
                        </tr>
                        </thead>
                        <tbody>

                        {items && <OrderList items={items} type='newOrder'/>}
                        </tbody>
                    </table>


                    <div>주문 총 가격 : {totalPrice} </div>
                    <div>
                        <Link to='/'><button>쇼핑 계속하기</button></Link>
                        <button onClick={this.order}>주문하기</button>
                    </div>
                </div>
            );
        } else {
            if(!this.props.stores.UserStore.user) {
                alert("먼저 로그인 하셔야 합니다.");
                return <Redirect to="/"/>
            }

            if(this.props.stores.ProductStore.orderItems) {
                const items = this.props.stores.ProductStore.myOrderItems;
                console.log('items :::: ' + items);
                return(
                    <div className='order'>
                        <div className='mark'>내가 구매한 제품</div>
                        <div>
                            ·고객님께서 구매하신 제품 목록입니다.
                        </div>
                        <table>
                            <thead>
                            <tr>
                                <th>주문 상품</th>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>주문 수</th>
                                <th>합계</th>
                            </tr>
                            </thead>
                            <tbody>

                            {items && <OrderList items={items} type='myOrder'/>}
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return (
                    <div></div>
                )
            }
        }
    }

    order = async () => {
        if(!this.props.stores.UserStore.user) {
            alert('먼저 로그인을 하셔야 합니다.');
            return;
        }

        if(await this.props.stores.ProductStore.order(this.props.stores.UserStore.user.account))
        {
            alert("주문이 완료되었습니다.");
            this.setState({
                              ...this.state,
                              goToHome: true
                          });
        }
    }
}


export default Order;