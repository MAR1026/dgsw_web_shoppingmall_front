import React from 'react';
import axios from 'axios';

const CommentListItem = (props) => {
    let { comment } = props;

    return (
        <tr className="comment">
            <td>{comment.userAccount}</td>
            <td>{comment.content}</td>
            <td>{comment.created}</td>
        </tr>
    );
}

export default CommentListItem;