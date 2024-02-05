import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file

function GuideDetail6() {
  return (
    <div className="container_gd2">
      <aside className="sidebar_gd2">
        <nav className="menu_gd2">
          <ul>
            <li><a href="#strawberry">딸기</a></li>
            <li><a href="#grape">포도</a></li>
            <li><a href="#cucumber">오이</a></li>
            <li><a href="#bellpepper">파프리카</a></li>
            <li><a href="#tomato">토마토</a></li>
            <li><a href="#chili">고추</a></li>
          </ul>
        </nav>
      </aside>
      <main className="content_gd2">
        <section className="crop-info_gd2">
          <div className="crop-heading_gd2">
            <h1>작물 이름</h1>
            <p>고추</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>고추는 매운맛과 향이 특징인 열매로, 다양한 종류와 크기로 나옵니다. </p> 
              <p>주로 아시아와 미국의 음식에서 사용되며, </p> 
              <p>다양한 요리에 특별한 맛을 더합니다. 고추에는 캡사이신이라는 화학물질이 들어있어</p> 
              <p>매운맛을 느끼게 합니다. 그러나 고추는 더 높은 비타민 C 함유량과</p> 
              <p>항산화물질을 제공하여 건강에도 도움을 줍니다. </p> 
              <p>신선한 고추는 색감과 향미를 요리에 더하며, 건조나 분말 형태로도 사용됩니다.</p>
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/yBJsq6R/06.png" alt="작물 사진" width="300" />
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

export default GuideDetail6;
