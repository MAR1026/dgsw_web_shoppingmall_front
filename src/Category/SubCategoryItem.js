import React from 'react';
import {Link} from 'react-router-dom';

const SubCategoryItem = (props) => {
    let { category, subCategory } = props;
    const link = '/main/' + category + '/' + subCategory;
    return (
        <li><Link to={link}>{subCategory}</Link></li>
    );
}

export default SubCategoryItem;