import React, { useState } from 'react';

const CommunityMainList = ({item}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
        <div className="cs_notice_content_box_list_item">

            <div className="cs_notice_list_item_display">
                <div className="cs_notice_list_item_display_inbox">
                    
                    <div className="cs_notice_no">{item.cs_notice_no}</div>
                    
                    
                    <div className="cs_notice_title_box">
                        <div title="클릭시 상세내용이 표시됩니다" className="cs_notice_title" 
                        onClick={toggleExpand} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            <div>
                            {item.cs_notice_title}
                            {isExpanded && (
                            <div>
                                {item.cs_notice_content}
                            </div>
                            )}
                            </div>
                        
                        </div>
                    </div>
                    <div className="cs_notice_list_item_display_inbox_3">
                        <div className="nickname">{item.user.nickname}</div>
                        <div className="cs_notice_date">{item.cs_notice_date}</div>
                        <div className="cs_notice_ctg_type"> 
                            {item.thread_type === 1 ? '서비스' : (item.thread_type === 2 ? '커뮤니티' : '쇼핑')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityMainList;