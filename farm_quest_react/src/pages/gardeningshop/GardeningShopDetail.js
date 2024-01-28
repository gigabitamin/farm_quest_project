import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GardeningShopDetail.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux Hook 추가
import { useCookies } from 'react-cookie';

const GardeningShopDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReviewContent, setNewReviewContent] = useState('');
    const [newReviewRank, setNewReviewRank] = useState(0);
    const [cookies] = useCookies(['id', 'username']);
    // Redux 스토어에서 로그인 상태 가져오기
    const isLoggedIn = useSelector(state => state.loginUser.isLoggedIn);

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

    const renderStars = (rank) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rank ? '★' : '☆';
        }
        return stars;
    }
    const submitReview = async () => {
        const user_id = cookies.user.id; // 쿠키에서 사용자 ID 사용

        try {
            const response = await axios.post('http://localhost:8000/api/reviews/', {
                user: user_id,
                shoping_tb_no: product.shoping_tb_no,
                shopping_review_content: newReviewContent,
                shopping_review_rank: newReviewRank
            });
            setReviews([...reviews, response.data]);
            setNewReviewContent('');
            setNewReviewRank(0);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
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
                {/* 로그인 상태에 따른 리뷰 작성 폼 표시 */}
                {isLoggedIn && (
                    <div>
                        <h3>Write a Review</h3>
                        <textarea
                            value={newReviewContent}
                            onChange={(e) => setNewReviewContent(e.target.value)}
                            placeholder="Review content"
                        />
                        <input
                            type="number"
                            value={newReviewRank}
                            onChange={(e) => setNewReviewRank(e.target.value)}
                            min="1" max="5"
                            placeholder="Rating (1-5)"
                        />
                        <button onClick={submitReview}>Submit Review</button>
                    </div>
                )}
                {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <p className="review-rating">별점: {renderStars(review.shopping_review_rank)}</p>
                        <p className="review-number">리뷰 번호: {review.shopping_review_no}</p>
                        <p className="review-content">{review.shopping_review_content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GardeningShopDetail;
