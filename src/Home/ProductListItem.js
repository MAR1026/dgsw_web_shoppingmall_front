import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItem = (props) => {
    let { product } = props;
    let imgLink = `http://localhost:8080/api/image/download/${product.thumbnailPath}`;
    let link = `/product/${product.id}`;
    return (
        <div className='product-item'>
            <Link to={link}>
                <div><img src={imgLink}/></div>
                <div>{product.title}</div>
                <div>{product.content}</div>
                <div>{product.price}</div>
            </Link>
        </div>
    );
}

export default ProductListItem;