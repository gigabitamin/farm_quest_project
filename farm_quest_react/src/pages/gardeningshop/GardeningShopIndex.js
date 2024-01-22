import React, { useState, useEffect } from "react";
import axios from "axios";
import './gardeingshopindex.css';  // CSS 파일 경로

const GardeningShopIndex = () => {
    const [products, setProducts] = useState([]);
    const categories = ["비료", "흙", "영양제", "씨앗(모종)", "자재"];

    const fetchProducts = async () => {
        try {
        const response = await axios.get("http://localhost:8000/products_api");
        setProducts(response.data);
        } catch (error) {
        console.error("Error fetching data: ", error);
        }
    };

    // useEffect() : 컴포넌트가 렌더링될 때마다 특정 작업을 실행할 수 있도록 해주는 Hook
    // 렌더링 될 때마다 호출 
    // loadData() 한 번만 호출하도록 설정 : 빈 배열 지정
    useEffect(() => {
        fetchProducts();
    }, []);


  return (
    <div>
        <h1>가드닝 샵</h1>
        <div>
            {categories.map((category, index) => (
                <button key={index}>{category}</button>
            ))}
        </div>
        <div className="product-list"> {/* product-list 클래스 적용 */}
            {products.map((product, index) => (
                <div key={index} className="product-item"> {/* product-item 클래스 적용 */}
                    <img src={product.shoping_tb_rss_channel_item_image} alt={product.shoping_tb_rss_channel_item_title} />
                    <h3>{product.shoping_tb_rss_channel_item_title}</h3>
                    <p>${product.shoping_tb_rss_channel_item_lprice}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default GardeningShopIndex;
