import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const CommunityMainCreate = () => {
    const initialForm = {
        thread_title: '',
        thread_content: '',
        thread_type: '',
        user_id: ''
    };

    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const resetForm = () => {
        setForm(initialForm)
    };

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
        if (window.confirm('등록하시겠습니까?')) {
            // var formData = new FormData(document.formData);
            axios.post('http://localhost:8000/community/create/', form).then(
                response => {
                    alert("등록 완료");
                    dispatch({type: 'back'});
                }
            );
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

    return (
        <div className='community_form_box'>
            <button onClick={backToMain}>뒤로가기</button>
            <form name='formData' onReset={resetForm} onSubmit={submitForm}>
                <table>
                    <tbody>
                    <tr>
                        <th>제목</th>
                        <td><input type='text' name='thread_title' onChange={changeForm} /></td>
                    </tr>
                    <tr>
                        <th>분류</th>
                        <td>
                            <select name='thread_type' onChange={changeForm}>
                                <option>분류 선택</option>
                                <option value='0'>일반</option>
                                <option value='1'>질문</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><input type='text' name='thread_content' onChange={changeForm} /></td>
                    </tr>
                    <tr>
                        <th>너의 아이디는</th>
                        <td><input type='text' name='user_id' onChange={changeForm} /></td>
                    </tr>
                    </tbody>
                </table>
                <button type='submit'>등록</button>
                <button type='reset'>취소</button>
            </form>
        </div>
    );
};

export default CommunityMainCreate;