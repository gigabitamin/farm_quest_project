import React from 'react';
import { Link } from 'react-router-dom';

const DiagnosisBoardLeft = ({ setMainType }) => {
    return (
        <aside id="diagnosis_board_left_menu">
            {/* <div className="diagnosis_board_left_box" onClick={() => setMainType('main')}>전체보기</div>
            <div className="diagnosis_board_left_box" onClick={() => setMainType('farmlog')}>팜로그게시판</div>
            <div className="diagnosis_board_left_box" onClick={() => setMainType('qna')}>QnA</div> */}
            {/* <Link to="/diagnosis_board/main"><div className="diagnosis_board_left_box">전체보기</div></Link>
            <Link to="/diagnosis_board/farmlog"><div className="diagnosis_board_left_box">팜로그</div></Link>
            <Link to="/diagnosis_board/qna"><div className="diagnosis_board_left_box">QnA</div></Link> */}
            {/* <div className="diagnosis_board_left_box">미구현</div> */}
            {/* <div className="diagnosis_board_left_box">미구현</div> */}
        </aside>
    );
};

export default DiagnosisBoardLeft;