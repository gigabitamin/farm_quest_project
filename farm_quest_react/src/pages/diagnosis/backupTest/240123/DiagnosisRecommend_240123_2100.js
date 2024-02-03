import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams(); 
    const [recommendations, setRecommendations] = useState([]);
    
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}`);
                setRecommendations(response.data);
            } catch (error) {
                console.error("에러 찾아 : ", error);
            }
        };

        fetchRecommendations();
    }, [solutionWord]); 

    console.log(recommendations)



    return (
        <div>
            <h2>Solution Word: {solutionWord}</h2>   
            <h2>recommendations: </h2>
            {recommendations.map((product, index) => (
                <div key={index} className="product-item">
                    <img
                        src={product.shoping_tb_rss_channel_item_image}
                        alt={product.shoping_tb_rss_channel_item_title}
                        style={{ width: '100px', height: 'auto' }} // 너비 100픽셀, 높이 자동 조절
                    />

                    <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                    <p>{product.shoping_tb_rss_channel_item_lprice} ￦</p> 
                </div>
            ))}


        </div>
    );
};

export default DiagnosisRecommend;
