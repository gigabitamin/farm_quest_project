import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../../shared/App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import './user.css'

const Login = () => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const [cookies, setCookie] = useCookies(['id']);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const loginSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${DjangoServer}/login/`, formData)
            .then((response) => {                
                if (response.status < 300) {
                    setCookie('id', response.data.token);
                    setCookie('user', response.data.user);                    
                    dispatch({
                        part: 'loginUser',
                        type: 'login',
                        username: formData.username
                    });                    
                    history("/");
                }
            });        
    }

    return (
      <section className="login_wrap">
        <div className="login_wrap_div_box">
          <div className="login_container">
            <div className="login_container_box">
              <div className="login_column_box">
                <h2>로그인</h2>
                <hr />
                <form onSubmit={loginSubmit} className="box">
                  <div className="login_field">
                    <label className="login_label">아이디</label>
                    <div className="login_input_box">
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
                  <div className="login_field">
                    <label className="login_label">패스워드</label>
                    <div className="login_box_password">
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
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <div className="login_field">
                          <button className="login_submit_button" type="submit">
                            로그인
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="resister_box_wrap">
                      <div className="resister_box">
                        <a className="resister_link" href="/register">
                          회원가입
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <div className="login_etc">
                  <strong>또는</strong>
                </div>
                <div className="login_github_wrap">
                  <button className="login_gihub_button">

                    <span>Github</span>
                  </button>
                  <button className="login_github">

                    <span>Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Login;
