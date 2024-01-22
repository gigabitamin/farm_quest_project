import React, { useState } from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import FarmQuestSiteLogo from '../images/logo/farm_quest_site.svg';
import GardeningShopIndex from "./gardeningshop/GardeningShopIndex";

const Header = () => {
    const portal_search = () => {
        let keyword = document.getElementById("search_keyword").value;
        console.log(keyword)
        return false
        // window.location.href = keyword;
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
    
    const [solutionContent, setSolutionContent] = useState([]);
    const [diagnosisQuestions, setDiagnosisQuestions] = useState([]);

    
    
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
                    <select id="portal_select">
                        <option selected>선택</option>
                        <option value="gardening_shop_search">가드닝 샵</option>
                        <option value="customer_service_center">고객센터</option>                
                    </select>                                
                    <input type="text" id="search_keyword" placeholder="검색"/>
                    <button onClick={portal_search}>검색</button>
                </div>
                {/* 통합 검색창 끝 */}

                        
                {/* 회원가입 로그인 박스 시작 login.css - kdy */}
                {/* <div className="loginBox_hd">
                    {% if user.is_authenticated %}
                        <div className="login_sign_in">{{ user.username }}</div>
                        <div className="login_sign_out"><a href="{% url 'sign_out' %}">Logout</a></div>
                    {% else %}
                        <div className="login_sign_up"><a href="{% url 'sign_up2' %}">회원가입</a></div>
                        <div> / </div>
                        <div className="login_sign_in"><a href="{% url 'sign_in' %}">로그인</a></div>
                    {% endif %}    
                </div> */}
                {/* 회원가입 로그인 박스 끝 - kdy */}
            </div>

            <nav className="navbar_hd">
                <ul>                     
                    {/* 네비게이션 드롭다운 수정, 최상단 className="navbar" 에 맞췄으니 수정시 주의 -kdy */}
                    <div className="btn_hd"><Link to="http://127.0.0.1:8000">장고로 이동</Link></div>
                    <div className="nav-item_hd">                        
                        <div><a href="{% url 'customer_service_index' %}" className="nav-link_hd">고객센터</a></div>
                        <div className="dropdown-menu_hd">                 
                            <div><a href="{% url 'customer_service_notice' %}" className="btn_hd">공지사항</a></div>
                            <div><a href="{% url 'customer_service_faq' %}" className="btn_hd">FAQ</a></div>
                            <div><a href="{% url 'customer_service_1vs1' %}" className="btn_hd">1대1 문의</a></div>
                        </div>
                    </div>           

                    <div className="nav-item_hd">
                        <div><a href="{% url 'guide_index' %}" className="nav-link_hd">가이드</a></div>
                        <div className="dropdown-menu_hd">
                            <div><a href="{% url 'guide_index' %}" className="btn_hd">가이드 안내</a></div>
                            <div><a href="{% url 'guide_detail' %}" className="btn_hd">가이드 상세</a></div>                    
                        </div>
                    </div>            

                    <div className="nav-item_hd">
                        <div className="nav-link_hd"><Link to="/gardening_shop_index">가드닝 샵</Link></div>
                        <div className="dropdown-menu_hd">
                            <div className="btn_hd"><Link to="/">상품 리스트</Link></div>
                            <div className="btn_hd"><Link to="/">상품 리뷰 분석</Link></div>                    
                        </div>
                    </div>

                    {/* diagnosis Link start */}
                    <div className="nav-item_hd">                        
                        <div className="nav-link_hd"><Link to="/diagnosis_index">작물 진단</Link></div>
                        <div className="dropdown-menu_hd">
                            <div className="btn_hd"><Link to="/diagnosis_choice">진단 작물 선택</Link></div>
                            <div className="btn_hd"><Link to="/upload">진단 이미지 업로드</Link></div>
                            <div className="btn_hd"><Link to="/diagnosis_answer">진단 문진표 작성</Link></div>
                            <div className="btn_hd"><Link to="/diagnosis_result">진단 결과</Link></div>                            
                        </div>
                    </div>
                    {/* diagnosis Link end */}

                    <div className="nav-item_hd">
                        <div><a href="{% url 'community_index' %}" className="nav-link_hd">커뮤니티</a></div>
                        <div className="dropdown-menu_hd">
                            <div><a href="{% url 'farm_log_index' %}" className="btn_hd">팜로그</a></div>
                            <div><a href="{% url 'qna_index' %}" className="btn_hd">질문/답변</a></div>                    
                        </div>
                    </div>
                    
                    <div className="nav-item_hd">
                        <div><a href="{% url 'scheduler_general' %}" className="nav-link_hd">스케쥴러</a></div>
                        <div className="dropdown-menu_hd">
                            <div><a href="{% url 'scheduler_general' %}" className="btn_hd">일반 스케쥴러</a></div>
                            <div><a href="{% url 'scheduler_personal' %}" className="btn_hd">개인 스케쥴러</a></div>                    
                        </div>
                    </div>                    

                    <div className="nav-item_hd">
                        <div><a href="{% url 'mypage' %}" className="nav-link_hd">마이페이지</a></div>
                        <div className="dropdown-menu_hd">                 
                            <div><a href="{% url 'user_plant' %}" className="btn_hd">나의 작물</a></div>
                            <div><a href="{% url 'user_farmlog' %}" className="btn_hd">남의 팜로그</a></div>
                            <div><a href="{% url 'user_QnA' %}" className="btn_hd">나의 QnA</a></div>
                            <div><a href="{% url 'user_bookmark' %}" className="btn_hd">즐겨찾기</a></div>                    
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;