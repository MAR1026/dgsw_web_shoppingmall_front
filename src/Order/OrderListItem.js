import React from 'react';
import {Link} from 'react-router-dom';

const OrderListItem = (props) => {
    let { product } = props;
    let imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;
    return (
            <tr>
                <td><img src={imgLink}/></td>
                <td>{product.title}</td>
                <td>{product.amount}</td>
                <td>{product.price * product.amount}</td>
            </tr>
    );
}

export default OrderListItem;