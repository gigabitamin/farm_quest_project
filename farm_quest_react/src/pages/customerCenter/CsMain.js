import React, { useState } from 'react';
import CsNotice from './CsNotice';
import CsFaq from './CsFaq';
import CsOne from './CsOne';

const CsIndex = () => {

  const [selectedComponent, setSelectedComponent] = useState(null);

  const showComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="csIndex">
      <div className={`ctg_content ${selectedComponent ? 'cs_layout' : ''}`}>
        <section className="cs_layout">
          <div className="cs_top_bar">
            <div className="cs_menu">
              <div onClick={() => showComponent("cs_notice")} className="cs_notice">
                공지사항
              </div>
              <div onClick={() => showComponent("cs_faq")} className="cs_faq">
                FAQ
              </div>
              <div onClick={() => showComponent("cs_one")} className="cs_one">
                1:1 문의
              </div>
            </div>
          </div>


          <div className="cs_content_area">
            {/* <hr />컨텐츠 영역<hr /> */}
            {selectedComponent === "cs_notice" && <CsNotice />}
            {selectedComponent === "cs_faq" && <CsFaq />}
            {selectedComponent === "cs_one" && <CsOne />}
          </div>
          
          <div>
            Notice
            <hr />
            사이트 이용 중 궁금하신 사항은 1대1 문의를 이용해주세요

          </div>
        </section>
      </div>
    </div>
  );
}

export default CsIndex;
