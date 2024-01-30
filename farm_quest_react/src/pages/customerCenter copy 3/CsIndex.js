import React, { useState } from 'react';
import CsNotice from './CsNotice';
import CsFaq from './CsFaq';
import CsOne from './CsOne';
import CsContent from './CsContent';

const CsIndex = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const showComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (    
    <div className="csIndex">   
      <div className={`ctg_content ${selectedComponent ? 'cs_layout' : ''}`}>
        <section className="cs_layout">
          <div className="cs_sidebar">
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
              <div onClick={() => showComponent("cs_content")} className="cs_content">
                cs 컨텐트               
              </div>
            </div>
          </div>
          <div className="cs_content_area">cs_content_area
            {selectedComponent === "cs_notice" && <CsNotice />}
            {selectedComponent === "cs_faq" && <CsFaq />}
            {selectedComponent === "cs_1vs1" && <CsOne />}
            {selectedComponent === "cs_content" && <CsContent />}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CsIndex;
