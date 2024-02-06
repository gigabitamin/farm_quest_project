import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail6() {
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
            <p>고추</p>
            <p>Chilli</p>
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
              <div><br />
              <h2>재배 난이도</h2>
              <p>까다로움</p><br />
              <h2>재배 시기</h2>
              <p>4월~10월, 모종</p><br />
              <h2>재배 방법</h2>
              <p>추위에 약하고 병해가 잦다. 열매가 많이 달려 퇴비 요구량이 많으며 연작은 금물이다.
                 일조량 확보가 중요하다. 30cm 이상 높게 두둑을 쌓고 포기 간격은 40cm 이상 한다.
                  늦서리를 피해 5월 후에 심고 멀칭한다. 지지대를 심고 줄로 묶어 풍해를 방지한다. 
                  옆으로 자라는 곁순과 방아다리는 상처가 빨리 아무는 맑은 날에 제거한다.
                 토양이 건조하지 않도록 수분관리를 중요히 한다.</p><br />
               <h2>주의사항</h2>
               <p>개미가 보이면 진딧물을 주의한다. 열매가 달릴 때엔 담배나방이 알을 낳을 수 있으니 주의한다. 
                배수가 나쁜 토양은 장마철의 고추 역병을 특히 주의해야 하며 이때 탄저도 발병하기 쉽다. 
                생리장해 또한 자주 나타나므로 시비를 주의한다.</p>
            </div><br />
                <h2>수확</h2>
                <p>홍고추는 여무는대로 수시로 딴다. 7월부터 수확한다.</p><br />
              
            </div>            <div className="crop-image_gd2">
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
