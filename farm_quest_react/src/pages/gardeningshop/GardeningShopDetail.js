
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GardeningShopDetail.css';

const GardeningShopDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(productResponse.data);

                const reviewResponse = await axios.get(`http://localhost:8000/api/shopping_reviews/`);
                // 리뷰 데이터를 필터링하거나 조작할 로직이 필요할 수 있습니다.
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
            <a href="#" className="add-to-cart">장바구니</a>
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