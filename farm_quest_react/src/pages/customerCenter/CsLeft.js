import React from 'react';
import { Link } from 'react-router-dom';

const CsLeft = () => {


    return (
        <aside class="customerCenter_left_menu">            
            <Link to="/cs_notice"><div className="cs_left_box_item">공지사항</div></Link>
            <Link to="/cs_faq"><div className="cs_left_box_item">FAQ</div></Link>
            <Link to="/cs_one"><div className="cs_left_box_item">1대1 문의</div></Link>
        </aside>
    );
};

export default CsLeft;