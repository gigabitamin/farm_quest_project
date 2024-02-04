import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiagnosisChoice.css';
import './DiagnosisUpload.css';

const Diagnosis = () => {
    const history = useNavigate();

    const DjangoServer = useSelector(state => state.DjangoServer);
    const [plantSpecies, setPlantSpecies] = useState([]);
    const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedPlant, setSelectedPlant] = useState(null); // 새로운 state 추가

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

    const handleChoiceSubmit = () => {
        if (!selectedPlantIndex) {
            alert('작물을 선택해주세요.');
            return;
        }

        const selectedPlant = plantSpecies.find((plant) => plant.plant_no === parseInt(selectedPlantIndex, 10));

        setSelectedPlant(selectedPlant);
        // alert('선택한 작물 : ', selectedPlant)
    };

    const handleUploadSubmit = () => {
        if (!selectedFile) {
            alert('이미지를 선택해주세요.');
            return;
        }

        if (!selectedPlant) {
            alert('올바른 작물 정보가 없습니다.');
            return;
        }

        const formData = new FormData();
        formData.append('plant_name', selectedPlant.plant_name);
        formData.append('plant_no', selectedPlant.plant_no);
        formData.append('imgFile', selectedFile);

        axios
            .post(`${DjangoServer}/diagnosis_upload/`, formData, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((response) => {
                alert('업로드 완료');
                history('/diagnosis_upload_result', { state: { file_name: response.data } });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };

    return (
        <div>
            <section className="diagnosis_choice_section">
                <article className="diagnosis_choice_article">
                    <div className="diagnosis_choice_div_wrap">
                        <div className="diagnosis_choice_form" name="diagnosisChoiceForm">
                            <div className="diagnosis_choice_select_title">
                                <h2>작물 선택</h2>
                                <button className="diagnosis_choice_submit_button" onClick={handleChoiceSubmit}>
                                    선택완료
                                </button>
                            </div>

                            <div className="diagnosis_choice_map_box">
                                {plantSpecies.map((plant) => (
                                    <div key={plant.plant_no} className="diagnosis_choice_map_one">
                                        <label>
                                            <div className="diagnosis_choice_select_box">
                                                <div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="choice_plant"
                                                            value={plant.plant_no}
                                                            onChange={handlePlantChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={plant.plant_main_img}
                                                            alt={plant.plant_no}
                                                            className="diagnosis_choice_plant_image_box"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>{plant.plant_name}</div>
                                                    <div>{plant.plant_content}</div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            
                <section className="diagnosis_upload_section">
                    <article className="diagnosis_upload_article">
                        <div className="diagnosis_upload_div_wrap">
                            <form name="frmUpload" method="post" onSubmit={handleUploadSubmit}>
                                <div>
                                    진단할 이미지: {selectedPlant ? selectedPlant.plant_name : '작물을 선택해주세요.'} <br />
                                    이미지: <input type="file" name="imgFile" id="imgFile" onChange={setThumbnailOne} />
                                </div>
                                <input type="submit" value="완료" />
                            </form>
                            <br />
                            <br />
                            <div id="imgPreviewOne">
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                                )}
                            </div>
                        </div>
                    </article>
                </section>
            
        </div>
    );
};

export default Diagnosis;
