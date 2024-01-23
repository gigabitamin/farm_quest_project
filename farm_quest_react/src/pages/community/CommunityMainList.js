import React from 'react';

const CommunityMainList = ({item}) => {
    return (
        <div className="community_content_box">
            {/* 스크롤시 자동 생성되는 게시물 박스들 */}
            <div className="content_box_top">
                <div className="content_box_user">유저 프로필({item.thread_no})</div>
                <div className="content_box_type">타입{item.thread_type}</div>
            </div>
            <div className="content_box_main">
                <div className="content_box_title">{item.thread_title}</div>
            </div>
            <div className="content_box_bottom">
                <ul className="content_box_list">
                    <li>뭐</li>
                    <li>조회수</li>
                    <li>댓글</li>
                    <li>좋아요</li>
                </ul>
            </div>
        </div>
    );
};

export default CommunityMainList;