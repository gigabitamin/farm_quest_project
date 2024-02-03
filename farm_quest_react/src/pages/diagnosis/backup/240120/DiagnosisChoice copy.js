import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const DiagnosisChoice = () => {

    let history = useNavigate();
  
    //서버로 부터 받은 데이터 state 설정
    const [plantSpecies, setplantSpecies] = useState([]);
    console.log(plantSpecies);

    // 서버에 요청해서 데이터 받아와서
    // state 값 저장하는 함수
    const planLoadData = async () => {
        const response = await axios.get('http://localhost:8000/plant_api/');
        console.log(response.data);
        // 받아온 값으로 state 값 저장
        setplantSpecies(response.data)
        
    };

    // useEffect() : 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 해주는 Hook
    // 렌더링 될 때마다 호출 
    // loadData() 한 번만 호출하도록 설정 : 빈 배열 지정
    useEffect(() => {
      planLoadData();
    }, []);

  const [selectedPlant, setSelectedPlant] = useState({});
  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
  };

  const handleChoiceSubmit = () => {
    if (selectedPlant) {
      alert("선택한 작물: " + selectedPlant)
      history('/upload');    
    } else {
      alert("진단하실 작물을 선택해주세요");
    }
  };

  return (        
    
    <div className="diagnosis_choice_main diagnosis_main">
      <section className="diagnosis_choice_section">
        <article className="diagnosis_choice_article">
          <div className="diagnosis_choice_wrap">
            <form id="diagnosis_choice_form">
              <h2>작물 선택</h2>              
              {plantSpecies.map((plant) => (
                <label key={plant.plant_name}>
                  <input
                    type="radio"
                    name="choice_plant"
                    value={plant.plant_name}
                    onChange={handlePlantChange}
                  />
                  {plant.plant_name}
                </label>
              ))}
              <button type="button" onClick={handleChoiceSubmit}>
                선택완료
              </button>
            </form>
          </div>
        </article>
      </section>
      
    </div>    

    
  );
};

export default DiagnosisChoice;
