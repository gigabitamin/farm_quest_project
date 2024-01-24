import React from 'react';
import {Link} from 'react-router-dom';

const TestLink = () => {
    // 진단시스템 컴포넌트 상태 변경
    return (
        <div>
            <div className="nav-item_hd">
                <div className="btn_hd"><Link to="/diagnosis_choice">테스트</Link></div>
                <div className="dropdown-menu_hd">
                    <div className="nav-link_hd"><Link to="/login_valid">로그인 검증</Link></div>
                    <div className="nav-link_hd"><Link to="/user_info">유저 정보</Link></div>
                    <div className="nav-link_hd"><Link to="/logout">로그 아웃</Link></div>
                    <div className="login_cookie"><Link to="/logout">로그인 쿠키</Link></div>
                </div>
            </div>
        </div>
    );
};

export default TestLink;