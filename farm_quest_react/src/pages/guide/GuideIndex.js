import React from 'react';
import './GuideIndex.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideIndex() {
  return (
    <main className="main_gd">
      <div className="content_gd">
      <Link to="/guide_detail"><div className="product_gd 1">
          <img src="https://i.ibb.co/Pm6562s/strawberry.png" alt="딸기" /><p>딸기</p></div></Link>
        
          <Link to="/guide_detail2"><div className="product_gd 2">
          <img src="https://i.ibb.co/fQst5J3/grape.png" alt="포도" /><p>포도</p></div></Link>
        
          <Link to="/guide_detail3"><div className="product_gd 3">
          <img src="https://i.ibb.co/QmBNMsD/cucumber.png" alt="오이" /><p>오이</p></div></Link>
        
          <Link to="/guide_detail4"> <div className="product_gd 4">
          <img src="https://i.ibb.co/d4n9w6h/paprika.png" alt="파프리카" /><p>파프리카</p></div></Link>
        
          <Link to="/guide_detail5"><div className="product_gd 5">
          <img src="https://i.ibb.co/pdq0HWk/tomato.png" alt="토마토" /><p>토마토</p></div></Link>
        
          <Link to="/guide_detail6"><div className="product_gd 6">
          <img src="https://i.ibb.co/dg5BDTb/pepper.png" alt="고추" /><p>고추</p></div></Link>
        
      </div>
    </main>
  );
}

export default GuideIndex;
