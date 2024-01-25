import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cookies, useCookies } from 'react-cookie';
import axios from 'axios';

const CommunityMainDetail = () => {
    const threadNo = useSelector(state => state.community.threadNo);
    const dispatch = useDispatch();
    const [item, setItem] = useState({user:{}});
    const [cookies] = useCookies(['id']);


    const loadContent = async () => {
        const response = await axios.get(`http://localhost:8000/community/detail/show/${threadNo}`);
        // 테스트 출력 
        // console.log(response.data);
        setItem(response.data);
    };

    const onDelete = (event) => {
        if (window.confirm('해당 게시물을 삭제하시겠습니까?')){
            axios.delete(`http://localhost:8000/community/detail/modify/${threadNo}`, {
                    headers: { Authorization: `Token  ${cookies.id}` }
                }).then(() => {
                    alert('성공적으로 삭제되었습니다');
                    backToMain();
                });
        } else {
            event.preventDefault();
        };       
    };

    const backToMain = () => {
        dispatch({
            part: 'community',
            type: 'mainBack'
        });
    };

    const toUpdate = () => {
        dispatch({
            part: 'community',
            type: 'update',
            item: item
        });
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="community_content_box_detail">
            {/* 게시물 클릭시 나오는 해당 게시물의 상세 내용 */}
            <button onClick={backToMain}>뒤로가기</button>
            <div className="content_box_detail_top">
                <div className="content_box_detail_user">{item.user.username}</div>
                <div className="content_box_detail_type">타입{item.thread_type}</div>
            </div>
            <div className="content_box_detail_main">
                <div className="content_box_detail_title">{item.thread_title}</div>
                <div className="content_box_detail_content">{item.thread_content}</div>
            </div>
            <button onClick={toUpdate}>수정</button>
            <button onClick={onDelete}>삭제</button>
        </div>
    );
};

export default CommunityMainDetail;