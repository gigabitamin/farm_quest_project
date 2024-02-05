import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file

function GuideDetail4() {
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
            <p>파프리카</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>파프리카(paprik), 혹은 단고추(sweet pepper), 종고추(bell pepper)라고도</p> 
              <p>불리우는 얼핏 피망과 비슷한 모양의 유럽산 고추로서</p> 
              <p>피망보다 크기가 크고(180~260g 1개) 과육이 두터우며(6~10mm), 독특하고</p> 
              <p>싱그러운 향과 단맛(당고7~11)이 특징이다. 빨강, 노랑, 오렌지, 보라색, 녹색</p> 
              <p>등의 다양한 색깔이 있으며, 특히 오렌지의 4배에 가까운 비타민 C를 함유하고 있다.</p> 
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/NsxR4WS/04.png" alt="작물 사진" width="300" />
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

export default GuideDetail4;
