import React from 'react';
import { Link } from 'react-router-dom';

const DiagnosisLink = () => {    
    return (
        <div>
            <div className="nav-item_hd">
                <div className="btn_hd"><Link to="/diagnosis_upload">작물 진단</Link></div>
                <div className="dropdown-menu_hd">                    
                    <div className="btn_hd"><Link to="/diagnosis_recommend/비료">진단 결과 추천상품</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_board/main">진단 게시판</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_answer">문진표 작성</Link></div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisLink;