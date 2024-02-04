import React from 'react';
import { Link, Routes } from 'react-router-dom';


const Footer = () => {
    return (
        <footer>
            <ul>
                <li><Link to="/">이용약관</Link></li>
                &nbsp;
                <li><Link to="/">개인정보처리방침</Link></li>
                &nbsp;
                <li><Link to="/">청소년보호정책</Link></li>
            </ul>
            <div className="d-flex">
                <div className="btn_ltj btn-social"><Link to="/"><i className="fab fa-twitter"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="fab fa-facebook-f"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="fab fa-youtube"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="fab fa-linkedin-in"></i></Link></div>
            </div>
            <Routes>
            </Routes>
        </footer>
    );
};

export default Footer;