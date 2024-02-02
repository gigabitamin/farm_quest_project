import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiagnosisRecommend.css'

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const [count, setCount] = useState(0);
    const count_ten = ((count+1)*10)

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            console.log('page', page)
            const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}/?page=${page}`);            
            if (response.data.length > 0) {
                console.log('response', response)
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
    },[count]);

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
        <div className="diagnosis_recommend_wrap">

            <div className="diagnosis_recommend_section_1_wrap">
                <div className="diagnosis_recommend_section_1_title_wrap">                    
                    <h2>장바구니</h2>
                    {/* <div>출력 상품 갯수 {count_ten}</div>
                    <button onClick={() => setCount(count + 1)}>출력 상품 10 개씩 추가</button> */}
                </div>

                <div className="diagnosis_recommend_section_1_content_wrap">
                    <div className="diagnosis_recommend_section_1_content_1" ref={containerRef} style={{ overflowY: 'scroll', height: '20vh' }}>
                        {recommendations.map((recommend, index) => (
                            <div key={index} className="diagnosis_recommend_section_1_content_1_1">
                                <img className="diagnosis_recommend_section_1_content_1_1_1"
                                    src={recommend.shoping_tb_rss_channel_item_image}
                                    alt={recommend.shoping_tb_rss_channel_item_title}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                                <div className="diagnosis_recommend_section_1_content_1_2">{recommend.shoping_tb_rss_channel_item_title}</div>
                            </div>
                        ))}
                        {loading && <p>언제끝나...</p>}
                    </div>
                </div>
            </div>

            <div className="diagnosis_recommend_section_2_wrap">
                <div className="diagnosis_recommend_section_2_title_wrap">
                    <h2>솔루션 워드: {solutionWord}</h2>
                </div>

                <div className="diagnosis_recommend_section_2_content_wrap">
                <div className="diagnosis_recommend_section_2_content_1" ref={containerRef} style={{ overflowY: 'scroll', height: '42vh' }}>
                        {recommendations.map((recommend, index) => (
                            <div key={index} className="diagnosis_recommend_section_2_content_1_1">
                                <img className="diagnosis_recommend_section_2_content_1_1_1"
                                    src={recommend.shoping_tb_rss_channel_item_image}
                                    alt={recommend.shoping_tb_rss_channel_item_title}
                                    style={{ width: '100px', height: 'auto' }}
                                />
                                <div className="diagnosis_recommend_section_2_content_1_2">{recommend.shoping_tb_rss_channel_item_title}</div>
                            </div>
                        ))}
                        {loading && <p>언제끝나...</p>}
                    </div>
                </div>
            </div>
                
        </div>        
    );
};

    


export default DiagnosisRecommend;
