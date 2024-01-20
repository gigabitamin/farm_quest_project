import React from 'react';
import { useLocation } from 'react-router-dom';


const UploadResult = () => {
    // 전달된 파라미터 값 받기 
    const location = useLocation();
    const save_file_name = location.state.file_name;
    // const serialized_results = location.state.serialized_results;
    console.log(save_file_name)
    const url = 'http://127.0.0.1:8000/media/diagnosis/yolo/result_img/' + save_file_name    
    console.log(url)

    return (
        <div>
            <h3>이미지 파일 업로드 완료 </h3>            
            진단 결과 파일명 : {save_file_name} <br /><br />
            {/* 진단 작물 {serialized_results} */}
            <img src={url} alt="UploadResult" />
        </div>
    );
};

export default UploadResult;