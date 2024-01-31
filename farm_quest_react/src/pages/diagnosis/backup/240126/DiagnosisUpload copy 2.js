    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    // import { Link } from 'react-router-dom';
    // import './DiagnosisChoice.css';
    import './DiagnosisUpload.css';
    // import DiagnosisUpload from './DiagnosisUpload';

    const DiagnosisUpload = () => {
        const navigate = useNavigate();

        const [plantSpecies, setPlantSpecies] = useState([]);
        const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);
        const [selectedFile, setSelectedFile] = useState(null);
        const [previewUrl, setPreviewUrl] = useState('');
        const [selectedPlant, setSelectedPlant] = useState(null);
        const [diagnosisTitle, setDiagnosisTitle] = useState('이미지를 업로드 후 작물 종을 선택해 주세요')

        useEffect(() => {
            plantLoadData();
        }, []);

        const plantLoadData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/plant_api/');
                setPlantSpecies(response.data);            
            } catch (error) {
                console.error('Error fetching plant data:', error);
            }
        };

        const handlePlantChange = (e) => {
            setSelectedPlantIndex(e.target.value);
            
            const selectedPlant = plantSpecies.find((plant) => plant.plant_no === parseInt(e.target.value, 10));
            setSelectedPlant(selectedPlant);            
            setDiagnosisTitle('진단하실 작물 종이 맞는지 확인 후 시작 버튼을 눌러주세요');
        };

        // const handleChoiceSubmit = () => {
        //     if (!selectedPlantIndex) {
        //         alert('작물을 선택해주세요.');
        //         return;
        //     }
        // };
        
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
                .post('http://localhost:8000/diagnosis_upload/', formData, {headers: { 'content-type': 'multipart/form-data' },})
                .then(response => {
                    alert("업로드 완료");                    
                    navigate('/diagnosis_upload_result', { state: { file_name: response.data } });
                });
        };


        return (
            <div className="diagnosis_choice_upload_wrap">
                <section className="diagnosis_choice_section">
                    <article className="diagnosis_choice_article">
                        <div className="diagnosis_choice_div_wrap">
                            <div className="diagnosis_choice_form">
                                <div className="diagnosis_choice_select_title">
                                    <h2>{diagnosisTitle}</h2>                                    
                                    <section className="diagnosis_upload_section">
                                        <article className="diagnosis_upload_article">
                                            <div className="diagnosis_upload_div_wrap">
                                            <input
    type={selectedPlant && previewUrl ? "submit" : "file"}
    value={
        selectedPlant && previewUrl
            ? selectedPlant.plant_name + ' : 진단 시작 버튼'
            : '진단할 파일을 올려주세요'
    }
    name="imgFile"
    id="imgFile"
    onChange={setThumbnailOne}
    className="diagnosis_choice_submit_button"
    onClick={() => {
        if (selectedPlant && previewUrl) {
            // handleUploadSubmit 실행
            handleUploadSubmit();
        } else if (previewUrl) {
            // handleThumbnailOne 실행
            document.getElementById('imgFile').click();
        }
    }}
    disabled={!selectedPlant && !previewUrl}
/>





                                                {/* <input type="submit" value={selectedPlant && previewUrl ? selectedPlant.plant_name + ' : 진단 시작 버튼': '진단할 파일을 올려주세요'} className="diagnosis_choice_submit_button" onClick={handleUploadSubmit} /> */}
                                                {/* <input
                                                type="submit"
                                                value={
                                                    selectedPlant && previewUrl
                                                    ? selectedPlant.plant_name + ' : 진단 시작 버튼'
                                                    : '진단할 파일을 올려주세요'
                                                }
                                                className="diagnosis_choice_submit_button"
                                                onClick={handleUploadSubmit}
                                                />

                                                <input
                                                type={
                                                    selectedPlant && previewUrl
                                                ?"submit"
                                                :"file"
                                                }
                                                value={
                                                    selectedPlant && previewUrl
                                                    ? selectedPlant.plant_name + ' : 진단 시작 버튼'
                                                    : '진단할 파일을 올려주세요'
                                                }

                                                name={

                                                    "imgFile" 
                                                }
                                                id="imgFile" onChange={setThumbnailOne} 

                                                className="diagnosis_choice_submit_button"
                                                onClick={() => {
                                                    if (selectedPlant && previewUrl) {
                                                    // handleUploadSubmit 실행
                                                    handleUploadSubmit();
                                                    } else {       
                                                    document.getElementById('imgFile').click();
                                                    }
                                                }}
                                                disabled={!selectedPlant && !previewUrl}
                                                /> */}


                                                <form className="diagnosis_upload_image_form"name="frmUpload" method="post" onSubmit={handleUploadSubmit}>
                                                    <div> 진단 이미지 <input type="file" name="imgFile" id="imgFile" onChange={setThumbnailOne} /></div>
                                                </form>                                                                        
                                                
                                                <div className="diagnosis_upload_image_box">
                                                    {previewUrl && (
                                                        <div className="diagnosis_upload_image_content_wrap">
                                                            <div className="diagnosis_upload_image_content_box">
                                                                <div className="diagnosis_upload_image_content_img"><img className="diagnosis_upload_image_img" src={previewUrl} alt="진단할 작물"/></div>
                                                                <div className="diagnosis_upload_image_content_plant">
                                                                    {plantSpecies.map((plant) => (
                                                                        <div key={plant.plant_no} className="diagnosis_choice_map_one">
                                                                            <label>
                                                                                <div className="diagnosis_choice_select_box">                                                                                
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
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                    
                                </div>

                            </div>
                        </div>
                    </article>
                </section>

            </div>
        );
    };

    export default DiagnosisUpload;
