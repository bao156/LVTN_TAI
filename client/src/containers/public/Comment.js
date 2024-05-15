
import React, { useState } from 'react';

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        // Thêm bình luận mới vào danh sách
        setComments(prevComments => [...prevComments, newComment]);
        // Xóa nội dung của ô nhập bình luận sau khi thêm
        setNewComment('');
    };

    return (
        <div>
            <h3>Bình Luận</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <textarea value={newComment} onChange={handleCommentChange} placeholder="Thêm bình luận..." />
            <button onClick={handleAddComment}>Gửi</button>
        </div>
    );
};

export default Comment;
