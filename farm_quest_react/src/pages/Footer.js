import React from 'react';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li><a href="#">이용약관</a></li>
                &nbsp;
                <li><a href="#">개인정보처리방침</a></li>
                &nbsp;
                <li><a href="#">청소년보호정책</a></li>
            </ul>
            <div className="d-flex">
                <a className="btn_ltj btn-social" href="#"><i className="fab fa-twitter"></i></a>
                <a className="btn_ltj btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="btn_ltj btn-social" href="#"><i className="fab fa-youtube"></i></a>
                <a className="btn_ltj btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
        </footer>
    );
};

export default Footer;