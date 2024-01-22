// Upload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [imgPreview, setImgPreview] = useState(null);
    const navigate = useNavigate();

    const setThumbnailOne = (e) => {
        let img = document.createElement("img");
        const reader = new FileReader();

        reader.onload = function (event) {
            img.setAttribute("src", event.target.result);
            setImgPreview(event.target.result);
        }

        reader.readAsDataURL(e.target.files[0]);
        document.querySelector("#imgPreviewOne").appendChild(img);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(document.frmUpload);

        try {
            const response = await axios.post('http://localhost:8000/upload/', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            alert("업로드 완료");
            console.log(response.data);

            navigate('/uploadResult', {
                state: { file_name: response.data }
            });

        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    };

    return (
        <div>
            <h2>단일 파일 업로드</h2>
            <form name="frmUpload" method='post' onSubmit={onSubmit}>
                이미지 : <input type='file' name='imgFile' id='imgFile' onChange={setThumbnailOne} />
                <input type='submit' value='완료' />
            </form><br /><br />
            <div id="imgPreviewOne">{imgPreview && <img src={imgPreview} alt="Preview" />}</div>
        </div>
    );
};

export default Upload;
