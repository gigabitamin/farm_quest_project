import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const CommunityMainUpdate = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const dispatch = useDispatch();
    const item = useSelector(state => state.community.item);
    const [cookies] = useCookies(['id']);

    const [form, setForm] = useState({
        thread_title: item.thread_title,
        thread_type: item.thread_type,
        thread_content: item.thread_content,
        user_id: cookies.user_id
    });

    const changeForm = (e) => {
        let {name, value} = e.target;
        // thread_type는 정수형으로 변경
        if (name === 'thread_type') {
            value = Number(value);
        };
        // form의 정보를 그대로 가져오면서 키값이 name인 요소의 value 바꾸기
        setForm({
            ...form,
            [name]: value 
        });
    };

    const submitForm = (event) => {
        if (window.confirm('수정하시겠습니까?')) {
            // var formData = new FormData(document.formData);
            axios.put(`${DjangoServer}/community/detail/modify/${item.thread_no}`, form, {
                headers: { Authorization: `Token  ${cookies.id}` }
            }).then(
                response => {
                    alert("수정되었습니다.");
                    // dispatch({type: 'back'});
                }
            );
        } else {
            event.preventDefault();
        };
    };

    const backToMain = () => {
        dispatch({
            part: 'community',
            type: 'detailBack'
        });
    };

    return (
        <div className='community_form_box'>
            <button className='back_button' onClick={backToMain}>뒤로가기</button>
            <form name='formData' onReset={() => dispatch({type: 'back'})} onSubmit={submitForm}>
                <table>
                    <tbody>
                    <tr>
                        <th>제목</th>
                        <td><input className='title' type='text' name='thread_title' defaultValue={item.thread_title} onChange={changeForm} /></td>
                    </tr>
                    <tr>
                        <th>분류</th>
                        <td>
                            <select className='type' name='thread_type' defaultValue={item.thread_type} onChange={changeForm} >
                                <option>분류 선택</option>
                                <option value='0'>일반</option>
                                <option value='1'>질문</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea className='content' type='text' name='thread_content' defaultValue={item.thread_content} onChange={changeForm} /></td>
                    </tr>
                    </tbody>
                </table>
                <button type='submit'>등록</button>
                <button type='reset'>취소</button>
            </form>
        </div>
    );
};

export default CommunityMainUpdate;