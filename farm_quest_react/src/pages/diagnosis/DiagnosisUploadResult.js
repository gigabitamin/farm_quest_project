import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DiagnosisUploadResult = () => {

    const location = useLocation();

    // console.log(location.state);
    console.log(location.state.file_name);    

    const save_file_name = location.state.file_name.save_file_name;
    const serialized_results = location.state.file_name.detect_result.serialized_results_list;
    const diagnosis_result_id = location.state.file_name.diagnosis_result_id;        
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    // const solution_row_list_serialized = location.state.file_name.detect_result.solution_row_list_serialized;

    // console.log(save_file_name)
    // console.log(diagnosis_result_id)    
    // console.log(serialized_results)
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

    
    if (serialized_results[0] && serialized_results[0].boxes) {
        
        const url = save_file_name
            ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
            : null;
    
        const file_name = save_file_name.split('.')[0];
    
        return (
            <div>
                <div>
                    <h3>전체 진단 결과</h3>
                    <div>유저 파일명: {save_file_name}</div>
                    <div>진단 ID: {diagnosis_result_id}</div>
                </div>
                <div><img src={url} alt="UploadResult" /></div>
    
                {Object.keys(serialized_results[0].boxes).map((boxKey, index) => {
                        const label = serialized_results[0].boxes[boxKey]['label'];
                        const labelName = serialized_results[0].names[label];
                        const confidence = serialized_results[0].boxes[boxKey]['confidence'];
                        const isDisease = label >= 6;                
                        const url_crops = save_file_name
                            ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`
                            : null;
                        return (
                            <div key={index}><hr />
                                {isDisease ? (                            
                                    <h3>탐지된 질병</h3>
                                ) : (
                                    <h3>탐지된 작물</h3>
                                )}
                                
                                <div>                            
                                    <div>BOX{index + 1}의 예측 대상 : {labelName}</div>
                                    <div>BOX{index + 1}의 예측 확률: {confidence * 100} %</div>
                                </div>
                                {url_crops && (
                                    <img src={url_crops} alt={`Crops_${index + 1}`} />
                                )}
                            </div>
                        );                
                    })}
                    <br />
                    <hr /> 
                    <br />
                    <br />
                    <br />
                    <hr />
        
                    <div>
                        <h3>부위별 최종 진단 결과</h3>
                        <div>진단 작물 : {tf_predict_result_list_sorted[0][0][1]}</div>
                        <div>예측 질병 : ({tf_predict_result_list_sorted[0][0][3]})</div>
                        <div>예측 확률 : {tf_predict_result_list_sorted[0][0][4] * 100} %</div>
                    </div>
                    <div>
                        <br />
                        <br />
                        <hr />
                        <h3>부위별 세부 진단 결과 예측되는 질병 리스트(확률순)</h3>
                        <hr /> 
                        <br />
                        <div>
                            {tf_predict_result_list_sorted.map((predict, index) => (
                                <div key={index}>{index + 1}. {predict[0][1]}
                                    
                                    ({predict[0][3]}) : {predict[0][4]}
                                    <Link to={{pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                                        state: { solutionWord: predict[1]['solution_word'] }}}>
                                        <div>솔루션 워드 : {predict[1]['solution_word']}</div>
                                        <div></div>
                                        
                                    </Link>
                                    <div>증상 : {predict[1]['symptom']}</div>
                                    <div>발생환경 : {predict[1]['occurence_environment']}</div>                            
                                    <div>대처법 : {predict[1]['solution_content']}</div>
                                    <hr />
                                </div>
                                
                            ))}
                        </div>
        
                    </div> 
        
                </div>
            );

    }


    const url_empty = save_file_name
    ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/${save_file_name}`
    : null;

    return (
    <div>
        <h3>이미지 파일 업로드 완료</h3>
        <p>진단 결과 파일명: {save_file_name}</p>
        <p>진단 결과: 질병 부위를 감지하지 못했습니다</p>        
        <img src={url_empty} alt="UploadResult" />
    </div>
    );

};

export default DiagnosisUploadResult;
