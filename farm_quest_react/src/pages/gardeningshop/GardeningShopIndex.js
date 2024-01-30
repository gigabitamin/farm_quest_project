import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './GardeningShopIndex.css';

const GardeningShopIndex = () => {
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const categories = ["all", "비료", "흙", "영양제", "씨앗(묘목)", "자재"];

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/?category=${currentCategory}&page=${currentPage}`);
            console.log("fetchProducts Response: ", response.data);
            setProducts(response.data.results);
        } catch (error) {
            console.error("Error fetching data: ", error);
            
        }
    };
    

    useEffect(() => {
        fetchProducts();
        fetchRecommendedProducts();
    }, [currentCategory, currentPage]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setCurrentPage(1); 
    };

    const fetchRecommendedProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/recommended_products`);
            setRecommendedProducts(response.data);
        } catch (error) {
            console.error("Error fetching recommended products: ", error);
        }
    };

    // 필터링된 상품 목록
    const filteredProducts = currentCategory === "all"
        ? products
        : products.filter(product => product.shoping_tb_rss_channel_item_category1 === currentCategory);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchShoppingReviews = async (shoping_tb_no) => {
        if (!shoping_tb_no) {
            console.error("No shoping_tb_no provided for fetching reviews");
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:8000/api/shopping_reviews/${shoping_tb_no}`);
            // 응답 데이터 처리
        } catch (error) {
            console.error("Error fetching shopping reviews: ", error);
        }
    };
    
    // 이벤트 전파 방지
    const handleProductClick = (e, shoping_tb_no) => {
        e.preventDefault();
        e.stopPropagation();
        fetchShoppingReviews(shoping_tb_no);
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
                    <div key={index} className="product-item" onClick={(e) => handleProductClick(e, product.shoping_tb_no)}>
                        {/* 상품 이미지와 이름에 Link 컴포넌트 적용 */}
                        <Link to={`/gardening_shop_detail/${product.shoping_tb_rss_channel_item_productid}`}> {/* 상품 고유 ID를 URL 경로에 포함 */}
                            <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                            <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                        </Link>
                        <p>{parseInt(product.shoping_tb_rss_channel_item_lprice).toLocaleString()}원</p>
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
            {filteredProducts.map((product, index) => (
                <div key={index} className="product-item" onClick={(e) => handleProductClick(e, product.shoping_tb_no)}>
                    {/* 상품 ID 필드명을 확인하여 여기에 적용하세요 */}
                    <Link to={`/gardening_shop_detail/${product.shoping_tb_rss_channel_item_productid}`}>
                        <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                        <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                    </Link>
                    <p>{parseInt(product.shoping_tb_rss_channel_item_lprice).toLocaleString()}원</p>
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