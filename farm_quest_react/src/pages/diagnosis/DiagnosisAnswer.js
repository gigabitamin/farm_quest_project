import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiagnosisAnswer.css';


const DiagnosisAnswer = () => {
    
  let history = useNavigate();

  const DjangoServer = useSelector(state => state.DjangoServer);
  const [diagnosisQuestions, setDiagnosisQuestions] = useState([]);
  const diagnosisQuestionsLoadData = async () => {
       const response = await axios.get(`${DjangoServer}/diagnosis_questions_api/`);
       setDiagnosisQuestions(response.data);
  };

  useEffect(() => {
    diagnosisQuestionsLoadData();
  }, []);

  const [diagnosisQuestionHistory, setDiagnosisQuestionHistory] = useState(null);

  const answerOnChange = (questionNo, value) => {
    setDiagnosisQuestionHistory({
        ...diagnosisQuestionHistory,
        [`diagnosis_question_${questionNo}`]: value,
    });
};

  const sendPostRequest = (e) => {
    e.preventDefault();

    let frmData = new FormData(document.diagnosisAnswerComplete);
    
    diagnosisQuestions.forEach((question, index) => {
        frmData.append(`diagnosis_question_${index + 1}`, diagnosisQuestionHistory[`diagnosis_question_${index + 1}`]);
    });

    axios.post(`${DjangoServer}/diagnosis_questions_history_api/`, frmData)
        .then(response => {
            alert("문진표 작성 완료");
            history('/diagnosis_choice');
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

  return (
    <div className="diagnosis_answer_main diagnosis_main">
      <section className="diagnosis_answer_section">
        <article className="diagnosis_answer_article">
          <div className="diagnosis_answer_wrap">
            <form id="diagnosis_answer_form"  name="diagnosisAnswerComplete" onSubmit={sendPostRequest}>
              <h2>문진표</h2>
              <hr />
              <br />
              {diagnosisQuestions.map((question) => (
                <div key={question.diagnosis_question_no}>
                  <div className="diagnosis_answer_q1">{question.diagnosis_question_content}</div>
                  <label>
                    <input className="diagnosis_answer_a1"
                      type="radio"
                      name={`question_${question.diagnosis_question_no}`}
                      value="예"                      
                      onChange={() => answerOnChange(question.diagnosis_question_no, 1)}
                      required
                    />
                    예
                    <input
                      type="radio"
                      name={`question_${question.diagnosis_question_no}`}
                      value="아니오"                      
                      onChange={() => answerOnChange(question.diagnosis_question_no, 0)}
                      required
                    />
                    아니오
                  </label>
                  <p className="diagnosis_answer_a2"></p>
                </div>
              ))}
              <br />      
              <input type="submit" value="작성완료" />
            </form>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DiagnosisAnswer;
