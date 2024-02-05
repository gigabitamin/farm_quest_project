import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom의 Link 컴포넌트 사용

const MypageSidebar = () => {
  return (
    <div className="mypage-sidebar">
      <Link to="/MypageMain" className="sidebar-link">프로필</Link>
      <Link to="/MyCrops" className="sidebar-link">나의 작물</Link>
      <Link to="/MyFarmlogs" className="sidebar-link">팜로그</Link>
      <Link to="/MyQnAs" className="sidebar-link">QnA</Link>
      <Link to="/Mybookmarks" className="sidebar-link">즐겨찾기</Link>
    </div>
  );
};

export default MypageSidebar;
