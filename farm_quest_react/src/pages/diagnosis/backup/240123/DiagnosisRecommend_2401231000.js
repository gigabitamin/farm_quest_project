// DiagnosisRecommend 컴포넌트
import React from 'react';
import { useParams } from 'react-router-dom';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams();
    console.log(solutionWord)

    return (
        <div>
            <h2>Solution Word: {solutionWord}</h2>            
        </div>
    );
};

export default DiagnosisRecommend;






