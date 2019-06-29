import React from 'react';
import SubCategoryItem from './SubCategoryItem';

const SubCategory = (props) => {

        const categoryList = new Array();
        return (
            props.items.filter(item => {
                return item.category === props.category && !categoryList.includes(item.subCategory)
            }).map(item => <SubCategoryItem key={item.id} category={item.category} subCategory={item.subCategory}/>)
        );
}


export default SubCategory;