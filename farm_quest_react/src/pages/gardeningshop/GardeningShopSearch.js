
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './GardeningShopIndex.css';

const GardeningShopSearch = () => {
    const { keyword } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const encodedKeyword = encodeURIComponent(keyword);
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/gardening_shop_search/${encodedKeyword}`);
                console.log("Search results:", response.data);  // 콘솔에 결과 출력
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results: ", error);
            }
        };
    
        fetchSearchResults();
    }, [keyword]);
    return (
        <div>
            <h1>검색 결과: {keyword}</h1>
            <div className="product-list">
                {Array.isArray(searchResults) && searchResults.map((product, index) => (
                    <div key={index} className="product-item">
                        <Link to={`/gardening_shop_detail/${product.shoping_tb_rss_channel_item_productid}`}>
                            <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                            <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                        </Link>
                        <p>${product.shoping_tb_rss_channel_item_lprice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GardeningShopSearch;
