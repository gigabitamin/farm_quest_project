import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DiagnosisUploadResult.css';

const DiagnosisUploadResult = () => {

    const location = useLocation();

    console.log('(location.state.file_name = ', location.state.file_name);

    const save_file_name = location.state.file_name.save_file_name;
    const serialized_results = location.state.file_name.detect_result.serialized_results_list[0];
    const diagnosis_result_id_list = location.state.file_name.detect_result.diagnosis_result_id_list[0];
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    // const solution_row_list_serialized = location.state.file_name.detect_result.solution_row_list_serialized;

    // console.log(save_file_name)
    console.log('diagnosis_result_id_lsit = ', diagnosis_result_id_list)
    console.log('serialized_results = ', serialized_results)
    // console.log(serialized_results.boxes)
    // console.log(tf_predict_result_list_sorted)
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
                <div className="diagnosis_result_full_box">
                    <div className="diagnosis_result_info">
                        <h3>전체 진단 결과</h3>
                        <div>유저 파일명: {save_file_name}</div>
                        <div>진단 ID: {diagnosis_result_id_list}</div>
                    </div>

                    <div className="diagnosis_result_upload_image"><img src={url} alt="UploadResult" /></div>

                    {Object.keys(serialized_results.boxes).map((boxKey, index) => {
                        const label = serialized_results.boxes[boxKey]['label'];
                        const labelName = serialized_results.names[label];
                        const confidence = serialized_results.boxes[boxKey]['confidence'];
                        const isDisease = label >= 6;
                        const url_crops = save_file_name
                            ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`
                            : null;
                        return (
                            <div className="diagnosis_result_detect_item" key={index}><hr />
                                {isDisease ? (
                                    <h3>탐지된 질병</h3>
                                ) : (
                                    <h3>탐지된 작물</h3>
                                )}

                                <div className="diagnosis_predict_item">
                                    <div>BOX{index + 1}의 예측 대상 : {labelName}</div>
                                    <div>BOX{index + 1}의 예측 확률: {confidence * 100} %</div>
                                </div>
                                <div className="diagnosis_predict_image">
                                    {url_crops && (<img src={url_crops} alt={`Crops_${index + 1}`} />)}
                                </div>
                            </div>
                        );
                    })}
                    <br />
                    <hr />
                    <br />
                    <br />
                    <br />
                    <hr />

                    <div className="diagnosis_result_partial_predict">
                        <h3>부위별 최종 진단 결과</h3>
                        <div>진단 작물 : {tf_predict_result_list_sorted[0][0][1]}</div>
                        <div>예측 질병 : ({tf_predict_result_list_sorted[0][0][3]})</div>
                        <div>예측 확률 : {tf_predict_result_list_sorted[0][0][4] * 100} %</div>
                    </div>
                    <div className="diagnosis_result_partial_predict_disease">
                        <br />
                        <br />
                        <hr />
                        <h3>부위별 세부 진단 결과 예측되는 질병 리스트(확률순)</h3>
                        <hr />
                        <br />
                        <div>
                            {tf_predict_result_list_sorted.map((predict, index) => (
                                <div key={index}>{index + 1}. {predict[0][1]}

                                    ({predict[0][3]})
                                    : {predict[0][4]}
                                    <Link to={{
                                        pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                                        state: { solutionWord: predict[1]['solution_word'] }
                                    }}>
                                        <div className="solution_word">솔루션 워드 : {predict[1]['solution_word']}</div>
                                    </Link>
                                    <div className="disgnosis_symptom">증상 : {predict[1]['symptom']}</div>
                                    <div className="diagnosis_occurence_environment">발생환경 : {predict[1]['occurence_environment']}</div>
                                    <div className="diagnosis_action_guide">대처법 : {predict[1]['solution_content']}</div>
                                    <hr />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
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
            <div><img src={url_empty} alt="UploadResult" /></div>
        </div>
    );

};

export default DiagnosisUploadResult;
