import React from 'react';
import ProductListItem from './ProductListItem';

const ProductList = (props) => {
    const { category, subCategory } = props;

    if(category === 'hit') {
        return (
            props.items.filter(item => {
                return (item.amount - item.remainAmount) >= 5;
            }).map(item => <ProductListItem key={item.id} product={item}/>)
        )
    } else if(category === 'sale') {
        return (
            props.items.filter(item => {
                return item.originalPrice > item.price;
            }).map(item => <ProductListItem key={item.id} product={item}/>)

        )
    } else if(category === 'suggest') {
        return (
            props.items.filter(item => {
                return (item.amount - item.remainAmount) <= 3;
            }).map(item => <ProductListItem key={item.id} product={item}/>)

        )
    }
    else if(category === 'none' && subCategory === 'none') {
        return (
            props.items.map(item => <ProductListItem key={item.id} product={item}/>)
        )
    } else if(category !== 'none' && subCategory === 'none'){
        return (
            props.items.filter(item => {
                return item.category === category;
            }).map(item => <ProductListItem key={item.id} product={item}/>)
        )
    } else {
        return (
            props.items.filter(item => {
                return item.category === category && item.subCategory === subCategory;
            }).map(item => <ProductListItem key={item.id} product={item}/>)
        )
    }
}

export default ProductList;