import React from 'react';
import '../css/body.css';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 부트스트랩 아이콘 CSS 추가
import DiagnosisUpload from './diagnosis/DiagnosisUpload'

function Body() {
  return (
    <div className="index_body_wrap">
      <div className='diagnosisUpload'><DiagnosisUpload /></div>
      
      <main className="index_main_ind">

        <div className="btn_index_ind btn_large btn_guide_ind">
          <Link to="/guide_index">
            <div><i className="bi bi-journal-text"></i></div>
            <div>가이드</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_large btn_scheduler_ind">
          <Link to="/Scheduler">
            <div><i className="bi bi-calendar3"></i></div>
            <div>스케쥴러</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_large btn_shop_ind">
          <Link to="/gardening_shop_index">
            <div><i className="bi bi-shop"></i></div>
            <div>가드닝샵</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_large btn_community_ind">
          <Link to="/community/main">
            <div><i className="bi bi-people"></i></div>
            <div>커뮤니티</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_photo_ind">
          <Link to="/">
            <div><i className="bi bi-camera"></i></div>
            <div>Photo</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_qna_ind">
          <Link to="/cs_index">
            <div><i className="bi bi-question-circle"></i></div>
            <div>QNA</div>
          </Link>
        </div>
        <div className="btn_index_ind btn_calendar_ind">
          <Link to="/Scheduler">
            <div><i className="bi bi-calendar2-week"></i></div>
            <div>Calendar</div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Body;
