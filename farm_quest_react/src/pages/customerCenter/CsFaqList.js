import React, { useState } from 'react';

const CsFaqList = ({item}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <div className="cs_faq_content_box_list_item">
            <div className="cs_faq_list_item_display">
                <div className="cs_faq_no">{item.cs_faq_no}</div>

                <div title="클릭시 상세내용이 표시됩니다" className="cs_faq_title" onClick={toggleExpand} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    {item.cs_faq_title}
                    {isExpanded && (
                    <div>
                        {item.cs_faq_content}
                    </div>
                    )}                
                </div>
                                
                <div className="cs_faq_ctg_type">
                    {item.cs_faq_ctg_type === 1 ? '서비스' : (item.cs_faq_ctg_type === 2 ? '커뮤니티' : '쇼핑')}
                </div>
            </div>
        </div>
    );
};

export default CsFaqList;