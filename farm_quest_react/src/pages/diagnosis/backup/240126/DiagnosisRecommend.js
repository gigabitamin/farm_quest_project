import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const [count, setCount] = useState(0);
    // const count_ten = ((count+1)*10)

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}/?page=${page}`);
            if (response.data.length > 0) {
                setRecommendations((prevData) => [...prevData, ...response.data]);
                setPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("에러 찾아 : ", error);
        } finally {
            setLoading(false);
        }
    }, [solutionWord, page]);
    
    useEffect(() => {
        fetchRecommendations();
        // containerRef.current.focus();
    },[]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current && containerRef.current.scrollTop + containerRef.current.clientHeight >= (containerRef.current.scrollHeight - 2)) {
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

    // console.log(recommendations)

    return (
        <div>
            <div>
                {/* <p>출력 상품 갯수 {count_ten}</p> */}
                {/* <button onClick={() => setCount(count + 1)}>출력 상품 10 개씩 추가</button> */}
            </div>

            <div ref={containerRef} style={{ overflowY: 'scroll', height: '300px' }}>
                <h2>Solution Word: {solutionWord}</h2>
                <h2>recommendations: </h2>                
                {recommendations.map((recommend, index) => (
                    <div key={index} className="product-item">
                        <h3>{recommend.shoping_tb_rss_channel_item_title}</h3>
                    </div>
                ))}
                {loading && <p>언제끝나...</p>}
            </div>

            <div>
                <h2>Solution Word: {solutionWord}</h2>   
                <h2>recommendations: </h2>
                {recommendations.map((recommend, index) => (
                    <div key={index} className="product-item">
                        <img
                            src={recommend.shoping_tb_rss_channel_item_image}
                            alt={recommend.shoping_tb_rss_channel_item_title}
                            style={{ width: '100px', height: 'auto' }}
                        />
                        <h3>{recommend.shoping_tb_rss_channel_item_title}</h3>
                        <p>{recommend.shoping_tb_rss_channel_item_lprice} ￦</p> 
                    </div>
                ))}
            </div>

        </div>        
    );
};

    


export default DiagnosisRecommend;
