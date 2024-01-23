import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}/?page=${page}`);
            setRecommendations((prevData) => [...prevData, ...response.data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("에러 찾아 : ", error);
        } finally {
            setLoading(false);
        }
    }, [solutionWord, page]);

    useEffect(() => {
        fetchRecommendations();
    }, [fetchRecommendations]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current && containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight) {
                fetchRecommendations();
            }
        };

        const containerCurrent = containerRef.current;
        if (containerCurrent) {
            containerCurrent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerCurrent) {
                containerCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [fetchRecommendations, containerRef]);

    useEffect(() => {
        fetchRecommendations();
    }, [solutionWord, fetchRecommendations]);

    return (
        <div ref={containerRef} style={{ overflowY: 'scroll', height: '500px' }}>
            <h2>Solution Word: {solutionWord}</h2>
            <h2>recommendations: </h2>
            {recommendations.map((product, index) => (
                <div key={index} className="product-item">
                    farm 어쩌고
                </div>
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default DiagnosisRecommend;
