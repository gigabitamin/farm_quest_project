import React from 'react';
import FarmQuestSiteLogo from '../../images/logo/farm_quest_site.png';

const DiagnosisImage = () => {
  return (
    <div className="diagnosis_chart_main diagnosis_main">
      <section className="diagnosis_image_section">
        <article className="diagnosis_image_article">
          <div className="diagnosis_image_img">
            <img src={FarmQuestSiteLogo} alt="로고" />
          </div>
          <div className="diagnosis_image_text">
            <p>업로드 이미지</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DiagnosisImage;
