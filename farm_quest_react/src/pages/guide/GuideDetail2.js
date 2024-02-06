import React from 'react';
import './GuideDetail.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

function GuideDetail2() {
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
            <p>포도</p>
            <p>Grape</p>

          </div>
          <div className="crop-body_gd2">
            <div className="crop-description_gd2">

              <h2>작물 설명</h2>
              <p>포도과의 낙엽성 덩굴식물로 선사시대부터 인류와 함께 한</p> 
              <p>과일이다. 덩굴손을 길게 뻗어 다른 물체를 감으면서 자란다.</p> 
              <p>꽃은 담록색을 띠며 대개 5-6월에 핀다. 포도나무의 열매는</p> 
              <p>식물학적으로 장과(漿果)에 속하며, 한 그루에 적게는 6송이</p> 
              <p>에서 많게는 300송이가 맺힌다.</p>

              <div><br />
              <h2>재배 난이도</h2>
              <p>까다로움</p><br />
              <h2>재배 시기</h2>
              <p>3월~9월, 묘목</p><br />
              <h2>재배 방법</h2>
              <p>물빠짐이 좋고 비옥한 흙을 고른다. 
                가장 많이 키우는 캠밸얼리의 경우 내한성이 좋은 편이다. 
                과수 특성상 땅이 풀리고 뿌리가 깨어난 시기에 내한성이 약해지며 특히 남향, 동향의 경우 갑작스러운 한파에 주의해야 한다. 꽃이 피기 전 순지르기하여 7~8장의 잎을 확보한다. 포도는 자연낙과하지 않으므로 만개하고 10일 후부터 송이솎기와 알솎기를 실행한다.
                 일교차가 크면 당도가 높다.</p><br />
               <h2>주의사항</h2>
               <p>세력이 너무 강하면 꽃떨이가 발생하고 물 공급이 지나치면 열과가 생길 수 있다. 비배관리가 잘못되면 세균에 의한 병이 발생하며 화학약품으로 방제한다.</p>
            </div><br />
                <h2>수확</h2>
                <p>8월 하순에 수확한다. 완숙 전에 착색되므로 미숙과를 수확할 수 있다. 맑은 날 아침이나 늦은 오후에 수확하면 신선도 유지에 좋다.</p><br />
              
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
