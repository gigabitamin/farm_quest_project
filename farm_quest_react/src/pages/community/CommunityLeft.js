import React from 'react';
import { Link } from 'react-router-dom';

const CommunityLeft = ({ setMainType }) => {
    return (
        <aside id="community_left_menu">
            <div className="community_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="community_left_box" onClick={() => setMainType('farmlog')}>팜로그</div>
            <div className="community_left_box" onClick={() => setMainType('qna')}>Q&A</div>
            {/* <Link reloadDocument to="/community/main"><div className="community_left_box">전체보기</div></Link>
            <Link reloadDocument to="/community/farmlog"><div className="community_left_box">팜로그</div></Link>
            <Link reloadDocument to="/community/qna"><div className="community_left_box">QnA</div></Link> */}
        </aside>
    );
};

export default CommunityLeft;