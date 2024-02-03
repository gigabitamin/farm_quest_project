import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiagnosisChoice = () => {
    let history = useNavigate();
  
    const [plantSpecies, setPlantSpecies] = useState([]);
    console.log(plantSpecies);

    const planLoadData = async () => {
        const response = await axios.get('http://localhost:8000/plant_api/');
        console.log(response.data);    
        setPlantSpecies(response.data);
    };

    useEffect(() => {
        planLoadData();
    }, []);

    // const [selectedPlantNo, setSelectedPlantNo] = useState(null);

    const [selectedPlantIndex, setSelectedPlantIndex] = useState({                
        user_select_plant: '',
        boxes: '',
        keypoints: '',
        masks: '',
        names: '',
        orig_shape: '',
        path: '',
        probs: '',
        save_dir: '',
        speed: '',
      });
 

    const handlePlantChange = (e) => {
        setSelectedPlantIndex((prevSelectedPlantIndex) => ({
            ...prevSelectedPlantIndex,
            user_select_plant: parseInt(e.target.value, 10),
        }));
    };


    const handleChoiceSubmit = (e) => {
        e.preventDefault();
        const selectedPlantInt = parseInt(selectedPlantIndex, 10);
    
        let frmData = new FormData(document.diagnosisChoiceForm);
    
        axios.post('http://localhost:8000/save_diagnosis_result_api/', selectedPlantInt)
            .then(response => {
                alert("선택한 작물의 plant_no: " + selectedPlantInt);
                history('/upload');
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    

    // const handleChoiceSubmit = async () => {
    //     try {
    //         if (selectedPlantIndex !== null) {
    //             // 선택한 작물의 plant_no를 서버에 전송
    //             console.log(selectedPlantIndex);
    //             const selectedPlantInt = parseInt(selectedPlantIndex, 10);
    //             axios.post('http://localhost:8000/save_diagnosis_result_api/', selectedPlantInt)
    //             .then(response => {
    //             console.log(response.data);
    //             alert("선택한 작물의 plant_no: " + selectedPlantIndex);
    //             history('/upload')})
    //             .then(data => {
    //                 console.log('성공 : ', data)
    //             });
    //         } else {
    //             alert("진단하실 작물을 선택해주세요");
    //         }
    //     } catch (error) {
    //         console.error("에러:", error);
    //     }
    // };

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
