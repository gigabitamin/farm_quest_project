import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail() {
  return (
    <div className="container_gd2">
      <aside className="sidebar_gd2">
        <nav className="menu_gd2">
          <ul>
            <li><Link to="/guide_detail"><p>딸기</p></Link></li>
            <li><Link to="/guide_detail2"><p>포도</p></Link></li>
            <li><Link to="/guide_detail3"><p>오이</p></Link></li>
            <li><Link to="/guide_detail4"><p>파프리카</p></Link></li>
            <li><Link to="/guide_detail5"><p>토마토</p></Link></li>
            <li><Link to="/guide_detail6"><p>고추</p></Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content_gd2">
        <section className="crop-info_gd2">
          <div className="crop-heading_gd2">
            <h1>작물 이름</h1>
            <p>딸기</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>딸기는 작고 붉은색을 띠는 과일로, 표면에 작은 씨앗들이 박혀 있습니다.</p> 
              <p>그 맛은 달콤하면서도 약간의 산미가 있어 상큼한 맛을 줍니다.</p> 
              <p>딸기는 비타민 C와 항산화 물질이 풍부하여 건강에 좋은 과일로 알려져 있습니다.</p> 
              <p>이 과일은 생으로 먹거나 잼, 주스, 케이크 등 다양한 요리에 사용됩니다.</p> 
              <p>딸기는 봄철에 주로 수확되며, 그 때 가장 맛이 좋습니다.</p> 
              <p>또한 딸기는 그 모양과 색이 예뻐서, 음식의 장식으로도 많이 쓰입니다.</p>
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/0ctDJ5z/01.jpg" alt="작물 사진" width="300" />
            </div>
          </div>
          <div className="crop-guide_gd2">
            <h2>작물 재배 가이드</h2>
          </div>
        </section>
        <div className="videos_gd2">
          <div className="video_gd2" id="video1_gd2">
            <img src="https://i.ibb.co/hFS4FmR/video.png" alt="영상1" width="340" />
          </div>
          <div className="video_gd2" id="video2_gd2">
            <img src="https://i.ibb.co/hFS4FmR/video.png" alt="영상2" width="340" />
          </div>
          <div className="video_gd2" id="video3_gd2">
            <img src="https://i.ibb.co/hFS4FmR/video.png" alt="영상3" width="340" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default GuideDetail;
