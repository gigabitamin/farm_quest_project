import React, { useState } from "react";
import axios from "axios";
import "../../shared/App.css";
import { useNavigate} from 'react-router-dom';


const Register = () => {

    let history = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post("http://localhost:8000/register/", formData)
        .then((response => {
            alert("회원가입 완료")
            console.log(response.data);
            history('/login');}))
        .catch((error) => {
            console.error("Error during registration:", error);
        });
    };

    return (
        <section className="hero is-warning is-large">
        <div className="hero-body">
            <div className="container">
            <div className="columns is-centered">
                <div className="column is-6-tablet is-5-desktop is-4-widescreen">
                <form onSubmit={handleSubmit} className="box">
                    <div className="field">
                    <label className="label">아이디</label>
                    <div className="control has-icons-left">
                        <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        className="input"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">이메일</label>
                    <div className="control has-icons-left">
                        <input
                        type="email"
                        placeholder="이메일을 입력하세요."
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">비밀번호</label>
                    <div className="control has-icons-left">
                        <input
                        type="password"
                        placeholder="*******"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="label">비밀번호 확인</label>
                    <div className="control has-icons-left">
                        <input
                        type="password"
                        placeholder="*******"
                        className="input"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    </div>
                    <div className="field">
                    <button
                        className="button is-primary is-fullwidth"
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
