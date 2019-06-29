import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import SubCategory from "./SubCategory";

@inject('stores')
@observer
class Category extends Component {
    componentDidMount() {
        this.props.stores.ProductStore.fetchItems();
    }

    render() {
        return (
            <ul className='menubar'>
                <li>OO OOOO OO 쇼핑몰&nbsp;|</li>
                <li><Link to='/'>전체</Link></li>
                <li>
                    <Link to='/main/top'>상의</Link>
                    <ul className='subMenu'>
                        {this.props.stores.ProductStore.items && <SubCategory category='top' items={this.props.stores.ProductStore.items}/>}
                    </ul>
                </li>
                <li>
                    <Link to='/main/pants'>바지</Link>
                    <ul className='subMenu'>
                        {this.props.stores.ProductStore.items && <SubCategory category='pants' items={this.props.stores.ProductStore.items}/>}
                    </ul>
                </li>
                <li>
                    <Link to='/main/shoes'>신발</Link>
                    <ul className='subMenu'>
                        {this.props.stores.ProductStore.items && <SubCategory category='shoes' items={this.props.stores.ProductStore.items}/>}
                    </ul>
                </li>
                <li>
                    <Link to='/main/bag'>가방</Link>
                    <ul className='subMenu'>
                        {this.props.stores.ProductStore.items && <SubCategory category='bag' items={this.props.stores.ProductStore.items}/>}
                    </ul>
                </li>
                <li>
                    <Link to='/main/accessory'>소품</Link>
                    <ul className='subMenu'>
                        {this.props.stores.ProductStore.items && <SubCategory category='accessory' items={this.props.stores.ProductStore.items}/>}
                    </ul>
                </li>
            </ul>
        );
    }

}

export default Category;