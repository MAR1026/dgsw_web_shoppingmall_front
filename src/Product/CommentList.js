import React from 'react';
import CommentListItem from './CommentListItem'

const CommentList = (props) => {
    return (
        props.items.map(item => <CommentListItem key={item.id} comment={item}/>)
    );
}

export default CommentList;