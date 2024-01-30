import React from 'react';
import {Link} from 'react-router-dom';

const CsLink = () => {    
    return (
        <div>
            <div className="nav-item_hd">
                <div className="btn_hd"><Link to="/cs_index">고객센터</Link></div>
                <div className="dropdown-menu_hd">                    
                    <div className="btn_hd"><Link to="/cs_notice_index">공지사항</Link></div>
                    <div className="btn_hd"><Link to="/cs_faq_index">FAQ</Link></div>
                    <div className="btn_hd"><Link to="/cs_one_index">1대1 문의</Link></div>
                </div>
            </div>
        </div>
    );
};

export default CsLink;