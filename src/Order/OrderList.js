import React from 'react';
import OrderListItem from './OrderListItem';

const OrderList = (props) => {
    return (
        props.items.map(item => <OrderListItem key={item.id} product={item}/>)
    )
}

export default OrderList;