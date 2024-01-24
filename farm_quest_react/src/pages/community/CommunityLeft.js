import React from 'react';

const CommunityLeft = ({ setMainType }) => {
    return (
        <aside id="community_left_menu">
            <div className="community_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="community_left_box" onClick={() => setMainType('farmlog')}>팜로그게시판</div>
            <div className="community_left_box" onClick={() => setMainType('qna')}>QnA</div>
            <div className="community_left_box">즐겨찾기(미구현)</div>
            <div className="community_left_box">북마크(미구현)</div>
        </aside>
    );
};

export default CommunityLeft;