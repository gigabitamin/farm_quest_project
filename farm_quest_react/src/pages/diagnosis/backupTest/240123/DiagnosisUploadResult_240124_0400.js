import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DiagnosisUploadResult = () => {

    const location = useLocation();

    // console.log(location.state);
    console.log(location.state.file_name);    

    const save_file_name = location.state.file_name.save_file_name;
    const serialized_results = location.state.file_name.detect_result.serialized_results_list[0];
    const diagnosis_result_id = location.state.file_name.diagnosis_result_id;        
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    // const solution_row_list_serialized = location.state.file_name.detect_result.solution_row_list_serialized;

    // console.log(save_file_name)
    // console.log(diagnosis_result_id)
    
    // console.log(serialized_results)
    // console.log(serialized_results.boxes)
    
    console.log(tf_predict_result_list_sorted)
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


    // serialized_results가 null 또는 undefined인 경우를 체크합니다.
    if  (serialized_results.boxes < 1) {
        const url_empty = save_file_name
            ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/${save_file_name}`
            : null;

        return (
            <div>
                <h3>이미지 파일 업로드 완료</h3>
                <p>진단 결과 파일명: {save_file_name}</p>                
                <p>진단 결과: 질병 부위를 감지하지 못했습니다</p>
                {/* 이미지 렌더링 */}
                <img src={url_empty} alt="UploadResult" />



                
            </div>

        );
    }

    // console.log(serialized_results.names);
    // console.log(serialized_results.names[serialized_results.boxes['0']['label']]);
    // console.log(serialized_results.names[serialized_results.boxes['1']['label']]);
    // console.log(serialized_results.boxes['0']['confidence']);

    // 이미지 URL 생성
    const url = save_file_name
        ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
        : null;

    const file_name = save_file_name.split('.')[0];

    
   

    return (
        <div>
            <h3>이미지 파일 업로드 완료</h3>
            <p>진단 결과 파일명: {save_file_name}</p>
            <p>진단 결과 ID: {diagnosis_result_id}</p>

            <img src={url} alt="UploadResult" />

            {Object.keys(serialized_results.boxes).map((boxKey, index) => {
                const label = serialized_results.boxes[boxKey]['label'];
                const labelName = serialized_results.names[label];
                const confidence = serialized_results.boxes[boxKey]['confidence'];
                const isDisease = label >= 6;
                
                const url_crops = save_file_name
                    ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`
                    : null;

                return (
                    <div key={index}>
                        {isDisease ? (
                            <h3>탐지된 질병</h3>
                        ) : (
                            <h3>탐지된 작물</h3>
                        )}
                        <p>Box {index + 1}의 레이블: {label}</p>
                        <p>Box {index + 1}의 결과: {labelName}</p>
                        <p>Box {index + 1}의 확률: {confidence}</p>
                        {url_crops && (
                            <img src={url_crops} alt={`Crops_${index + 1}`} />
                        )}
                    </div>
                );                
            })}

            <div>
                <h3>이미지 분류 모델 최종 진단 질병</h3>
                {tf_predict_result_list_sorted[0][0][1]} ({tf_predict_result_list_sorted[0][0][3]}) : {tf_predict_result_list_sorted[0][0][4]}
            </div>


            <div>
                <h3>확률순 예측 질병</h3>
                {tf_predict_result_list_sorted.map((predict, index) => (
                    <div key={index}>{index + 1}. {predict[0][1]} ({predict[0][3]}) : {predict[0][4]} - solution_keyword : 
                    <Link
                        to={{
                        pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                        state: { solutionWord: predict[1]['solution_word'] }
                        }}
                    >
                        {predict[1]['solution_word']}
                    </Link>                    
                    
                    </div>
                ))}

            </div> 

        </div>
    );
};

export default DiagnosisUploadResult;
