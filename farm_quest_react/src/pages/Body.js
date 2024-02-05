import React from 'react';
import '../css/body.css';
import {Link} from 'react-router-dom';
import DiagnosisUpload from './diagnosis/DiagnosisUpload'


function Body() {
  return <div className="index_body_wrap">
  <main className="index_main_ind">
      <DiagnosisUpload />
      <div className="btn_index_ind btn_guide_ind Rectangle6"><Link to="/">가이드</Link></div>
      <div className="btn_index_ind btn_scheduler_ind Rectangle7"><Link to="/">스케쥴러</Link></div>
      <div className="btn_index_ind btn_search_disease_ind Rectangle8"><Link to="/">질병서치</Link></div>
      <div className="btn_index_ind btn_community_ind Rectangle9"><Link to="/">커뮤니티</Link></div>
      <div className="btn_index_ind btn_shop_ind Rectangle10"><Link to="/">가드닝샵</Link></div>
      <div className="btn_index_ind btn_search_pest_ind Rectangle11"><Link to="/">해충서치</Link></div>
      <div className="btn_index_ind btn_photo_ind Rectangle12"><Link to="/">Photo</Link></div>
      <div className="btn_index_ind btn_qna_ind Rectangle13"><Link to="/">QNA</Link></div>
      <div className="btn_index_ind btn_calendar_ind Rectangle14"><Link to="/">Calendar</Link></div>
  </main>
  </div>
}

export default Body;
