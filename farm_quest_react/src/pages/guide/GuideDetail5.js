import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail5() {
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
            <p>토마토</p>
            <p>Tomato</p>
          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>토마토는 빨간색으로 잘 알려진 과일이며, 많이 소비되고 있습니다. </p> 
              <p>토마토는 식용으로 가장 널리 사용되며, 신선한 상태에서 </p> 
              <p>주로 샐러드, 소스, 스무디 등 다양한 요리에 사용됩니다.</p> 
              <p>뿐만 아니라 풍부한 비타민 C와 카로틴을 함유하고 있어 건강에도 도움이 됩니다</p> 
              <p>더불어 토마토는 자연의 감미료로 감미료를 대체하는 데도 사용되며,</p> 
              <p>다양한 형태로 가공되어 시장에 나와 있습니다.</p>

              <div><br />
              <h2>재배 난이도</h2>
              <p>까다로움</p><br />
              <h2>재배 시기</h2>
              <p>4월~9월, 모종, 실내 추천</p><br />
              <h2>재배 방법</h2>
              <p>물과 칼슘을 충분히 담은 토양에 40~50cm 간격으로 서리를 피해 5월에 심는다.
                 지지대는 포기마다 세워 쓰러지지 않도록 지지대에 줄기를 묶어준다. 
                 자랄 때마다 묶어주며 곁순이 왕성하므로 꾸준히 제거한다. 노쇠한 아랫잎은 때마다 제거한다. 
                 만일 곁순이 과하게 자랐다면 잘라내어 새로 활착시켜도 좋으나 6월 이후에는 금한다. 
                 찰토마토의 경우 5~6 화방까지만 키우고 생장점을 잘라 키가 더이상 크지 않도록 한다.</p><br />
               <h2>주의사항</h2>
               <p>비를 맞으면 열과가 발생한다. 장마 이후 과습할 때 역병이 쉽게 돈다. 
                나방 애벌레나 배꼽썩음병이 발생한 경우 열매를 즉시 제거한다.</p>
            </div><br />
                <h2>수확</h2>
                <p>먼저 핀 꽃부터 열매가 맺힌다. 방울토마토가 꽃도 더 많고 먼저 익으며 방울토마토는 완전히 익은 후에,
                   찰토마토는 조금 덜 익었을 때 수확해 후숙한다.</p><br />
              
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/NSvvbnK/05.png" alt="작물 사진" width="300" />
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

export default GuideDetail5;
