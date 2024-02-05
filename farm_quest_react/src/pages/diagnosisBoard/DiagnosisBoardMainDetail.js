import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import DiagnosisBoardMainComment from './DiagnosisBoardMainComment';
import axios from 'axios';
import backButton from '../../images/assets/backButton.png'
import './diagnosisBoard.css'

const DiagnosisBoardMainDetail = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const threadNo = useSelector(state => state.diagnosisBoard.threadNo);
    const initialForm = {cmt_content: '', thread_no: threadNo};
    const dispatch = useDispatch();
    const [item, setItem] = useState({user:{}, thread_comments:[]});
    const [form, setForm] = useState(initialForm);
    const [cookies] = useCookies(['id']);

    const loadContent = async () => {
        const response = await axios.get(`${DjangoServer}/diagnosis_board/detail/show/${threadNo}`);
        // 테스트 출력 
        // console.log(response.data);
        setItem(response.data);
    };

    const onDelete = (event) => {
        if (window.confirm('해당 게시물을 삭제하시겠습니까?')){
            axios.delete(`${DjangoServer}/diagnosis_board/detail/modify/${threadNo}`, {
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
            part: 'diagnosisBoard',
            type: 'mainBack'
        });
    };

    const toUpdate = () => {
        dispatch({
            part: 'diagnosisBoard',
            type: 'update',
            item: item
        });
    };

    const resetForm = () => {
        setForm(initialForm);
        document.getElementById('cmt_input').value = '';
    };

    const changeForm = (e) => {
        let {name, value} = e.target;
        // form의 정보를 그대로 가져오면서 키값이 name인 요소의 value 바꾸기
        setForm({
            ...form,
            [name]: value 
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        await axios.post(`${DjangoServer}/diagnosis_board/detail/comment/add/`, form, {
            headers: { Authorization: `Token  ${cookies.id}` }
        });
        const response = await axios.get(`${DjangoServer}/diagnosis_board/detail/show/${threadNo}`);
        console.log(response.data);
        resetForm();
        setItem(response.data);
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="community_detail_box">
            <div className="community_detail_content_box">
                <div className="community_back_button">
                    <button onClick={backToMain}><img src={backButton} alt=''/></button>
                </div>
                <div className="community_detail_content_box_top">
                    <div className="community_detail_content_box_title">{item.thread_title}</div>
                    <div className="community_detail_content_box_info">
                        <div className="community_detail_content_box_type">{item.thread_type===0 ? 'result' : 'share'}</div>
                        <div className="community_detail_content_box_user">{item.user.nickname}</div>
                        <div className="community_detail_content_box_time">작성시간</div>
                    </div>
                </div>
                <div className="community_detail_content_box_main">
                    <div className="community_detail_content_box_content">{item.thread_content}</div>
                    <div className="community_detail_content_box_button">
                        <button className='community_button_default' onClick={onDelete}>삭제</button>
                        <button className='community_button_default' onClick={toUpdate}>수정</button>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="community_detail_comment_header"><p>댓글({item.thread_comments.length})</p></div>
            <div className="community_detail_comment_boxes">
                {   
                    item.thread_comments.map(commentItem => {
                        return (
                            <DiagnosisBoardMainComment commentItem={commentItem} loadContent={loadContent} />
                        );
                    })
                }
            </div>
            <form className="community_detail_comment_form" onSubmit={submitForm}>
                <textarea id='cmt_input' type='text' name='cmt_content' onChange={changeForm} />
                <button className='community_button_default' type='submit'>등록</button>
            </form>
        </div>
    );
};

export default DiagnosisBoardMainDetail;