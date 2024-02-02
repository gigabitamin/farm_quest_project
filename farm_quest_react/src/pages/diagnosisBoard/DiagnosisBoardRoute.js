import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DiagnosisBoard from './DiagnosisBoard';


const DiagnosisBoardRoute = () => {

    return (
        <div>
            <Routes>
                <Route path="/diagnosis_board/:mainType" element={<DiagnosisBoard />} />
            </Routes>

        </div>
    );
};

export default DiagnosisBoardRoute;