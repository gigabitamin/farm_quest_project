import React from 'react';

const DiagnosisDetail = () => {
  const plantSpecies = ['고추', '딸기', '시설포도', '오이', '토마토', '파프리카'];

  const handleChoiceSubmit = () => {
    // 작물 선택 완료 시 처리 로직
  };

  const handleAnswerSubmit = () => {
    // 답변 완료 시 처리 로직
  };

  return (
    <>

      <div className="diagnosis_wrap_box">
        <div className="diagnosis_ad_box">
          <div className="diagnosis_ad_content">광고</div>
        </div>
        <div className="diagnosis_index_box">
          <div className="diagnosis_choice_box">
            <div className="diagnosis_choice_main diagnosis_main">
              <section className="diagnosis_choice_section">
                <article className="diagnosis_choice_article">
                  <div className="diagnosis_choice_wrap">
                    <form id="diagnosis_choice_form">
                      <h2>작물 선택</h2>
                      {plantSpecies.map((plant) => (
                        <label key={plant.plant_name}>
                          <input type="radio" name="choice_plant" value={plant.plant_name} />
                          {plant.plant_name}
                        </label>
                      ))}
                      <button type="button" onClick={handleChoiceSubmit}>
                        선택완료
                      </button>
                    </form>
                  </div>
                </article>
              </section>
            </div>
          </div>
          <div className="diagnosis_choice_result_box">
            <div className="diagnosis_answer_box">
              <div className="diagnosis_answer_main diagnosis_main">
                <section className="diagnosis_answer_section">
                  <article className="diagnosis_answer_article">
                    <div className="diagnosis_answer_wrap">
                      <form id="diagnosis_answer_form">
                        <h2>문진표</h2>                        
                        <div>                          
                          <label>
                            <input type="radio" name="question" value="예" required />예
                            <input type="radio" name="question" value="아니오" required />아니오
                          </label>
                        </div>
                        <button type="button" onClick={handleAnswerSubmit}>
                          답변완료
                        </button>
                      </form>
                    </div>
                  </article>
                </section>
              </div>
            </div>
            <div className="diagnosis_image_box">
              <div className="diagnosis_chart_main diagnosis_main">
                <section className="diagnosis_image_section">
                  <article className="diagnosis_image_article">
                    <div className="diagnosis_image_img">
                      <img src="../static/image/logo/farm_quest_site.png" alt="업로드 이미지" />
                    </div>
                    <div className="diagnosis_image_text">
                      <p>이미지 설명</p>
                    </div>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosisDetail;
