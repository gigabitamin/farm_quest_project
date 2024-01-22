import React, { useState } from 'react';
import './App.css';
import Header from './pages/Header';
import Footer from './pages/Footer';
import SideNav from './pages/SideNav';
import './css/common.css';
import './css/style_kdy.css';
import './css/login.css';
import './css/scheduler.css';
import './css/style_ltj.css';
import './css/community.css';
import { Link, Routes, Route } from 'react-router-dom';
import GardeningShopIndex from './pages/gardeningshop/GardeningShopIndex';
import DiagnosisIndex from "./pages/diagnosis/DiagnosisIndex";
import DiagnosisAnswer from "./pages/diagnosis/DiagnosisAnswer";
import DiagnosisResult from "./pages/diagnosis/DiagnosisResult";


function App() {
  // Define the initial values for the variables
  const [solutionContent, setSolutionContent] = useState(null);
  const [diagnosisQuestions, setDiagnosisQuestions] = useState(null);

  return (
    <div className="App">
      <div className="header_wrap">        
      </div>
        <Header/>
          <SideNav/>
          <Routes>
              <Route path="/gardening_shop_index" element={<GardeningShopIndex />} />
              <Route path="/diagnosis_index" element={<DiagnosisIndex solutionContent={solutionContent} setSolutionContent={setSolutionContent} />} />
              <Route path="/diagnosis_answer" element={<DiagnosisAnswer diagnosisQuestions={diagnosisQuestions} setDiagnosisQuestions={setDiagnosisQuestions} />} />
              <Route path="/diagnosis_result" element={<DiagnosisResult />} />
          </Routes>
        <Footer/>
      <div className="footer_wrap">
      </div>
    </div>
  );
}

export default App;
