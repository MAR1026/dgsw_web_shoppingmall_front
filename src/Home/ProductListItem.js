import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItem = (props) => {
    let { product } = props;
    let imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;
    let link = `/product/${product.id}`;

    if(product.originalPrice > product.price) {
        return (
            <Link to={link}>
                <div><img src={imgLink}/></div>
                <div>{product.title}</div>
                <div className='productContent'>{product.content}</div>
                <div>
                    <b className='sales'>{product.originalPrice}</b>
                    &nbsp;
                    {product.price}
                </div>

            </Link>
        );
    }
    return (
            <Link to={link}>
                <div><img src={imgLink}/></div>
                <div>{product.title}</div>
                <div className='productContent'>{product.content}</div>
                <div>{product.price}</div>
            </Link>
    );
}

export default ProductListItem;