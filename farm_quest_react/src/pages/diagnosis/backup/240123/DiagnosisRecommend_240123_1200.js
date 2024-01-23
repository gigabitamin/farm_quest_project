import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams(); 
    const [recommendations, setRecommendations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}/?page=${page}`);
            setRecommendations(prevRecommendations => [...prevRecommendations, ...response.data]);
            setCurrentPage(page + 1);
        } catch (error) {
            console.error("에러 찾아 : ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations(currentPage);
    }, [solutionWord, currentPage]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            fetchRecommendations(currentPage);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div>
            <h2>Solution Word: {solutionWord}</h2>
            {recommendations.map((product, index) => (
                <div key={index} className="product-item">
                    <img
                        src={product.shoping_tb_rss_channel_item_image}
                        alt={product.shoping_tb_rss_channel_item_title}
                        style={{ width: '100px', height: 'auto' }}
                    />
                    <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                    <p>{product.shoping_tb_rss_channel_item_lprice} ￦</p>
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default DiagnosisRecommend;
