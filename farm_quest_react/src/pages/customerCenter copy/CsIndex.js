import logo from '../../images/logo/farm_quest_site.svg';

import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const CsIndex = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const showComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    // App 컴포넌트 시작
    <div className="App">

      {/* 헤더 컴포넌트 시작 */}
      <header className="App-header">
        <div class="site_logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <a href="/"><div class="site_home">팜 퀘스트</div></a>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}


        {/* 네비게이션 컴포넌트 시작 */}
        <nav class="root_nav">          
          <div>nav_content</div>
        
        </nav>
        {/* 네비게이션 컴포넌트 끝 */}
      
      </header>
      {/* 헤더 컴포넌트 끝 */}

      {/* 카테고리 상세 컨텐트 박스 시작 */}      
      <div className={`ctg_content ${selectedComponent ? 'cs_layout' : ''}`}>
        
        {/* 고객센터 게시판 컴포넌트 시작 */}
        <section class="cs_layout">
          <div class="cs_sidebar">
            <div class="cs_menu">
              <div onClick={() => showComponent("cs_notice")} className="cs_notice">
                공지사항
              </div>
              <div onClick={() => showComponent("cs_faq")} className="cs_faq">
                FAQ
              </div>
              <div onClick={() => showComponent("cs_1vs1")} className="cs_1vs1">
                1:1 문의
              </div>
            </div>
          </div>
          <div class="cs_content_area">cs_content_area
            {/* {selectedComponent === "cs_notice" && <CsNotice />}
            {selectedComponent === "cs_faq" && <CsFaq />}
            {selectedComponent === "cs_one" && <CsOne />} */}
          </div>
        </section>
        {/* 고객센터 컴포넌트 끝 */}

      </div>
      {/* 카테고리 상세 컨텐츠 박스 끝 */}

    </div>
    // App 컴포넌트 끝

  );
}



export default CsIndex;
