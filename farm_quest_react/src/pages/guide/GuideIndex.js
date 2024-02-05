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
          <img src="grapes.png" alt="포도" /><Link to="/guide_detail2"><p>포도</p></Link>
        </div>
        <div className="product_gd">
          <img src="carrot.png" alt="오이" /><Link to="/guide_detail3"><p>오이</p></Link>
        </div>
        <div className="product_gd">
          <img src="pepper.png" alt="파프리카" /><Link to="/guide_detail4"><p>파프리카</p></Link>
        </div>
        <div className="product_gd">
          <img src="tomato.png" alt="토마토" /><Link to="/guide_detail5"><p>토마토</p></Link>
        </div>
        <div className="product_gd">
          <img src="chili.png" alt="고추" /><Link to="/guide_detail6"><p>고추</p></Link>
        </div>
      </div>
    </main>
  );
}

export default GuideIndex;
