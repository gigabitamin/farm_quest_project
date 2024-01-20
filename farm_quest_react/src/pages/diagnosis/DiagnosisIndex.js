import React from 'react';
// import { useState } from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import Home from '../Home';
import DiagnosisChoice from './DiagnosisChoice';
import DiagnosisAnswer from './DiagnosisAnswer';
import DiagnosisImage from './DiagnosisImage';

const DiagnosisIndex = () => {

  // const [plantSpecies, setPlantSpecies] = useState([])
  // const [diagnosisQuestions, setdiagnosisQuestions] = useState([])
  
  return (
    <div>
      <style>
        {/* 내용은 그대로 유지 */}
      </style>

      {/* {solutionContent.map((solution) => (
        <div key={solution.solution_id} className="testimonial-item bg-light rounded p-3">
          <div className="bg-white border rounded p-4">
            <Link to="/" title="#">
              <p>환경: {solution.symptom}</p>
            </Link>
            <div className="d-flex align-items-center">               
              <Link to="/" title="#">                
              </Link>
              <Link to="/" title="#">
                <div className="ps-3">                
                  <small></small>
                </div>
              </Link>
              <Routes>
                <Route path="/" element={<Home />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      ))} */}

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
            </div>
          </div>
        </div>

      </div>

      {/* 기존의 script 태그의 내용도 필요에 따라 React 코드로 변환 */}
    </div>
  );
};

export default DiagnosisIndex;



