import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li className='user_notice'><Link to="/">이용약관</Link></li>
                &nbsp;
                <li className='user_notice'><Link to="/">개인정보처리방침</Link></li>
                &nbsp;
                <li className='user_notice'><Link to="/">청소년보호정책</Link></li>
            </ul>
            <div className="d-flex">
                <div className="btn_ltj btn-social"><Link to="/"><i className="bi bi-twitter"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="bi bi-facebook"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="bi bi-youtube"></i></Link></div>
                <div className="btn_ltj btn-social"><Link to="/"><i className="bi bi-linkedin"></i></Link></div>
            </div>
        </footer>
    );
};

export default Footer;