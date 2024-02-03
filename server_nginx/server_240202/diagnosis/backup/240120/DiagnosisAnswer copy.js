import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiagnosisAnswer = () => {

    // 화면 이동하기 위한 hostory 생성
    let history = useNavigate();

    // state   
    const [diagnosisQuestionHistory, setDiagnosisQuestionHistory] = useState({
        diagnosis_question_history_id:'',
        diagnosis_question_1:'',
        diagnosis_question_2:'',
        diagnosis_question_3:'',
        diagnosis_question_4:'',
        diagnosis_question_5:'',
        diagnosis_question_6:'',
        diagnosis_question_7:'',
        diagnosis_question_8:'',
        diagnosis_question_9:'',
        diagnosis_question_10:'',
    });

    const onChange = (e) => {
        const { value, name } = e.target; // e.target에서 name과 value 추출
        setDiagnosisQuestionHistory({
            ...diagnosisQuestionHistory, // 기존의 prd 객체 복제한 후
            [name]: value // name 키를 가진 값을 value로 설정
        });
    };

    // // 취소 버튼 눌렀을 때
    // const onReset = () => {
    //     setDiagnosisQuestionHistory({
    //       diagnosis_question_history_id:'',
    //       diagnosis_question_1:'',
    //       diagnosis_question_2:'',
    //       diagnosis_question_3:'',
    //       diagnosis_question_4:'',
    //       diagnosis_question_5:'',
    //       diagnosis_question_6:'',
    //       diagnosis_question_7:'',
    //       diagnosis_question_8:'',
    //       diagnosis_question_9:'',
    //       diagnosis_question_10:'',
    //     })
    // };


    // submit 버튼 클릭 시
    const onSubmit = (e) => {
        e.preventDefault();

        var frmData = new FormData(document.frmInsert);
        axios.post('http://localhost:8000/diagnosis_question_history/', frmData)
            .then(
                response => {
                    alert("문진표 작성 완료");
                    history('/diagnosis_result');
                }
            )
    };



   const [diagnosisQuestions, setDiagnosisQuestions] = useState([]);
   const diagnosisQuestionsLoadData = async () => {
       const response = await axios.get('http://localhost:8000/diagnosis_questions_api/');
       console.log(response.data);   
       setDiagnosisQuestions(response.data);
   };

   useEffect(() => {
    diagnosisQuestionsLoadData();
   }, []);


  const [selectedOptions, setSelectedOptions] = useState({});
  const handleOptionChange = (questionNo, value) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionNo]: value,
    }));
  };

  const validateSelectedOptions = () => {
    for (let key in selectedOptions) {
      if (!selectedOptions[key]) {
        return false;
      }
    }
    return true;
  };

  const sendPostRequest = () => {
    if (validateSelectedOptions()) {
      // POST 요청 보내기
      fetch('http://localhost:8000/diagnosis_questions_history_api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOptions),
      })
        .then(response => response.json())
        .then(data => {
          // 서버로부터의 응답 처리
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        alert('답변 완료')
        // async 처리한 뒤 await로 진단 시퀀스(yolo, 이미지분류) 함수 실행, 진단 끝난 후 result 페이지 출력
        history('/diagnosis_result');
    } else {
      alert('모든 항목에 대해 선택하세요');
    }
  };

  return (
    <div className="diagnosis_answer_main diagnosis_main">
      <section className="diagnosis_answer_section">
        <article className="diagnosis_answer_article">
          <div className="diagnosis_answer_wrap">
            <form id="diagnosis_answer_form">
              <h2>문진표</h2>
              {diagnosisQuestions.map((question) => (
                <div key={question.diagnosis_question_no}>
                  <div>{question.diagnosis_question_content}</div>
                  <label>
                    <input
                      type="radio"
                      name={`question_${question.diagnosis_question_no}`}
                      value="예"
                      onChange={() => handleOptionChange(question.diagnosis_question_no, '예')}
                      required
                    />
                    예
                    <input
                      type="radio"
                      name={`question_${question.diagnosis_question_no}`}
                      value="아니오"
                      onChange={() => handleOptionChange(question.diagnosis_question_no, '아니오')}
                      required
                    />
                    아니오
                  </label>
                </div>
              ))}
              <button type="button" id="submit_button" onClick={sendPostRequest}>
                답변완료
              </button>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DiagnosisAnswer;
