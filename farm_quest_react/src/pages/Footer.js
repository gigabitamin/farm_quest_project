import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
    return (
        <footer>
            <div className='footerDivision'>
                <ul>
                    <li className='user_notice'><Link to="/">이용약관</Link></li>
                    &nbsp;
                    <li className='user_notice'><Link to="/">개인정보처리방침</Link></li>
                    &nbsp;
                    <li className='user_notice'><Link to="/">청소년보호정책</Link></li>
                    &nbsp;
                    <li className='user_notice'><Link to="/">사이트맵</Link></li>
                </ul>
                <br />
            <div id='licenceInfo'>
                <span>Copyright © 2017-2022, Eunbin Jeong (Dalgona.) &lt;project-neodgm@dalgona.dev&gt;</span><br />
                <span>with reserved font name "Neo둥근모" and "NeoDunggeunmo".</span>
            </div>
            </div>
            <br />
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