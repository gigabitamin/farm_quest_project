
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GardeningShopDetail.css';
import { Link } from 'react-router-dom';

const GardeningShopDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(productResponse.data);
        
                // 상품 응답에서 shoping_tb_no를 추출합니다 d.
                const shoping_tb_no = productResponse.data.shoping_tb_no;
        
                // shoping_tb_no를 사용하여 리뷰를 가져옵니다.
                const reviewResponse = await axios.get(`http://localhost:8000/api/shopping_reviews/${shoping_tb_no}`);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchProductDetails();
    }, [id]); // 의존성 배열에 'id'를 포함시킵니다.

    return (
        
        <div className="gardening-shop-detail">
        <h1 className="product-top2">상세페이지</h1>
            <img 
                src={product.shoping_tb_rss_channel_item_image} 
                alt={product.shoping_tb_rss_channel_item_title} 
                className="product-image"
            />
            <h2 className="product-title">{product.shoping_tb_rss_channel_item_title}</h2>
            <p className="product-price">가격: ${product.shoping_tb_rss_channel_item_lprice}</p>
            <Link to="#" className="add-to-cart">장바구니</Link>
            <div className="reviews-section">
                <h3 className="reviews-title">리뷰</h3>
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <p className="review-number">리뷰 번호: {review.shopping_review_no}</p>
                        <p className="review-content">{review.shopping_review_content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GardeningShopDetail;