import React from 'react';
import {Link} from 'react-router-dom';

const DiagnosisLink = () => {
    // 진단시스템 컴포넌트 상태 변경
    return (
        <div>
            <div className="nav-item_hd">
                <div className="btn_hd"><Link to="/diagnosis_choice">진단 작물 선택</Link></div>                
                <div className="dropdown-menu_hd">
                    <div className="nav-link_hd"><Link to="/diagnosis_index">작물 진단</Link></div>    
                    <div className="btn_hd"><Link to="/diagnosis_answer">진단 문진표 작성</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_upload">진단 이미지 업로드 연동페이지</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_upload_result">진단 결과 연동페이지</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_result">진단 결과 독립페이지</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_recommend">진단 결과 추천 상품</Link></div>
                    <div className="btn_hd"><Link to="/diagnosis_detail">디테일</Link></div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisLink;