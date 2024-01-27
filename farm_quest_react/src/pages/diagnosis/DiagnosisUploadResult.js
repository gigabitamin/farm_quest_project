import React, { useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DiagnosisUploadResult.css';


const DiagnosisUploadResult = () => {

    const location = useLocation();

    console.log('(location.state.file_name = ', location.state.file_name);

    const save_file_name = location.state.file_name.save_file_name;

    const serialized_results = location.state.file_name.detect_result.serialized_results_list[0];
    const obj_result_label = serialized_results.names[serialized_results.boxes[0]['label']]
    const obj_result_prob = Number(serialized_results.boxes[0]['confidence']).toFixed(4) * 100

    const diagnosis_result_id_list = location.state.file_name.detect_result.diagnosis_result_id_list[0];
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    const containerRef = useRef();
    
    // const solution_row_list_serialized = location.state.file_name.detect_result.solution_row_list_serialized;

    // console.log(save_file_name)
    console.log('diagnosis_result_id_lsit = ', diagnosis_result_id_list)
    console.log('serialized_results = ', serialized_results)
    // console.log(serialized_results.boxes)
    console.log('tf_predict_result_list_sorted = ', tf_predict_result_list_sorted)
    // console.log(tf_predict_result_list_sorted[0])
    // console.log(tf_predict_result_list_sorted[0][0])
    // console.log(tf_predict_result_list_sorted[0][0][1])
    // console.log(tf_predict_result_list_sorted[0][0][4])
    // console.log(solution_row_list_serialized)
    // console.log(solution_row_list_serialized[0])
    // console.log(solution_row_list_serialized[0][0])
    // console.log(solution_row_list_serialized[0][0]['solution_word'])
    // const firstKey = Object.keys(tf_predict_desease_list)[0];
    // const tf_predict_desease = tf_predict_desease_list[firstKey];

    if (serialized_results && serialized_results.boxes && tf_predict_result_list_sorted[0]) {

        const url = save_file_name
            ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
            : null;

        const file_name = save_file_name.split('.')[0];

        return (
            <div className="diagnosis_result_wrap">
                <section className="diagnosis_result_section_wrap">
                    <article title="title" className="diagnosis_result_title"><h1>진단 결과</h1></article>
                    <article title="notice" className="diagnosis_result_notice"><span></span></article>
                    <article title="content" className="diagnosis_result_content_wrap">

                        <section className="diagnosis_result_analystic_wrap">
                            <article title="info" className="diagnosis_result_analystic_info">
                                <div><h3>전체 부위 탐색 결과</h3></div>
                                <div>진단파일명: {save_file_name}</div>
                                <div>진단번호: {diagnosis_result_id_list}</div>
                            </article>

                            <article title="summary" className="diagnosis_result_analystic_summary_box">
                                <div className="diagnosis_result_analystic_summary_box_item">
                                    <div><h3>진단 요약 (솔루션 워드 : 
                                        <Link title="상품추천으로 이동" to={{pathname: `/diagnosis_recommend/${tf_predict_result_list_sorted[0][1]['solution_word']}`,
                                                    state: { solutionWord: tf_predict_result_list_sorted[0][1]['solution_word'] }
                                                }}>
                                            {tf_predict_result_list_sorted[0][1]['solution_word']})
                                        </Link>
                                    </h3></div>
                                    <div>{obj_result_prob} % 의 확률로 {obj_result_label} 일 것으로 예상됩니다</div>
                                </div>
                                <div className="diagnosis_result_analystic_summary_box_detail">
                                    <div className="diagnosis_result_analystic_image"><img src={url} alt="UploadResult" className="diagnosis_result_analystic_image_img" /></div>
                                    <div className="diagnosis_result_analystic_summary_content">
                                    <div className="diagnosis_result_analystic_summary_solution_item">
                                        <div style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>증상 : {tf_predict_result_list_sorted[0][1]['symptom']}</div>
                                        <div style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>발생환경 : {tf_predict_result_list_sorted[0][1]['occurence_environment']}</div>
                                        <div style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>대처법 : {tf_predict_result_list_sorted[0][1]['solution_content']}</div>
                                    </div>                                  
                                    </div>
                                </div>

                            </article>

                            <article className="diagnosis_result_detect_wrap">
                                {Object.keys(serialized_results.boxes).map((boxKey, index) => {
                                    const label = serialized_results.boxes[boxKey]['label'];
                                    const labelName = serialized_results.names[label];
                                    const confidence = Number(serialized_results.boxes[boxKey]['confidence']).toFixed(4);
                                    const isDisease = label >= 6;
                                    const url_crops = save_file_name && index > 0 ? 
                                    `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}${index}.jpg` : 
                                    `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`;

                                    if (!isDisease) {
                                        return null;
                                    }

                                    return (
                                        <div title="detect" className="diagnosis_result_detect_item" key={index}><hr />
                                            <div className="diagnosis_result_detect_item_title">박스_{index + 1}</div>
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
                                                            <div>{labelName}</div>
                                                            <div>{confidence * 100} %</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}                         
                            </article>

                            <article title="partial_predict" className="diagnosis_result_partial_predict">
                                <h3>부위별 진단 결과</h3>
                                <div className="diagnosis_result_partial_predict_plant">진단 작물 : {tf_predict_result_list_sorted[0][0][1]}</div>
                                <div className="diagnosis_result_partial_predict_disease">예측 질병 : ({tf_predict_result_list_sorted[0][0][3]})</div>
                                <div className="diagnosis_result_partial_prob">예측 확률 : {(Number(tf_predict_result_list_sorted[0][0][4] * 100)).toFixed(2) } %</div>
                            </article>

                            <article className="diagnosis_result_predict_disease_list_wrap">
                                <h3>부위별 세부 진단 결과 예측되는 질병 리스트(확률순)</h3>
                                <div className="diagnosis_result_predict_disease_list_box">
                                    {tf_predict_result_list_sorted.map((predict, index) => (
                                        <div className="diagnosis_result_predict_disease_item" key={index}>
                                            {index + 1}. {predict[0][1]} ({predict[0][3]}) : {(Number(predict[0][4]) * 100).toFixed(2)} %
                                            <Link to={{
                                                pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                                                state: { solutionWord: predict[1]['solution_word'] }
                                            }}>
                                            <div className="diagnosis_result_solution_word">솔루션 워드 : {predict[1]['solution_word']}</div>
                                            </Link>
                                            <div className="diagnosis_result_symptom">증상 : {predict[1]['symptom']}</div>
                                            <div className="diagnosis_result_occurence_environment">발생환경 : {predict[1]['occurence_environment']}</div>
                                            <div className="diagnosis_result_guide">대처법 : {predict[1]['solution_content']}</div>
                                        </div>
                                    ))}
                                </div>

                            </article>

                        </section>
                    </article>
                    
                </section>                
            </div>
        );
    }

    const url_empty = save_file_name
        ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/${save_file_name}`
        : null;

    return (
        <div className="diagnosis_result_none">
            <div className="diagnosis_result_none_info">
                <h3>이미지 파일 업로드 완료</h3>
                <p>진단 결과 파일명: {save_file_name}</p>
                <p>진단 결과: 질병 부위를 감지하지 못했습니다</p>
            </div>
            <div className="diagnosis_result_none_info_img"><img src={url_empty} alt="UploadResult" /></div>
        </div>
    );

};

export default DiagnosisUploadResult;
