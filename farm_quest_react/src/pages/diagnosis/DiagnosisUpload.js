import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import './DiagnosisChoice.css';
import './DiagnosisUpload.css';
// import DiagnosisUpload from './DiagnosisUpload';
import DjangoServer from '../../DjangoServer'

const DiagnosisUpload = () => {
    const navigate = useNavigate();

    // const DjangoServer = useSelector(state => state.DjangoServer);
    const [plantSpecies, setPlantSpecies] = useState([]);
    const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [diagnosisReadyNotice, setDiagnosisReadyNotice] = useState('이미지를 업로드 해주세요')

    useEffect(() => {
        plantLoadData();
    }, []);

    const plantLoadData = async () => {
        try {
            const response = await axios.get(`${DjangoServer}/plant_api/`);
            setPlantSpecies(response.data);
        } catch (error) {
            console.error('Error fetching plant data:', error);
        }
    };

    const handlePlantChange = (e) => {
        setSelectedPlantIndex(e.target.value);

        const selectedPlant = plantSpecies.find((plant) => plant.plant_no === parseInt(e.target.value, 10));
        setSelectedPlant(selectedPlant);
        setDiagnosisReadyNotice('진단하실 작물 종이 맞는지 확인 후 시작 버튼을 눌러주세요');
    };


    const setThumbnailOne = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('진단할 이미지를 선택해주세요.');
            return;
        }

        if (!selectedPlant) {
            alert('진단할 작물을 선택해 주세요');
            return;
        }

        const formData = new FormData();
        formData.append('plant_name', selectedPlant.plant_name);
        formData.append('plant_no', selectedPlant.plant_no);
        formData.append('imgFile', selectedFile);

        axios
            .post(`${DjangoServer}/diagnosis_upload/`, formData, { headers: { 'content-type': 'multipart/form-data' }, })
            .then(response => {
                console.log('response', response)
                alert("진단 완료 : 진단결과 페이지로 이동합니다");
                navigate('/diagnosis_upload_result', { state: { file_name: response.data } });
            });
    };


    return (
        <div id='diagnosisWrap'>
            <div className="diagnosis_ready_wrap">
                <section className="diagnosis_ready_section_wrap">
                    <article title="title" className="diagnosis_ready_title"><h1>작물 진단</h1></article>
                    <article title="notice" className="diagnosis_ready_notice"><span>{diagnosisReadyNotice}</span></article>
                    <article title="content" className="diagnosis_ready_content_warp">

                        <section className="diagnosis_ready_process_wrap">
                            <article title="upload_image" className="diagnosis_ready_process_upload_image">
                                <input
                                    type="file"
                                    name="imgFile"
                                    id="imgFile"
                                    onChange={setThumbnailOne}
                                    className="diagnosis_ready_submit_setThumbnailOne"
                                />
                                {selectedPlant && previewUrl && (
                                    <input
                                        type="submit"
                                        value={selectedPlant.plant_name + " : 진단 시작"}
                                        name="imgFile"
                                        id="imgFile"
                                        className="diagnosis_ready_submit_handleUploadSubmit"
                                        onClick={handleUploadSubmit}
                                    />
                                )}
                            </article>

                            <article title="select_plant" className="diagnosis_ready_process_select_plant_wrap">
                                {previewUrl && (
                                    <div className="diagnosis_ready_process_select_plant_div">
                                        <article className="diagnosis_upload_image_content_box">
                                            <div className="diagnosis_upload_image_content_img_box">
                                                <img className="diagnosis_upload_image_content_img" src={previewUrl} alt="진단할 작물" />
                                            </div>

                                            <div className="diagnosis_upload_image_content_plant">
                                                {plantSpecies.map((plant) => (
                                                    <div key={plant.plant_no} className="diagnosis_upload_image_content_select_plant">
                                                        <label>
                                                            <div className="diagnosis_upload_image_select_plant_box">
                                                                <div>
                                                                    <input
                                                                        type="radio"
                                                                        name="choice_plant"
                                                                        value={plant.plant_no}
                                                                        onChange={handlePlantChange}
                                                                    />
                                                                </div>
                                                                <div>{plant.plant_name}</div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </article>
                                        <article className="diagnosis_choice_map_box">
                                            {plantSpecies.map((plant) => (
                                                <div key={plant.plant_no} className="diagnosis_choice_map_one">
                                                    <label>
                                                        <div className="diagnosis_choice_select_box">
                                                            {/* <input
                                                                type="radio"
                                                                name="choice_plant"
                                                                value={plant.plant_no}
                                                                onChange={handlePlantChange}
                                                            />  */}
                                                            <div>
                                                                <img
                                                                    src={plant.plant_main_img}
                                                                    alt={plant.plant_no}
                                                                    className="diagnosis_choice_plant_image_box"
                                                                />
                                                                <div>{plant.plant_name}</div>
                                                            </div>
                                                            <div>{plant.plant_content}</div>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))}
                                        </article>
                                    </div>
                                )}
                            </article>
                        </section>

                    </article>
                </section>
            </div>
        </div>
    );
};

export default DiagnosisUpload;
