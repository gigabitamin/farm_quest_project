import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './DiagnosisUpload.css'

const DiagnosisUpload = () => {
    const location = useLocation();
    // console.log(location.state);
    // console.log(location.state.data);
    
    const newDiagnosisResultId = location.state.newDiagnosisResultId.diagnosis_result_id;
    const user_select_plant = location.state.newDiagnosisResultId.user_select_plant;    

    let history = useNavigate();

    const setThumbnailOne = (e) => {
        let img = document.createElement("img");
        const reader = new FileReader();
            
        document.querySelector("#imgPreviewOne").innerHTML = '';
    
        reader.onload = function (event) {
            img.setAttribute("src", event.target.result);
        }
    
        reader.readAsDataURL(e.target.files[0]);
        document.querySelector("#imgPreviewOne").appendChild(img);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        var frmData = new FormData(document.frmUpload);
    
        frmData.append('diagnosis_result_id', newDiagnosisResultId);
        frmData.append('plant_name', user_select_plant.plant_name)
        frmData.append('plant_no', user_select_plant.plant_no)

        axios.post(`http://localhost:8000/diagnosis_upload/`, frmData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(
            response => {
                alert("업로드 완료");
                console.log(response.data);                    
                history('/diagnosis_upload_result', {
                    state: { file_name: response.data }
                }); 
            }
        )
    };

    return (
        <div ClassName="diagnosis_upload_image_box">            
            <form name="frmUpload" method='post' onSubmit={onSubmit}>                
                진단할 이미지 : {user_select_plant.plant_name} <br />
                이미지 : <input type='file' name='imgFile' id='imgFile' onChange={setThumbnailOne} />
                <input type='submit' value='완료' />
            </form><br /><br />
            <div id="imgPreviewOne"></div>
        </div>
    );
};

export default DiagnosisUpload;