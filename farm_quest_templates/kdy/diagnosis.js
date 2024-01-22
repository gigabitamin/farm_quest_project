

<script defer>
    function answer_submit_form() {
      let form = document.getElementById('diagnosis_answer_form');
      let selectedOptions = {};
  
      {% for question in diagnosis_questions %}
        let questionNo = '{{ question.diagnosis_question_no }}';
        let questionValue = getSelectedOption(form.elements['question_' + questionNo]);
        selectedOptions[questionNo] = questionValue;
      {% endfor %}
  
      if (validateSelectedOptions(selectedOptions)) {
        // POST 요청 보내기
        sendPostRequest(selectedOptions);
      } else {
        alert('모든 항목에 대해 선택하세요');
      }
    }
  
    function getSelectedOption(radioGroup) {
      for (let i = 0; i < radioGroup.length; i++) {
        if (radioGroup[i].checked) {
          return radioGroup[i].value;
        }
      }
      return null;
    }
  
    function validateSelectedOptions(options) {
      for (let key in options) {
        if (!options[key]) {
          return false;
        }
      }
      return true;
    }
  
    function sendPostRequest(data) {
      fetch('/your-post-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        // 서버로부터의 응답 처리
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  
    // 이벤트 핸들러 등록
    document.getElementById('submit_button').addEventListener('click', answer_submit_form);
  </script>