import React from 'react';
import ProductListItem from './ProductListItem';

const ProductList = (props) => {
    if(props.category === 'none') {
        return (
            props.items.map(item => <ProductListItem key={item.id} product={item}/>)
        )
    } else {
        return (
            props.items.filter(item => {
                return item.category === props.category;
            }).map(item => <ProductListItem key={item.id} product={item}/>)
        )
    }
}

export default ProductList;