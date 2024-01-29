import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
import DiagnosisChoice from './DiagnosisChoice';
import DiagnosisAnswer from './DiagnosisAnswer';
import DiagnosisImage from './DiagnosisImage';
import DiagnosisUpload from './DiagnosisUpload';




const DiagnosisIndex = () => {
  return (
    <div>    
      <div className="diagnosis_wrap_box">
        <div className="diagnosis_ad_box">광고</div>
        <div className="diagnosis_index_box">
          <div className="diagnosis_choice_box">
            <DiagnosisChoice />
          </div>
          <div className="diagnosis_choice_result_box">
            <div className="diagnosis_answer_box">
              <DiagnosisAnswer />
            </div>
            <div className="diagnosis_image_box">
              <DiagnosisImage />
              <DiagnosisUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DiagnosisIndex;
