import React from 'react';
import './GuideIndex.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideIndex() {
  return (
    <main className="main_gd">
      <div className="content_gd">
        <div className="product_gd">
          <img src="strawberry.png" alt="딸기" /><Link to="/guide_detail"><p>딸기</p></Link>
        </div>
        <div className="product_gd">
          <img src="grapes.png" alt="포도" />
          <p>포도</p>
        </div>
        <div className="product_gd">
          <img src="carrot.png" alt="당근" />
          <p>당근</p>
        </div>
        <div className="product_gd">
          <img src="pepper.png" alt="피망" />
          <p>피망</p>
        </div>
        <div className="product_gd">
          <img src="tomato.png" alt="토마토" />
          <p>토마토</p>
        </div>
        <div className="product_gd">
          <img src="chili.png" alt="고추" />
          <p>고추</p>
        </div>
      </div>
    </main>
  );
}

export default GuideIndex;
