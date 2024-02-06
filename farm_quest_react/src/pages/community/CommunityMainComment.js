import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CommunityMainComment = ({ commentItem, loadContent }) => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const [cookies] = useCookies(['id']);

    const onDelete = (event) => {
        if (window.confirm('해당 댓글을 삭제하시겠습니까?')){
            axios.delete(`${DjangoServer}/community/detail/comment/delete/${commentItem.cmt_no}`, {
                    headers: { Authorization: `Token  ${cookies.id}` }
                }).then(() => {
                    // alert('삭제되었습니다.');
                    loadContent();
                }).catch(() => {
                    alert('잘못된 접근입니다.');
                });
        } else {
            event.preventDefault();
        };       
    };
    
    return (
        <div className="community_detail_comment_box">
            <div className="community_detail_comment_box_user">{commentItem.user ? commentItem.user.nickname : '정보없음'}</div>
            <div className="community_detail_comment_box_content">{commentItem.cmt_content}</div>
            <button className="community_mini_button" onClick={onDelete}>삭제</button>
        </div>
    );
};

export default CommunityMainComment;