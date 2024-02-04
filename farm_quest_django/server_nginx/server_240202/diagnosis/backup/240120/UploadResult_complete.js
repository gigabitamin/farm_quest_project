import React from 'react';
import { useLocation } from 'react-router-dom';
const UploadResult = () => {
    const location = useLocation();
    console.log(location.state);
    console.log(location.state.data);

    const save_file_name = location.state.file_name.save_file_name;
    const serialized_results = location.state.file_name.serialized_results;
    ;

    console.log(save_file_name);
    console.log(serialized_results);
    console.log(serialized_results.names);
    console.log(serialized_results.path);
    console.log(serialized_results.names[0]);
    console.log(serialized_results.boxes['1']['label']);

    // 이미지 URL 생성
    const url = save_file_name
        ? `http://127.0.0.1:8000/media/diagnosis/yolo/result_img/${save_file_name}`
        : null;

    return (
        <div>
            <h3>이미지 파일 업로드 완료</h3>
            <p>진단 결과 파일명: {save_file_name}</p>
            <p>진단 결과: {serialized_results.names[serialized_results.boxes['0']['label']]}</p>
            <p>진단 결과: {serialized_results.names[serialized_results.boxes['1']['label']]}</p>
            {/* 이미지 렌더링 */}
            <img src={url} alt="UploadResult" />
        </div>
    );
};

export default UploadResult;
