import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file

function GuideDetail2() {
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
            <p>포도</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>포도과의 낙엽성 덩굴식물로 선사시대부터 인류와 함께 한</p> 
              <p>과일이다. 덩굴손을 길게 뻗어 다른 물체를 감으면서 자란다.</p> 
              <p>꽃은 담록색을 띠며 대개 5-6월에 핀다. 포도나무의 열매는</p> 
              <p>식물학적으로 장과(漿果)에 속하며, 한 그루에 적게는 6송이</p> 
              <p>에서 많게는 300송이가 맺힌다.</p>
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/sq6JRqD/02.png" alt="작물 사진" width="300" />
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

export default GuideDetail2;
