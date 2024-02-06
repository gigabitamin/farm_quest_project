import React from 'react';
import { Link } from 'react-router-dom';

const CommunityLeft = ({ setMainType }) => {
    return (
        <aside id="community_left_menu">
            <div className="community_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="community_left_box" onClick={() => setMainType('farmlog')}>팜로그</div>
            <div className="community_left_box" onClick={() => setMainType('qna')}>Q&A</div>
            <div className="community_left_box">북마크</div>
        </aside>
    );
};

export default CommunityLeft;