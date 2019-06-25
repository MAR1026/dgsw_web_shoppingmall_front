import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';
import OrderList from './OrderList';

@inject('stores')
@observer
class Order extends Component {

    render() {

        const items = this.props.stores.ProductStore.orderItems;
        let totalPrice = 0;
        this.props.stores.ProductStore.orderItems.map(item => {
            totalPrice += item.price * item.amount;
        });

        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>주문 상품</th>
                            <th>가격</th>
                            <th>주문 수</th>
                            <th>합계</th>
                        </tr>
                    </thead>
                    <tbody>

                    {items && <OrderList items={items}/>}
                    </tbody>
                </table>
                <div>주문 총 가격 : {totalPrice} </div>
                <div>
                    <button>쇼핑 계속하기</button>
                    <button>주문하기</button>
                </div>
            </div>

        );
    }
}


export default Order;