import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import CommunityMainComment from './CommunityMainComment';
import axios from 'axios';
import backButton from '../../images/assets/backButton.png'

const CommunityMainDetail = () => {
    const history = useNavigate();
    const DjangoServer = useSelector(state => state.DjangoServer);
    const threadNo = useSelector(state => state.community.threadNo);
    const initialForm = {cmt_content: '', thread_no: threadNo};
    const dispatch = useDispatch();
    const [item, setItem] = useState({user:{}, thread_comments:[]});
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true)
    const [cookies] = useCookies(['id']);

    const loadContent = async () => {
        const response = await axios.get(`${DjangoServer}/community/detail/show/${threadNo}`);
        // 테스트 출력 
        // console.log(response.data);
        setItem(response.data);
        setLoading(false);
    };

    const onDelete = (event) => {
        if (window.confirm('해당 게시물을 삭제하시겠습니까?')){
            axios.delete(`${DjangoServer}/community/detail/modify/${threadNo}`, {
                    headers: { Authorization: `Token  ${cookies.id}` }
                }).then(() => {
                    alert('삭제되었습니다.');
                    backToMain();
                }).catch(() => {
                    alert('잘못된 접근입니다.');
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
        if (cookies.id) {
            await axios.post(`${DjangoServer}/community/detail/comment/add/`, form, {
                headers: { Authorization: `Token  ${cookies.id}` }
            });
            const response = await axios.get(`${DjangoServer}/community/detail/show/${threadNo}`);
            resetForm();
            setItem(response.data);
        } else if (window.confirm('로그인이 필요한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?')) {
            history('/login')
        }
    };

    const datetimeShow = (string) => {
        return `${string.substring(0, 10)} ${string.substring(11, 19)}`;
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div className="community_detail_box">
            <div className="community_detail_content_box">
                <div className="community_back_button">
                    <button onClick={backToMain}><img src={backButton}/></button>
                </div>
                <div className="community_detail_content_box_top">
                    <div className="community_detail_content_box_title">{item.thread_title}</div>
                    <div className="community_detail_content_box_info">
                        <div className="community_detail_content_box_type">{item.thread_type===0 ? '팜로그' : '질문'}</div>
                        <div className="community_detail_content_box_user">{item.user.nickname}</div>
                        <div className="community_detail_content_box_time">{item.thread_date ? datetimeShow(item.thread_date) : null}</div>
                    </div>
                </div>
                <div className="community_detail_content_box_main">
                    { loading ? (<p><br/>로딩중...</p>) :
                        (<div className="community_detail_content_box_content">
                            {item.thread_content}
                        </div>)
                    }
                    {/* <div className="community_detail_content_box_button">
                        <button className='community_button_default' onClick={onDelete}>삭제</button>
                        <button className='community_button_default' onClick={toUpdate}>수정</button>
                    </div> */}
                    {
                        (cookies.id && cookies.user.id === item.user.id)
                        ?
                        (<div className="community_detail_content_box_button">
                            <button className='community_button_default' onClick={onDelete}>삭제</button>
                            <button className='community_button_default' onClick={toUpdate}>수정</button>
                        </div>)
                        :
                        (<div className="community_detail_content_box_button">
                        </div>)
                    }
                </div>
            </div>
            <hr/>
            <div className="community_detail_comment_header"><p>댓글({item.thread_comments.length})</p></div>
            <div className="community_detail_comment_boxes">
                {   
                    item.thread_comments.map(commentItem => {
                        return (
                            <CommunityMainComment commentItem={commentItem} loadContent={loadContent} />
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

export default CommunityMainDetail;