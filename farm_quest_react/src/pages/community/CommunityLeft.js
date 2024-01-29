import React from 'react';
import { Link } from 'react-router-dom';

const CommunityLeft = ({ setMainType }) => {
    return (
        <aside id="community_left_menu">
            {/* <div className="community_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="community_left_box" onClick={() => setMainType('farmlog')}>팜로그게시판</div>
            <div className="community_left_box" onClick={() => setMainType('qna')}>QnA</div> */}
            <Link reloadDocument to="/community/main"><div className="community_left_box">전체보기</div></Link>
            <Link reloadDocument to="/community/farmlog"><div className="community_left_box">팜로그</div></Link>
            <Link reloadDocument to="/community/qna"><div className="community_left_box">QnA</div></Link>
            <div className="community_left_box">미구현</div>
            <div className="community_left_box">미구현</div>
        </aside>
    );
};

export default CommunityLeft;