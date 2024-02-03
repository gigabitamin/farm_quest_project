import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiagnosisChoice = () => {
    let history = useNavigate();
  
    const [plantSpecies, setPlantSpecies] = useState([]);    
    const planLoadData = async () => {
        const response = await axios.get('http://localhost:8000/plant_api/');        
        setPlantSpecies(response.data);
    };

    useEffect(() => {
        planLoadData();
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
        let frmData = new FormData(document.diagnosisChoiceForm); 
        frmData.append(`user_select_plant`, selectedPlantIndex[`user_select_plant`])
    
        axios.post('http://localhost:8000/save_diagnosis_result_api/', frmData)
            .then(response => {                
                
                alert("선택한 작물 : " );
                history('/upload');
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    


    return (        
        <div className="diagnosis_choice_main diagnosis_main">
            <section className="diagnosis_choice_section">
                <article className="diagnosis_choice_article">
                    <div className="diagnosis_choice_wrap">
                        <form  id="diagnosis_choice_form" name="diagnosisChoiceForm" onSubmit={handleChoiceSubmit}>
                            <h2>작물 선택</h2>              
                            {plantSpecies.map((plant) => (
                                <label key={plant.plant_no}>
                                    <input
                                        type="radio"
                                        name="choice_plant"
                                        value={plant.plant_no}
                                        onChange={handlePlantChange}
                                    />
                                    {plant.plant_name}
                                </label>
                            ))}
                            <input type="submit" value="선택완료" />
                        </form>
                    </div>
                </article>
            </section>
        </div>    
    );
};

export default DiagnosisChoice;
