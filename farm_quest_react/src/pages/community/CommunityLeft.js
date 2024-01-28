import React from 'react';
import { Link } from 'react-router-dom';

const CommunityLeft = ({ setMainType }) => {
    return (
        <aside id="community_left_menu">
            {/* <div className="community_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="community_left_box" onClick={() => setMainType('farmlog')}>팜로그게시판</div>
            <div className="community_left_box" onClick={() => setMainType('qna')}>QnA</div> */}
            <div className="community_left_box"><Link reloadDocument to="/community/main">전체보기</Link></div>
            <div className="community_left_box"><Link reloadDocument to="/community/farmlog">팜로그게시판</Link></div>
            <div className="community_left_box"><Link reloadDocument to="/community/qna">QnA</Link></div>
            <div className="community_left_box">미구현</div>
            <div className="community_left_box">미구현</div>
        </aside>
    );
};

export default CommunityLeft;