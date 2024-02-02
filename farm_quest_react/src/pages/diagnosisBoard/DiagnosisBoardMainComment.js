import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const DiagnosisBoardMainComment = ({ commentItem, loadContent }) => {
    const [cookies] = useCookies(['id']);

    const onDelete = (event) => {
        if (window.confirm('해당 댓글을 삭제하시겠습니까?')){
            axios.delete(`http://localhost:8000/diagnosis_board/detail/comment/delete/${commentItem.cmt_no}`, {
                    headers: { Authorization: `Token  ${cookies.id}` }
                }).then(() => {
                    // alert('삭제되었습니다.');
                    loadContent();
                });
        } else {
            event.preventDefault();
        };       
    };
    
    return (
        <div className="community_detail_comment_box">
            <div className="community_detail_comment_box_user">{commentItem.user.nickname}</div>
            <div className="community_detail_comment_box_content">{commentItem.cmt_content}</div>
            <button onClick={onDelete}>삭제</button>
        </div>
    );
};

export default DiagnosisBoardMainComment;