import React from 'react';
import DiagnosisImage from './DiagnosisImage'

const DiagnosisResult = () => {
  return (
    <div className="diagnosis_wrap_box">
      <div className="diagnosis_ad_box">카테고리</div>
      <div className="diagnosis_index_box">
        <div className="diagnosis_image_box">
          <div className="diagnosis_image_limit">
            {/* diagnosis_image.html 파일의 내용을 직접 삽입 또는 React 컴포넌트로 분리 */}
            <DiagnosisImage />
          </div>
          <div>bbb</div>
          <div>ccc</div>
        </div>
        <div className="diagnosis_choice_result_box">
          <div className="diagnosis_answer_box">
            <div>
              <input type="radio" id="radio11" name="radioGroup" />
              <label htmlFor="radio11">11</label>
            </div>
            <div>
              <input type="radio" id="radio22" name="radioGroup" />
              <label htmlFor="radio22">22</label>
            </div>
            <div>
              <input type="radio" id="radio33" name="radioGroup" />
              <label htmlFor="radio33">33</label>
            </div>
          </div>
          <div className="diagnosis_choice_box">
            <div>
              <input type="radio" id="radio444" name="radioGroup" />
              <label htmlFor="radio444">444%</label>
            </div>
            <div>
              <input type="radio" id="radio555" name="radioGroup" />
              <label htmlFor="radio555">555%</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
