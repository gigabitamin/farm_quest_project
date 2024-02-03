import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './DiagnosisRecommend.css';
import DjangoServer from '../../DjangoServer'


const DiagnosisRecommend = () => {
    // const DjangoServer = useSelector(state => state.DjangoServer);
    const { solutionWord } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const diagnosisItemCartList = selectedItems.map(item => item.shoping_tb_no);
    const diagnosisItemCartListJSON = JSON.stringify(diagnosisItemCartList);
    const [cookies, setCookie] = useCookies(['id']);
    const [diagnosisItemCartId, setDiagnosisItemCartId] = useState(null);
    const [diagnosisItemCart, setDiagnosisItemCart] = useState(null);

    useEffect(() => {        
        if (cookies.diagnosisItemCartId) {
          setDiagnosisItemCartId(cookies.diagnosisItemCartId);
        }
      }, []);


    useEffect(() => {
        const fetchDiagnosisItemCart = async () => {
            try {
                const response = await axios.get(`${DjangoServer}/diagnosis_load_cart/`, {
                    headers: { Authorization: `Token  ${cookies.id}` },
                    params: { diagnosis_item_cart_id: cookies.diagnosisItemCartId },
                });

                setDiagnosisItemCart(response.data);
            } catch (error) {
                console.error('에러났다:', error);
            }
        };

        if (cookies.diagnosisItemCartId) {
            fetchDiagnosisItemCart();
        }        
    }, [cookies.diagnosisItemCartId, cookies.id]);

    

    const handleLoadButtonClick = async () => {
        try {
            // 불러오기 버튼을 눌렀을 때 API에서 데이터를 받아옴
            const response = await axios.get(`${DjangoServer}/diagnosis_load_cart/?diagnosis_item_cart_id=${diagnosisItemCartId}`);
            
            // 받아온 데이터를 selectedItems 상태로 설정
            setSelectedItems(response.data);
        } catch (error) {
            console.error('데이터 불러오기 에러:', error);
            alert('데이터 불러오기에 실패했습니다.');
        }
    };

    


    const saveDiagnosisItemCart = async () => {
        try {                        
            const response = await axios.post(
                `${DjangoServer}/diagnosis_save_cart/`, 
                { 'diagnosis_item_cart_list' : diagnosisItemCartListJSON },
                { headers: { Authorization: `Token  ${cookies.id}` }}
            );
            console.log('res113 ', response.data);
            alert('목록 저장 완료');
                  
            setDiagnosisItemCartId(response.data.diagnosis_item_cart_id);
            setCookie('diagnosisItemCartId', response.data.diagnosis_item_cart_id);

        } catch (error) {
            console.error('에러났다:', error);
            alert('삐삐에러발생');
        }
    };
    console.log('diagnosis_item_cart_id = ', diagnosisItemCartId);



    // useEffect(() => {
    //     const savedItems = cookies.selectedItems;
    //     if (savedItems) {
    //         setSelectedItems(savedItems);
    //     }
    // }, [cookies.selectedItems]);

    useEffect(() => {        
        const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        setSelectedItems(savedItems);
    }, []);    

    const fetchRecommendations = useCallback(async () => {
        try {
            setLoading(true);
            console.log('page', page);
            const response = await axios.get(`${DjangoServer}/diagnosis_recommend/${solutionWord}/?page=${page}`);
            if (response.data.length > 0) {
                console.log('response', response);
                setRecommendations((prevData) => [...prevData, ...response.data]);
                setPage((prevPage) => prevPage + 1);
                console.log('response ', response);
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

    const updateLocalStorage = (items) => {      
        localStorage.setItem('selectedItems', JSON.stringify(items));
    };

    const handleCheckboxChange = (index) => {        
        setSelectedItems((prevItems) => {
            const isSelected = prevItems.includes(recommendations[index]);
            const updatedItems = isSelected
                ? prevItems.filter(item => item !== recommendations[index])
                : [...prevItems, recommendations[index]];

            // setCookie('selectedItems', updatedItems, { path: '/' });
            updateLocalStorage(updatedItems);

            return updatedItems;
        });
    };

    const handleCheckboxDelete = (index) => {        
        setSelectedItems((prevItems) => {
            const selectedItem = selectedItems[index];
            const updatedItems = prevItems.filter(item => item !== selectedItem);

            // setCookie('selectedItems', updatedItems, { path: '/' });
            updateLocalStorage(updatedItems);
    
            return updatedItems;
        });
    };
    
    const handleDeleteButtonClick = () => {
        setSelectedItems([]);
        localStorage.removeItem('selectedItems');
    };

    useEffect(() => {
        setRecommendations((prevData) => prevData.map(item => (selectedItems.includes(item) ? item : item)));
    }, [selectedItems]);


    
    

    // console.log('cookie = ', cookies)
    // console.log("cart_list = ", cartList)    
    // console.log("localStorage = ", localStorage)
    console.log('diagnosisItemCart = ', diagnosisItemCart)


    return (
        <div className="diagnosis_recommend_wrap">

            <div className="diagnosis_recommend_section_1_wrap">
                <div className="diagnosis_recommend_section_1_title_wrap">
                    <div className="diagnosis_recommend_section_1_title_cart">                        
                        <div>No.{diagnosisItemCartId}</div>
                        <div onClick={handleDeleteButtonClick}>삭제</div>
                        <div>솔루션 아이템 목록</div>
                        <div onClick={saveDiagnosisItemCart}>저장</div>
                        <div onClick={handleLoadButtonClick}>불러오기</div>                     
                    </div>                    
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
                                    <label>
                                        <div className="diagnosis_recommend_section_2_content_1_1_4">
                                            <input
                                                type="checkbox"
                                                name="deleteFromCart"
                                                onChange={() => handleCheckboxDelete(index)}
                                                checked={selectedItems.includes(recommend)}
                                            />
                                            제거
                                        </div>
                                    </label>
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
