import React, { useState } from "react";
import axios from "axios";
import "../../shared/App.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Register = () => {

    let history = useNavigate();

    const DjangoServer = useSelector(state => state.DjangoServer);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        nickname: "",
        user_name: "",
        phone_number: "",
        address: "",        
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    console.log('hi', formData)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('hi2', formData)
        axios
        .post(`${DjangoServer}/register/`, formData)
        .then((response => {
            alert("회원가입 완료")
            console.log(response.data);
            history('/login');}))
        .catch((error) => {
            console.error("Error during registration:", error);
        });
    };

    return (
        <section className="resister_wrap">
        <div className="resister_div_box">
            <div className="resister_container">
            <div className="resister_columns">
                <div className="resister_column_box">
                <form onSubmit={handleSubmit} className="box">
                    <div className="resister_input_field">
                        <label className="resister_input_label">아이디</label>
                        <div className="resister_input_box">
                            <input
                            type="text"
                            placeholder="150자 이하"
                            className="input"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="resister_input_field">
                        <label className="resister_input_label">이메일</label>
                        <div className="resister_input_box">
                            <input
                            type="email"
                            placeholder="farm@farm.com"
                            className="input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="resister_input_field">
                        <label className="resister_input_label">비밀번호</label>
                        <div className="resister_input_box">
                            <input
                            type="password"
                            placeholder="8자리 이상, 숫자만 X"
                            className="input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="resister_input_field">
                        <label className="resister_input_label">비밀번호 확인</label>
                        <div className="resister_input_box">
                            <input
                            type="password"
                            placeholder="같은 비밀번호를 입력"
                            className="input"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            required
                            />
                        </div>                    
                    </div>

                    <div className="resister_input_field">
                        <label className="resister_input_label">닉네임</label>
                        <div className="resister_input_box">
                            <input
                                type="text"
                                placeholder="사이트 닉네임"
                                className="input"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                            />
                        </div>                    
                    </div>

                    <div className="resister_input_field">
                        <label className="resister_input_label">성명</label>
                        <div className="resister_input_box">
                            <input
                                type="text"
                                placeholder="본인 성명"
                                className="input"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                            />
                        </div>                    
                    </div>

                    <div className="resister_input_field">
                        <label className="resister_input_label">휴대폰 번호</label>
                        <div className="resister_input_box">
                            <input
                                type="text"
                                placeholder="11개의 번호 숫자만"
                                className="input"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>                    
                    </div>

                    <div className="resister_input_field">
                        <label className="resister_input_label">주소</label>
                        <div className="resister_input_box">
                            <input
                                type="text"
                                placeholder="주소지"
                                className="input"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>                    
                    </div>
                    <div className="resister_input_field">
                        <button
                            className="resister_submit_button"
                            type="submit"
                        >
                            회원가입
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default Register;
