import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DiagnosisLink from "./DiagnosisLink";
// import DiagnosisIndex from "./DiagnosisIndex";
// import DiagnosisChoice from "./DiagnosisChoice";
import DiagnosisAnswer from "./DiagnosisAnswer";
// import DiagnosisResult from "./DiagnosisResult";
import DiagnosisUpload from "./DiagnosisUpload";
import DiagnosisUploadResult from "./DiagnosisUploadResult";
import DiagnosisUploadResultBoard from "./DiagnosisUploadResultBoard";
import DiagnosisRecommend from "./DiagnosisRecommend";
// import DiagnosisDetail from './DiagnosisDetail';

const DiagnosisRoute = () => {
    // const [currentPath, setCurrentPath] = useState('/');
    const [plantSpecies, setPlantSpecies] = useState(5);
    const [solutionKeyword, setSolutionKeyword] = useState('고추탄저')

    return (
        <div>
            <Routes>
                <Route path="/diagnosis_link" element={<DiagnosisLink />} />                
                {/* <Route path="/diagnosis_index" element={<DiagnosisIndex />} /> */}
                {/* <Route path="/diagnosis_choice" element={<DiagnosisChoice/>} /> */}
                <Route path="/diagnosis_answer" element={<DiagnosisAnswer />} />
                {/* <Route path="/diagnosis_result" element={<DiagnosisResult />} /> */}
                <Route path="/diagnosis_upload" element={<DiagnosisUpload plantSpecies={plantSpecies} setPlantSpecies={setPlantSpecies} />} />                            
                <Route path="/diagnosis_upload_result" element={<DiagnosisUploadResult/>} />
                <Route path="/diagnosis_upload_result_board" element={<DiagnosisUploadResultBoard/>} />
                <Route path="/diagnosis_recommend/:solutionWord" element={<DiagnosisRecommend solutionKeyword={solutionKeyword} setSolutionKeyword={setSolutionKeyword} />} />
                {/* <Route path="/diagnosis_detail" element={<DiagnosisDetail/>} /> */}
            </Routes>
        </div>
    );
};

export default DiagnosisRoute;