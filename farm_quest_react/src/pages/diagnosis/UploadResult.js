import React from 'react';
import { useLocation } from 'react-router-dom';


const UploadResult = () => {
    // 전달된 파라미터 값 받기 
    const location = useLocation();
    const file_name = location.state.file_name;
    const url = 'http://127.0.0.1:8000/media/result_img/' + file_name    

    return (
        <div>
            <h3>이미지 파일 업로드 완료 </h3>
            변경된 파일명 : {file_name} <br /><br />
            <img src={url} alt="Uploaded Result" />
        </div>
    );
};

export default UploadResult;