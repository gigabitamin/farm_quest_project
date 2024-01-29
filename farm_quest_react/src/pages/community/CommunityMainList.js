import React from 'react';

const CommunityMainList = ({item}) => {
    return (
        <div className="community_content_box_list_item">
            {/* <div className="content_box_top">
                <div className="content_box_user">{item.user.nickname}</div>
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
            </div> */}
            <div className="community_list_item_display">
                <div className="thread_no">{item.thread_no}</div>
                <div className="thread_type">{item.thread_type===0 ? '팜로그' : '질문'}</div>
                <div className="thread_title">{item.thread_title}</div>
                <div className="nickname">{item.user.nickname}</div>
                <div className="nums">조회수없</div>
            </div>
        </div>
    );
};

export default CommunityMainList;