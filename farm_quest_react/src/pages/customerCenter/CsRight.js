import React from 'react';
import { Link } from 'react-router-dom';

const CsRight = () => {


    return (
        <aside class="customerCenter_right_menu">            
            <Link to="/cs_notice"><div className="cs_right_box_item">공지사항 R</div></Link>
            <Link to="/cs_faq"><div className="cs_right_box_item">FAQ R</div></Link>
            <Link to="/cs_one"><div className="cs_right_box_item">1대1 문의 R</div></Link>
        </aside>
    );
};

export default CsRight;