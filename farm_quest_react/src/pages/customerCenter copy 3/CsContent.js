import React, { useState } from 'react';


// 각 공지사항 항목에 대한 컴포넌트
const CsContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
    <li onClick={toggleExpand} style={{ cursor: 'pointer', textDecoration: 'none' }} class="cs_notice_li">      
      {isExpanded && (
        <div>
          {/* 상세한 내용 표시 */}
          {/* DB 연동 */}
          <p>팜 퀘스트 2.0 업데이트</p>
        </div>
      )}
    </li>

      <div>
      <h2>공지사항</h2>
      <ol reversed>

        {/* 추가적인 공지사항 항목 */}
        {/* DB 연동 */}

      </ol>
    </div>

    <div>
    <h2>FAQ</h2>
    <p>이곳은 자주 묻는 질문과 그에 대한 답변이 표시되는 공간입니다.</p>
    <ul>
      <li>Q: 자주 묻는 질문 1</li>
      <li>A: 해당 질문에 대한 답변 1</li>
      <li>Q: 자주 묻는 질문 2</li>
      <li>A: 해당 질문에 대한 답변 2</li>
      {/* 추가적인 FAQ 항목 */}
      {/* DB 연동 */}

    </ul>


    <div>
    <h2>1:1 문의</h2>
    <p>문의에 대한 답변은 기입하신 이메일로 발송됩니다</p>
    <br></br>
    <form>
      <label>이름:</label>
      <input type="text" />
      <br/>
      <label>이메일:</label>
      <input type="email" />
      <br/>
      <label>문의 내용:</label>
      <textarea rows="4"></textarea>
      <br/>
      <button type="submit">문의 제출</button>
    </form>
  </div>

  </div>


  

</div>


  );
};




export default CsContent;
