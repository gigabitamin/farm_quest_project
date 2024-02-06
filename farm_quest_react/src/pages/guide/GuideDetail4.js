import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail4() {
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
            <p>파프리카</p>
            <p>Paprica</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>파프리카(paprik), 혹은 단고추(sweet pepper), 종고추(bell pepper)라고도</p> 
              <p>불리우는 얼핏 피망과 비슷한 모양의 유럽산 고추로서</p> 
              <p>피망보다 크기가 크고(180~260g 1개) 과육이 두터우며(6~10mm), 독특하고</p> 
              <p>싱그러운 향과 단맛(당고7~11)이 특징이다. 빨강, 노랑, 오렌지, 보라색, 녹색</p> 
              <p>등의 다양한 색깔이 있으며, 특히 오렌지의 4배에 가까운 비타민 C를 함유하고 있다.</p> 


           <div><br />
              <h2>재배 난이도</h2>
              <p>매우 까다로움</p><br />
              <h2>재배 시기</h2>
              <p>4월~10월, 모종, 실내 추천</p><br />
              <h2>재배 방법</h2>
              <p>병충해에 취약하므로 토양을 소독하고 서리를 피해 5월에 심고 멀칭한다.
                 포기 간격은 40~50cm로 한다. 바람에 쓰러지지 않도록 지지대에 연결하며 고추보다 조금 작게 자라므로 1.5m정도 높이의 지지대를 사용한다. 곁순은 제거하며 분지할 때마다 약한 가지는 가지치기한다. 
                첫 분지에 달린 첫 열매는 반드시 제거한다.</p><br />
               <h2>주의사항</h2>
               <p>고온다습시 역병이 매우 쉽게 발생한다. 배꼽썩음을 예방하기 위해 칼슘액비를 주기적으로 엽면살포한다.</p>
            </div><br />
                <h2>수확</h2>
                <p>녹색일 때엔 단맛이 덜하므로 색이 거의 입혀진 뒤에 수확한다. 꼭지가 두꺼워 식물이 상하기 쉬우므로 수확시 가위로 잘라준다.</p><br />
              
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
