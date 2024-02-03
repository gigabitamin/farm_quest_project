import React from 'react';
import { useLocation } from 'react-router-dom';

const UploadResult = () => {
    const location = useLocation();
    console.log(location.state);
    console.log(location.state.file_name);

    const save_file_name = location.state.file_name.save_file_name;
    const serialized_results = location.state.file_name.serialized_results;
    const diagnosis_result_id = location.state.file_name.diagnosis_result_id;
    const tf_predict_desease_list = location.state.file_name.tf_predict_desease_list[0];    
    
    console.log(tf_predict_desease_list)        
    const firstKey = Object.keys(tf_predict_desease_list)[0];
    const tf_predict_desease = tf_predict_desease_list[firstKey];


    // serialized_results가 null 또는 undefined인 경우를 체크합니다.
    if (!serialized_results) {
        const url_empty = save_file_name
            ? `http://127.0.0.1:8000/media/diagnosis/yolo/${save_file_name}`
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
    console.log(serialized_results.names[serialized_results.boxes['0']['label']]);
    console.log(serialized_results.names[serialized_results.boxes['1']['label']]);
    console.log(serialized_results.boxes['0']['confidence']);

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
            {/* 이미지 렌더링 */}
            <img src={url} alt="UploadResult" />

            {Object.keys(serialized_results.boxes).map((boxKey, index) => {
                const label = serialized_results.boxes[boxKey]['label'];
                const labelName = serialized_results.names[label];
                const isDisease = label >= 6;

                // 이미지 URL 생성
                const url_crops = save_file_name
                    ? `http://127.0.0.1:8000/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`
                    : null;

                console.log(url_crops )

                return (
                    <div key={index}>
                        {isDisease ? (
                            <h3>탐지된 질병</h3>
                        ) : (
                            <h3>탐지된 작물</h3>
                        )}
                        <p>Box {index + 1}의 레이블: {label}</p>
                        <p>Box {index + 1}의 결과: {labelName}</p>
                        <p>Box {index + 1}의 확률: {serialized_results.boxes[boxKey]['confidence']}</p>
                        {url_crops && (
                            <img src={url_crops} alt={`Crops_${index + 1}`} />
                        )}
                    </div>
                );                
            })}

            <div>
                <h3>이미지 분류 모델 최종 진단 질병</h3>
                {firstKey} : {tf_predict_desease}
            </div>


            <div>
                <h3>확률순 예측 질병</h3>
                {Object.entries(tf_predict_desease_list).map(([key, value], index) => (
                    <p key={index}>{key}: {value}</p>
                ))}
            </div>

        



        </div>
    );
};

export default UploadResult;
