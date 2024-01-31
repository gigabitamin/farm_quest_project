import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiagnosisRecommend.css';

const DiagnosisRecommend = () => {
    const { solutionWord } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // 추가된 상품 정보를 저장할 상태 추가
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            console.log('page', page)
            const response = await axios.get(`http://localhost:8000/diagnosis_recommend/${solutionWord}/?page=${page}`);
            if (response.data.length > 0) {
                console.log('response', response)
                setRecommendations((prevData) => [...prevData, ...response.data]);
                setPage((prevPage) => prevPage + 1);                
                console.log('response ', response)
            }
            
        } catch (error) {
            console.error("에러 찾아 : ", error);
        } finally {
            setLoading(false);
        }
    }, [solutionWord, page]);

    useEffect(() => {
        fetchRecommendations();
    }, []);

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

    // 체크박스 상태 변경 시 호출될 함수
    const handleCheckboxChange = (index) => {
        // 선택된 상품 정보를 selectedItems에 추가 또는 제거
        setSelectedItems((prevItems) => {
            const isSelected = prevItems.includes(recommendations[index]);
            return isSelected
                ? prevItems.filter(item => item !== recommendations[index])
                : [...prevItems, recommendations[index]];            
        });
        console.log('selectedItems', selectedItems)
    };

    return (
        <div className="diagnosis_recommend_wrap">

            <div className="diagnosis_recommend_section_1_wrap">
                <div className="diagnosis_recommend_section_1_title_wrap">                    
                    <h2>장바구니</h2>
                </div>

                <div className="diagnosis_recommend_section_1_content_wrap">
                    <div className="diagnosis_recommend_section_1_content_1" ref={containerRef}>
                        {selectedItems.map((recommend, index) => (
                            <div key={index} className="diagnosis_recommend_section_1_content_1_1">
                                <div className="diagnosis_recommend_section_1_content_1_1_1">
                                    <img className="diagnosis_recommend_section_1_content_1_1_1_1"
                                        src={recommend.shoping_tb_rss_channel_item_image}
                                        alt={recommend.shoping_tb_rss_channel_item_title}
                                    />
                                </div>
                                <div className="diagnosis_recommend_section_1_content_1_2">
                                    <div className="diagnosis_recommend_section_1_content_1_2">
                                        <div className="diagnosis_recommend_section_1_content_1_2_1">{recommend.shoping_tb_rss_channel_item_title}</div>
                                        <div className="diagnosis_recommend_section_1_content_1_2_2">{recommend.shoping_tb_rss_channel_item_lprice} 원</div>
                                    </div>
                                </div>
                                
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
                    <div className="diagnosis_recommend_section_2_content_1" ref={containerRef}>
                        {recommendations.map((recommend, index) => (
                            <div key={index} className="diagnosis_recommend_section_2_content_1_1">
                                
                                <div className="diagnosis_recommend_section_2_content_1_1_1">
                                    <div className="diagnosis_recommend_section_2_content_1_1_1_1">
                                        <img className="diagnosis_recommend_section_2_content_1_1_1_1_1"
                                            src={recommend.shoping_tb_rss_channel_item_image}
                                            alt={recommend.shoping_tb_rss_channel_item_title}
                                        />
                                    </div>

                                    <div className="diagnosis_recommend_section_2_content_1_1_2">
                                        <div className="diagnosis_recommend_section_2_content_1_1_2">
                                            <div className="diagnosis_recommend_section_2_content_1_1_2_1">{recommend.shoping_tb_rss_channel_item_title}</div>
                                        </div>                                    
                                    </div>

                                    <div className="diagnosis_recommend_section_2_content_1_1_3">{recommend.shoping_tb_rss_channel_item_lprice} 원</div>

                                    <label>
                                        <div className="diagnosis_recommend_section_2_content_1_1_4">
                                            <input
                                                type="checkbox"
                                                name="addToCart"
                                                onChange={() => handleCheckboxChange(index)}
                                                checked={selectedItems.includes(recommend)}
                                            />
                                            장바구니에 추가
                                        </div>
                                    </label>
                                </div>
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
