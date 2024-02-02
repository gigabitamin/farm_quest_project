import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import backButton from '../../images/assets/backButton.png'
import { useDispatch, useSelector } from 'react-redux';

const DiagnosisBoardMainCreate = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);

    const initialForm = {
        thread_title: '',
        thread_content: '',
        thread_type: ''
    };

    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();
    const [cookies] = useCookies(['id'])

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
            axios.post(`${DjangoServer}/diagnosis_board/create/`, form, {
                headers: { Authorization: `Token  ${cookies.id}` }
            }).then(
                response => {
                    alert("등록되었습니다.");
                    // dispatch({type: 'back'});
                }
            );
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

    return (
        <div className='community_form_box'>
            <div className="community_back_button">
                <button onClick={backToMain}><img src={backButton} alt="Back Button" /></button>
            </div>
            <form name='formData' onSubmit={submitForm}>
                <table>
                    <tbody>
                    <tr>
                        <th>제목</th>
                        <td><input className='title' type='text' name='thread_title' onChange={changeForm} /></td>
                    </tr>
                    <tr>
                        <th>분류</th>
                        <td>
                            <select className='type' name='thread_type' onChange={changeForm}>
                                <option>분류 선택</option>
                                <option value='0'>일반</option>
                                <option value='1'>질문</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea className='content' name='thread_content' onChange={changeForm} /></td>
                    </tr>
                    </tbody>
                </table>
                <button className='community_button_default' type='submit'>등록</button>
            </form>
        </div>
    );
};

export default DiagnosisBoardMainCreate;