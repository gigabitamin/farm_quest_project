import React from 'react';

const CommunityMainList = ({item}) => {
    return (
        <div className="community_content_box_list_item">
            <div className="community_list_item_display">
                <div className="thread_no">{item.thread_no}</div>
                <div className="thread_type">{item.thread_type===0 ? '팜로그' : '질문'}</div>
                <div className="thread_title">{item.thread_title}</div>
                <div className="nickname">{item.user.nickname}</div>
                <div className="nums">{item.hit_count_generic}</div>
            </div>
        </div>
    );
};

export default CommunityMainList;