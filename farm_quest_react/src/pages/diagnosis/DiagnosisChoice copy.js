import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DiagnosisChoice.css';

const DiagnosisChoice = () => {
    let history = useNavigate();

    const [plantSpecies, setPlantSpecies] = useState([]);
    const plantLoadData = async () => {
        const response = await axios.get('http://localhost:8000/plant_api/');
        setPlantSpecies(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        plantLoadData();
    }, []);

    const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);

    const handlePlantChange = (e) => {
        setSelectedPlantIndex((selectedPlantIndex) => ({
            ...selectedPlantIndex,
            [`user_select_plant`]: e.target.value,
        }));
    };

    const handleChoiceSubmit = (e) => {
        e.preventDefault();

        const selectedPlant = plantSpecies.find((plant) => plant.plant_no === parseInt(selectedPlantIndex['user_select_plant'], 10));

        let frmData = new FormData();
        frmData.append(`user_select_plant`, selectedPlantIndex[`user_select_plant`]);

        axios
            .post('http://localhost:8000/save_diagnosis_result_api/', frmData)
            .then((response) => {
                alert('선택한 작물 : ' + selectedPlant.plant_name);
                history('/diagnosis_upload', { state: { newDiagnosisResultId: response.data } });
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="diagnosis_choice_wrap">
            <section className="diagnosis_choice_section">
                <article className="diagnosis_choice_article">
                    <div className="diagnosis_choice_div_wrap">
                        <div className="diagnosis_choice_form" name="diagnosisChoiceForm">
                            <div className="diagnosis_choice_select_title">
                                <h2>작물 선택</h2>
                                <button className="diagnosis_choice_submit_button" onClick={handleChoiceSubmit}>선택완료</button>
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
        </div>
    );
};

export default DiagnosisChoice;
