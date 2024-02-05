import React, { useState } from 'react';

const CommunityMainList = ({ item }) => {
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
                                    <div class="cs_notice_content_item">
                                        <div>{item.cs_notice_content}</div>
                                        <img className="diagnosis_upload_image_content_img" src={item.cs_notice_img} alt="진단할 작물"/>
                                        {/* <div className="cs_notice_img"><img src={item.cs_notice_img}  alt="개발UI"/></div> */}
                                    </div>                                    
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="cs_notice_list_item_display_inbox_3">
                        {/* <div className="nickname">{item.user.nickname}</div> */}
                        <div className="cs_notice_date">{item.cs_notice_date}</div>
                        <div className="cs_notice_ctg_type">
                            {item.thread_type === 1 ? '쇼핑' : (item.thread_type === 2 ? '커뮤니티' : '서비스')}
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityMainList;