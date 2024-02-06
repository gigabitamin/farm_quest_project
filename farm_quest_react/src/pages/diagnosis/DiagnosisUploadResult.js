import React, { useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiagnosisUploadResult.css';


const DiagnosisUploadResult = () => {
    const location = useLocation();
    const DjangoServer = useSelector(state => state.DjangoServer);
    const save_file_name = location.state.file_name.save_file_name;
    const yolo_plant_name = location.state.file_name.plant_name;
    const serialized_results = location.state.file_name.detect_result.serialized_results_list[0];
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    const diagnosis_result_pk = location.state.file_name.diagnosis_result_pk
    const containerRef = useRef();
    const crops_path_list = location.state.file_name.detect_result.crops_path_list

    let highestConfidence = 0;
    let selectedBoxIndex = -1;

    for (let i = 0; i < serialized_results.boxes.length; i++) {
        const label = serialized_results.boxes[i]['label'];
        const confidence = Number(serialized_results.boxes[i]['confidence']);

        if (label >= 6 && confidence > highestConfidence) {
            highestConfidence = confidence;
            selectedBoxIndex = i;
        }
    }

    const obj_result_label = selectedBoxIndex !== -1
        ? serialized_results.names[serialized_results.boxes[selectedBoxIndex]['label']]
        : null;

    const obj_result_prob = selectedBoxIndex !== -1
        ? Number(serialized_results.boxes[selectedBoxIndex]['confidence']).toFixed(4) * 100
        : null;

    const obj_yolo_solution_word = selectedBoxIndex !== -1
        ? serialized_results.boxes[selectedBoxIndex]['solution_info']['solution_word']
        : null;


    const navigate = useNavigate();
    const recommendClick = () => {
        navigate(`/diagnosis_recommend/${obj_yolo_solution_word}`, { solutionWord: obj_yolo_solution_word });
    };

        const publicChoice = (event) => {
            event.preventDefault();
            const choice = event.target.querySelector('input[name="public_choice"]:checked').value;
            if (choice === 'yes') {
                alert('진단 결과 게시에 동의하셨습니다');
            } else {
                alert('진단 결과 게시에 동의하지 않으셨습니다');
            }
        };
    

    if (serialized_results && serialized_results.boxes && tf_predict_result_list_sorted[0]) {

        const url = save_file_name
            ? `${DjangoServer}/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
            : null;

        return (
            <div className="diagnosis_result_wrap">
                <section className="diagnosis_result_section_wrap">
                    <article title="title" className="diagnosis_result_title"></article>
                    <article title="notice" className="diagnosis_result_notice"><span></span></article>
                    <article title="content" className="diagnosis_result_content_wrap">

                        <section className="diagnosis_result_analystic_wrap">

                            <section className="diagnosis_result_yolo_analystic_wrap">
                                    <div className='diagnosis_result_public_select'>
                                        <div>진단 결과 게시물을 커뮤니티에 공개하시는데 동의하시면 '예' 를 선택 해주세요</div>
                                        <form onSubmit={publicChoice}>
                                            <div>
                                                <label>
                                                    예
                                                    <input type="radio" name="public_choice" value="yes" />
                                                </label>
                                                <label>
                                                    아니오
                                                    <input type="radio" name="public_choice" value="no" />
                                                </label>
                                                <button type="submit">제출</button>
                                            </div>
                                        </form>
                                    </div>
                                <article title="info" className="diagnosis_result_analystic_info">
                                    
                                    <div>
                                        <h3>전체 부위 탐색 결과 (진단 작물 :
                                            <Link title="가이드로 이동" to={{
                                                pathname: `/guide_detail6`,
                                            }}>
                                                <span className="diagnosis_button">{yolo_plant_name}</span>
                                            </Link>)
                                        </h3>

                                    </div>
                                    <div>진단파일명: {save_file_name}</div>
                                    <div>진단번호:
                                        <Link to="/diagnosis_board/main"><span className='diagnosis_button'>{diagnosis_result_pk}</span></Link>
                                    </div>
                                </article>

                                <article title="summary" className="diagnosis_result_analystic_summary_box">
                                    <div className="diagnosis_result_analystic_summary_box_item">
                                        <div><h3>진단 요약
                                        </h3></div>
                                        <div>약 {obj_result_prob} % 의 확률로 <Link to="/Scheduler"><span className='diagnosis_button_1'>{obj_result_label}</span></Link> 일 것으로 예상됩니다</div>

                                        <div className="toRecommend" onClick={recommendClick}>
                                            솔루션 워드 :
                                            <span className="diagnosis_button">{obj_yolo_solution_word}</span>
                                        </div>
                                    </div>
                                    <div className="diagnosis_result_analystic_summary_box_detail">
                                        <div className="diagnosis_result_analystic_image"><img src={url} alt="UploadResult" className="diagnosis_result_analystic_image_img" /></div>
                                        <div className="diagnosis_result_analystic_summary_content">
                                            <div className="diagnosis_result_analystic_summary_solution_item">
                                                <div ref={containerRef} >증상 : {tf_predict_result_list_sorted[0][1]['symptom']}</div>
                                                <div ref={containerRef} >발생환경 : {tf_predict_result_list_sorted[0][1]['occurence_environment']}</div>
                                                <div ref={containerRef} >대처법 : {tf_predict_result_list_sorted[0][1]['solution_content']}</div>
                                            </div>
                                        </div>
                                    </div>

                                </article>

                                <article className="diagnosis_result_detect_wrap">
                                    {serialized_results.boxes
                                        .filter(box => box.label >= 6)
                                        .map((box, index) => {
                                            const label = box.label;
                                            const labelName = serialized_results.names[label];
                                            const confidence = Number(box.confidence).toFixed(4);
                                            const isDisease = label >= 6;


                                            if (!isDisease) {
                                                return null;
                                            }

                                            const url_crops = crops_path_list[index];

       
                                            return (
                                                <div title="detect" className="diagnosis_result_detect_item" key={index}><hr />

                                                    <div className="diagnosis_result_detect_item_content">
                                                        <div className="diagnosis_result_predict_image">
                                                            {url_crops && (<img src={url_crops} alt={`Crops_${index}`} />)}

                                                        </div>
                      
                                                        <div className="diagnosis_result_detect_content">
                                                            <div>
                                                                {/* {isDisease ? (
                                                                    <h3>탐지된 질병</h3>
                                                                ) : (
                                                                    <h3>탐지된 작물</h3>
                                                                )} */}

                                                                {/* <h3>탐지된 질병</h3> */}
                                                                <div className="diagnosis_result_predict_item">
                                                                    <div className="diagnosis_result_detect_item_title">박스_{index + 1}</div>
                                                                    <div className="diagnosis_result_detect_item_1">{labelName}</div>
                                                                    <div className="diagnosis_result_detect_item_2">{confidence * 100} %</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </article>
                            </section>

                            <section className="diagnosis_result_tf_analystic_wrap">
                                <article title="partial_predict_summary" className="diagnosis_result_partial_predict">
                                    <h3>부위별 상세 진단 결과 : 진단 작물 ({tf_predict_result_list_sorted[0][0][1]}) </h3>
                                    {Number(tf_predict_result_list_sorted[0][0][4] * 100) <= 30 ? (
                                        <div>죄송합니다 예상되는 정보를 찾을 수 없습니다</div>
                                    ) : (
                                        <>                                            
                                            <div className="diagnosis_result_partial_predict_disease">
                                                {(Number(tf_predict_result_list_sorted[0][0][4] * 100)).toFixed(2)} % 의 확률로 <span className='diagnosis_button_1'>({tf_predict_result_list_sorted[0][0][3]})</span> 일 것으로 예상됩니다
                                            </div>
                                           
                                        </>
                                    )}
                                </article>

                                <article title="partial_predict_detail" className="diagnosis_result_predict_disease_list_wrap">
                                    <h3>부위별 상세 진단 결과 예측 후보</h3>
                                    <div className="diagnosis_result_predict_disease_list_box">
                                        {tf_predict_result_list_sorted.map((predict, index) => {
                                            const probability = (Number(predict[0][4]) * 100).toFixed(2);
                                            if (probability <= 30) {
                                                return null;
                                            }

                                            if (index >= 2) {
                                                return null;
                                            }

                                            return (
                                                <div className="diagnosis_result_predict_disease_item" key={index}>
                                                    <div className="diagnosis_result_predict_disease_item_summary">
                                                        <div className="diagnosis_result_predict_disease_item_summary_item">
                                                            {index + 1}. {predict[0][1]} ({predict[0][3]}) : {probability} %
                                                        </div>
                                                        <div className="diagnosis_result_solution_word">
                                                            솔루션 워드 :
                                                            <Link title="상품추천으로 이동" to={{
                                                                pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                                                                state: { solutionWord: predict[1]['solution_word'] }
                                                            }}>
                                                                <span className="diagnosis_button">{predict[1]['solution_word']}</span>
                                                            </Link>
                                                        </div>
                                                        <div className="diagnosis_result_predict_disease_item_content_wrap">
                                                            <div className="diagnosis_result_symptom">증상 : {predict[1]['symptom']}</div>
                                                            <div className="diagnosis_result_occurence_environment">발생환경 : {predict[1]['occurence_environment']}</div>
                                                            <div className="diagnosis_result_guide">대처법 : {predict[1]['solution_content']}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </article>
                            </section>
                        </section>
                    </article>
                </section>
            </div>
        );
    }

    const url_empty = save_file_name
        ? `${DjangoServer}/media/diagnosis/yolo/origin_img/${save_file_name}`
        : null;

    return (
        <div className="diagnosis_result_none">
            <div className="diagnosis_result_none_info">
                <div><h3>진단 결과</h3></div>
                <div>진단 파일명: {save_file_name}</div>
                <div>죄송합니다 질병 부위를 찾지 못했습니다</div>
            </div>
            <div className="diagnosis_result_none_info_img_div"><img className="diagnosis_result_none_info_img" src={url_empty} alt="UploadResult" /></div>
        </div>
    );

};

export default DiagnosisUploadResult;
