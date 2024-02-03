import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import CsNoticeComment from './CsNoticeComment';
import axios from 'axios';

const CommunityMainDetail = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const threadNo = useSelector(state => state.customerCenter.threadNo);
    const initialForm = { cmt_content: '', thread_no: threadNo };
    const dispatch = useDispatch();
    const [item, setItem] = useState({ user: {}, thread_comments: [] });
    const [form, setForm] = useState(initialForm);
    const [cookies] = useCookies(['id']);

    const loadContent = async () => {
        const response = await axios.get(`${DjangoServer}/cs_notice/detail/show/${threadNo}`);
        // 테스트 출력 
        // console.log(response.data);
        setItem(response.data);
    };

    const onDelete = (event) => {
        if (window.confirm('해당 게시물을 삭제하시겠습니까?')) {
            axios.delete(`${DjangoServer}/cs_notice/detail/modify/${threadNo}`, {
                headers: { Authorization: `Token  ${cookies.id}` }
            }).then(() => {
                alert('삭제되었습니다.');
                backToMain();
            });
        } else {
            event.preventDefault();
        };
    };

    const backToMain = () => {
        dispatch({
            part: 'customerCenter',
            type: 'mainBack'
        });
    };

    const toUpdate = () => {
        dispatch({
            part: 'customerCenter',
            type: 'update',
            item: item
        });
    };

    const resetForm = () => {
        setForm(initialForm)
    };

    const changeForm = (e) => {
        let { name, value } = e.target;
        // form의 정보를 그대로 가져오면서 키값이 name인 요소의 value 바꾸기
        setForm({
            ...form,
            [name]: value
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        await axios.post(`${DjangoServer}/cs_notice/detail/comment/add/`, form, {
            headers: { Authorization: `Token  ${cookies.id}` }
        });
        const response = await axios.get(`${DjangoServer}:8000/cs_notice/detail/show/${threadNo}`);
        console.log(response.data)
        setItem(response.data);
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="customerCenter_detail_box">
            <div className="customerCenter_detail_content_box">
                <button onClick={backToMain}>뒤로가기</button>
                <div className="customerCenter_detail_content_box_top">
                    <div className="customerCenter_detail_content_box_user">{item.user.nickname}</div>
                    <div className="customerCenter_detail_content_box_type">타입{item.thread_type}</div>
                </div>
                <div className="customerCenter_detail_content_box_main">
                    <div className="customerCenter_detail_content_box_title">{item.thread_title}</div>
                    <div className="customerCenter_detail_content_box_content">{item.thread_content}</div>
                </div>
                <button onClick={toUpdate}>수정</button>
                <button onClick={onDelete}>삭제</button>
            </div>
            <div className="customerCenter_detail_comment_boxes">
                {
                    item.thread_comments.map(commentItem => {
                        return (
                            <CsNoticeComment commentItem={commentItem} loadContent={loadContent} />
                        );
                    })
                }
                <form onReset={resetForm} onSubmit={submitForm}>
                    <input type='text' name='cmt_content' onChange={changeForm} />
                    <button type='submit'>등록</button>
                </form>
            </div>
        </div>
    );
};

export default CommunityMainDetail;