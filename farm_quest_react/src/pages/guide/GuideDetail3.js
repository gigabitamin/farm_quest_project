import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail3() {
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
            <p>오이</p>
            <p>Cucumber</p>

          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">
              <h2>작물 설명</h2>
              <p>줄기는 능선과 더불어 굵은 털이 있고</p> 
              <p>덩굴손으로 감으면서 다른 물체에 붙어서 길게 자란다.</p> 
              <p>잎은 어긋나고 잎자루가 길며 손바닥 모양으로</p> 
              <p>얕게 갈라지고 가장자리에 톱니가 있으며 거칠다. 꽃은 단성화이며</p> 
              <p>5∼6월에 노란색으로 피고 지름 3cm 내외이며 주름이 진다.</p> 
              <p>또한 딸기는 그 모양과 색이 예뻐서, 음식의 장식으로도 많이 쓰입니다.</p>


              <div><br />
              <h2>재배 난이도</h2>
              <p>보통</p><br />
              <h2>재배 시기</h2>
              <p>4월~10월, 모종, 직파</p><br />
              <h2>재배 방법</h2>
              <p>수분의 중도가 중요하다. 텃밭 재배시 간격을 30~40cm로 하며, 멀칭한다.
                 덩굴식물이므로 지지대를 길고 튼튼하게 세워 오이망을 건다. 풀뽑기가 어려우므로 부직포 등을 덮어 잡초를 미리 차단하는 것이 좋다. 늦서리를 피한 5월에 모종을 심는다. 열매가 달리기 시작할 때 잎만 두고 곁순을 모두 제거한다. 집게 등을 이용해 줄을 못 타는 오이덩굴을 위로 유인해준다. 수확을 시작한 때부터 추비하고 기형과가 발생하는 경우 키우지 않고 제거한다. 늙은 잎은 순서대로 제거한다. 
                다다기오이는 7월이면 봄재배 수명이 다하나 다시 심어 가을오이를 수확해도 좋다.</p><br />
               <h2>주의사항</h2>
               <p>진딧물이 잘 꼬이므로 심기 전 흙에 살충제를 뿌리거나 발생 후 방제한다.</p>
            </div><br />
                <h2>수확</h2>
                <p>6월부터 시들 때까지 햇빛이 약할 때 수확한다. 조선오이를 심었다면 노각으로 수확하고 채종해도 좋다.</p><br />
              
            </div>
            <div className="crop-image_gd2">
              <img src="https://i.ibb.co/jWWbGrD/03.png" alt="작물 사진" width="300" />
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

export default GuideDetail3;
