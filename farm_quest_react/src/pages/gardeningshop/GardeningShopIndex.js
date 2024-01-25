import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './gardeningShopIndex.css';

const GardeningShopIndex = () => {
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const categories = ["all", "비료", "흙", "영양제", "씨앗(모종)", "자재"];
    const itemsPerPage = 5;

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/?category=${currentCategory}&page=${currentPage}`);
            setProducts(response.data.results); // Django REST framework는 페이징된 결과를 'results' 키에 담습니다.
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentCategory, currentPage]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setCurrentPage(1); 
    };

    const fetchRecommendedProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/recommended_products`); // 추천 상품 엔드포인트
            setRecommendedProducts(response.data); // 추천 상품 상태 업데이트
        } catch (error) {
            console.error("Error fetching recommended products: ", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchRecommendedProducts();
    }, [currentCategory, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const renderPagination = () => {
        let pages = [];
        const pageLimit = 3; // 앞뒤로 보여줄 페이지 수
        const totalPages = 20; // 전체 페이지 수, 백엔드에서 받아와야 할 수도 있음

        // 처음 페이지로 이동
        pages.push(
            <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
                    <span className="ion-chevron-left"></span>
                    <span className="ion-chevron-left"></span>
                </a>
            </li>
        );

        // 이전 페이지
        pages.push(
            <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>
                    <span className="ion-chevron-left"></span>
                </a>
            </li>
        );

        // 페이지 번호들
        for (let i = Math.max(1, currentPage - pageLimit); i <= Math.min(totalPages, currentPage + pageLimit); i++) {
            pages.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a className="page-link" href="#" onClick={() => handlePageChange(i)}>{i}</a>
                </li>
            );
        }

        // 다음 페이지
        pages.push(
            <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>
                    <span className="ion-chevron-right"></span>
                </a>
            </li>
        );

        // 마지막 페이지로 이동
        pages.push(
            <li className="page-item">
                <a className="page-link" href="#" onClick={() => handlePageChange(totalPages)}>
                    <span className="ion-chevron-right"></span>
                    <span className="ion-chevron-right"></span>
                </a>
            </li>
        );

        return <ul className="pagination justify-content-center">{pages}</ul>;
    };

    return (
        <div>
            <h1 className="product-top">오늘의 추천상품</h1>
            <div className="product-list">
                {recommendedProducts.slice(0, 10).map((product, index) => (
                    <div key={index} className="product-item">
                        {/* 상품 이미지와 이름에 Link 컴포넌트 적용 */}
                        <Link to={`/gardening_shop_detail/${product.shoping_tb_rss_channel_item_productId}`}> {/* 상품 고유 ID를 URL 경로에 포함 */}
                            <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                            <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                        </Link>
                        <p>${product.shoping_tb_rss_channel_item_lprice}</p>
                    </div>
                ))}
            </div>
            <h1 className="product-top">가드닝 샵</h1>
            <div>
                {categories.map((category, index) => (
                    <button key={index} onClick={() => handleCategoryChange(category)}>
                        {category}
                    </button>
                ))}
            </div>
            <div className="product-list">
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                    <Link to={`/gardening_shop_detail/${product.shoping_tb_rss_channel_item_productId}`}>
                        <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                        <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                    </Link>
                        <p>${product.shoping_tb_rss_channel_item_lprice}</p> 
                        {/* <p>{product.shoping_tb_rss_channel_item_lprice} 원</p> */}
                    </div>
                ))}
            </div>
            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default GardeningShopIndex;
