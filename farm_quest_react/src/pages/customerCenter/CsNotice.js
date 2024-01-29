import React, { useState, useEffect } from 'react';


const CsNotice = () => {

    const CsIndex = ({ date, content }) => {
        const [isExpanded, setIsExpanded] = useState(false);
      
        const toggleExpand = () => {
          setIsExpanded(!isExpanded);
        };
      
        return (
          <li onClick={toggleExpand} style={{ cursor: 'pointer', textDecoration: 'none' }} class="cs_notice_li">
            {date} - {content}
            {isExpanded && (
              <div>
                {/* 상세한 내용 표시 */}
                {/* DB 연동 */}
                <p>팜 퀘스트 2.0 업데이트</p>
                <p>팜 퀘스트 2.0 업데이트</p>
                <p>팜 퀘스트 2.0 업데이트</p>
      
                <p>팜 퀘스트 2.0 업데이트</p>
                <p>팜 퀘스트 2.0 업데이트</p>
      
      
      
      
      
      
      
      
                <p>팜 퀘스트 2.0 업데이트</p>
      
      
                <p>팜 퀘스트 2.0 업데이트</p>
      
                <p>팜 퀘스트 2.0 업데이트</p>
      
                
              </div>
            )}
          </li>
        );
      };

};

export default CsNotice;