import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './GardeningShopIndex.css';

const GardeningShopSearch = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const { keyword,user_id } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const encodedKeyword = encodeURIComponent(keyword);
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`${DjangoServer}/api/gardening_shop_search/${encodedKeyword}/${user_id}/?page=${currentPage}`);
                setSearchResults(response.data.results);
                setTotalPages(response.data.total_pages); // 백엔드에서 제공하는 전체 페이지 수 사용
            } catch (error) {
                console.error("Error fetching search results: ", error);
            }
        };

        fetchSearchResults();
    }, [keyword, currentPage, user_id]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const renderPagination = () => {

        if (totalPages < 2) {
            return null;
        }

        let pages = [];
        const pageLimit = 3; // 앞뒤로 보여줄 페이지 수

        // 처음 페이지로 이동
        pages.push(
            <li className="page-item">
                <a className="page-link" onClick={() => handlePageChange(1)}>
                    <span className="ion-chevron-left">&laquo;</span>
                    <span className="ion-chevron-left"></span>
                </a>
            </li>
        );

        // 이전 페이지
        pages.push(
            <li className="page-item">
                <a className="page-link" onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>
                    <span className="ion-chevron-left">&lt;</span>
                </a>
            </li>
        );

        // 페이지 번호들
        for (let i = Math.max(1, currentPage - pageLimit); i <= Math.min(totalPages, currentPage + pageLimit); i++) {
            pages.push(
                <li className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a className="page-link" onClick={() => handlePageChange(i)}>{i}</a>
                </li>
            );
        }

        // 다음 페이지
        pages.push(
            <li className="page-item">
                <a className="page-link" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>
                    <span className="ion-chevron-right">&gt;</span>
                </a>
            </li>
        );

        // 마지막 페이지로 이동
        pages.push(
            <li className="page-item">
                <a className="page-link" onClick={() => handlePageChange(totalPages)}>
                    <span className="ion-chevron-right">&raquo;</span>
                    <span className="ion-chevron-right"></span>
                </a>
            </li>
        );

        return <ul className="pagination justify-content-center">{pages}</ul>;
    };

    return (
        <div className="product_wraps_pw">
            <h1 className="product-top">검색 결과: {keyword}</h1>
            <div className="product-list">
                {Array.isArray(searchResults) && searchResults.map((product, index) => (
                    <div key={index} className="product-item">
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

export default GardeningShopSearch;