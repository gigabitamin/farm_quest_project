import React from 'react';

const SideNav = () => {
    return (
        <div className="main_side_nav">    
            <div className="side_nav_item"><a href="{% url 'index' %}" className="btn_kdy2">홈</a></div>
            <hr/>
            <div className="side_nav_item">
            {/* {% comment %} 로그인 user만 마이페이지에 접근가능, 로그인 안한 사용자의 경우 자동으로 로그인 창으로 리다이렉트 {% endcomment %}
            {% if user_info.is_authenticated %}
                <a href="{% url 'mypage' %}" className="btn_kdy2">{{user.username}}<hr>마이팜</a>
            {% else %}
                <a href="{% url 'sign_in' %}" className="btn_kdy2">마이팜</a>
            {% endif %} */}
            </div>
        </div>
    );
};

export default SideNav;