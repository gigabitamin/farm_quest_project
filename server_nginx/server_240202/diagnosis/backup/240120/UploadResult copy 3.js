import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UploadResult = () => {
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/your-api-endpoint');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { save_file_name, additional_variable } = data;
    const url = `http://127.0.0.1:8000/media/diagnosis/yolo/result_img/${save_file_name}`;

    return (
        <div>
            <h3>이미지 파일 업로드 완료</h3>            
            진단 결과 파일명: {save_file_name} <br /><br />
            추가 변수: {additional_variable} <br /><br />
            <img src={url} alt="UploadResult" />
        </div>
    );
};

export default UploadResult;
