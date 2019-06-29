import React from 'react';
import {Link} from 'react-router-dom';

const OrderListItem = (props) => {

    let { product, type } = props;
    let imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;

    const [count, setCount] = React.useState(product.amount);

    if(type === 'newOrder') {
        return (
            <tr>
                <td><img src={imgLink}/></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    <input type='number' value={count} min='1' onChange={(e) => {setCount(e.target.value); product.amount = e.target.value;}} max={product.remainAmount}/>
                </td>
                <td>{product.price * product.amount}</td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td><img src={imgLink}/></td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    {product.amount}
                </td>
                <td>{product.price * product.amount}</td>
            </tr>
        );
    }
}

export default OrderListItem;