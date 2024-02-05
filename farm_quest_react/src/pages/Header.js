import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import FarmQuestSiteLogo from '../images/logo/farm_quest_site.png';
import DiagnosisLink from "./diagnosis/DiagnosisLink";
import LoginLink from './user/LoginLink'
import CsLink from './customerCenter/CsLink'
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie'; 


const Header = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const user = { is_authenticated: false, username: 'exampleUser' };

    const [cookies] = useCookies(['id', 'username']);
    const user_id = cookies.user ? cookies.user.id : 0;

    // 기존에 선택된 카테고리를 state로 관리
    const [selectedCategory, setSelectedCategory] = useState('default');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const portal_search = () => {

        let keyword = document.getElementById("search_keyword").value;
        
        if (selectedCategory === "gardening_shop_search" && keyword) {
            keyword = encodeURIComponent(keyword);
            window.location.href = `/gardening_shop_search/${keyword}/${user_id}`;
        }

        return false;
    };
    // document.addEventListener('DOMContentLoaded', function () {
    //     const navItems = document.querySelectorAll('.nav-item_hd');
    
    //     navItems.forEach(item => {
    //         item.addEventListener('mouseover', function () {
    //             this.querySelector('.dropdown-menu_hd').style.display = 'block';
    //         });
    //         item.addEventListener('mouseout', function () {
    //             this.querySelector('.dropdown-menu_hd').style.display = 'none';
    //         });
    //     });
    // });
    
    return (
        <header>            
            <div className="headerMenu">
                <a href="/"><img src={FarmQuestSiteLogo} alt="Logo" id="logo"/></a>
                {/* 주석처리 - kdy
                <form action="/search" method="get">
                    <input type="text" name="query" placeholder="Search...">
                    <button type="submit">Search</button>            
                </form> */}

                {/* 통합 검색창 js 함수 시작
                검색창에 입력된 키워드 받아서 select 된 option 이 위치한 url로 이동 (해당 url은 <str:keyword> 를 활용하는 url이어야 함) */}
                
                {/* 통합 검색창 시작 - kdy
                원하는 카테고리 선택후 검색어 입력 -> 검색 클릭 시 portal_search() js 함수 호출 */}
                <div className="portal_search">
                    <select id="portal_select" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="default">선택</option>
                        <option value="gardening_shop_search">가드닝 샵</option>
                        <option value="customer_service_center">고객센터</option>                
                    </select>                                
                    <input type="text" id="search_keyword" placeholder="검색"/>
                    <button onClick={portal_search}>검색</button>
                </div>
                {/* 통합 검색창 끝 */}

                {/* 회원가입 로그인 박스 컴포넌트 - kdy */}                                
                <LoginLink user={user} />
            
            </div>

            <nav className="navbar_hd">
                <ul>
                    {/* 네비게이션 드롭다운 수정, 최상단 className="navbar" 에 맞췄으니 수정시 주의 -kdy */}                                        
                    
                    <CsLink />

                    <div className="nav-item_hd">
                        <div className="nav-link_hd"><Link to="/guide_index">가이드</Link></div>
                        <div className="dropdown-menu_hd">
                            <div className="btn_hd"><Link to='/'>가이드 안내</Link></div>
                            <div className="btn_hd"><Link to='/'>가이드 상세</Link></div>
                        </div>
                    </div>            

                    <div className="nav-item_hd">
                        <div className="nav-link_hd"><Link to="/gardening_shop_index">가드닝 샵</Link></div>
                        <div className="dropdown-menu_hd">
                            <div className="btn_hd"><Link to="/">상품 리스트</Link></div>
                            <div className="btn_hd"><Link to="/">상품 리뷰 분석</Link></div>                    
                        </div>
                    </div>                    
                    <DiagnosisLink />                    
                    {/* 진단 페이지 링크 끝 / 헤더 css 수정시 주석 해제 후 진행바람 */}

                    <div className="nav-item_hd">
                        <div className="nav-link_hd"><Link reloadDocument to="/community/main">커뮤니티</Link></div>
                        <div className="dropdown-menu_hd">
                            <div className="btn_hd"><Link reloadDocument to="/community/farmlog">팜로그</Link></div>
                            <div className="btn_hd"><Link reloadDocument to="/community/qna">질문/답변</Link></div>                    
                        </div>
                    </div>
                    
                    <div className="nav-item_hd">
                        <div className="nav-link_hd"><Link to="/Scheduler">스케쥴러</Link></div>
                        {/* <div className="dropdown-menu_hd"> */}
                            {/* <div className="btn_hd"><Link to="/scheduler">진입</Link></div> */}

                            {/* <div><a href="{% url 'scheduler_personal' %}" className="btn_hd">개인 스케쥴러</a></div>                     */}
                        </div>
                    {/* </div>                     */}

                    {/* <div className="nav-item_hd">
                    <div className="nav-link_hd"><Link to="/MypageMain">마이페이지</Link></div>
                        <div className="dropdown-menu_hd">                 
                            <div><a href="{% url 'user_plant' %}" className="btn_hd">나의 작물</a></div>
                            <div><a href="{% url 'user_farmlog' %}" className="btn_hd">나의 팜로그</a></div>
                            <div><a href="{% url 'user_QnA' %}" className="btn_hd">나의 QnA</a></div>
                            <div><a href="{% url 'user_bookmark' %}" className="btn_hd">즐겨찾기</a></div>                    
                        </div>
                    </div> */}
                    

                </ul>
            </nav>
        </header>
    );
};

export default Header;