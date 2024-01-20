import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    let history = useNavigate();

    // 이미지 미리보기
    const setThumbnailOne = (e) => {
        let img = document.createElement("img");
        const reader = new FileReader();
        reader.onload = function (event) {
            img.setAttribute("src", event.target.result);
            // img_name = event.target.result
        }
        reader.readAsDataURL(e.target.files[0]);
        document.querySelector("#imgPreviewOne").appendChild(img);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var frmData = new FormData(document.frmUpload);
        axios.post(`http://localhost:8000/upload/`, frmData, {
            headers: { 'content-type': 'multipart/form-data' }
        })
            .then(
                response => {
                    alert("업로드 완료");
                    console.log(response.data);
                    // 포워딩 하면서 파라미터 전달 
                    history('/uploadResult', {
                        state: { file_name: response.data }
                    }); // 업로드 결과 화면으로 이동
                }
            )
    };




    return (
        <div>
            <h2>단일 파일 업로드</h2>
            <form name="frmUpload" method='post' onSubmit={onSubmit}>
                이미지 : <input type='file' name='imgFile' id='imgFile' onChange={setThumbnailOne} />
                <input type='submit' value='완료' />
            </form><br /><br />
            <div id="imgPreviewOne"></div>
        </div>
    );
};

export default Upload;