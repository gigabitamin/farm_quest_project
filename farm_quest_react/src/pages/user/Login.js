import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../shared/App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const Login = () => {
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
            .post("http://127.0.0.1:8000/login/", formData)
            .then((response) => {
                if (response.status < 300) {
                    setCookie('id', response.data.token);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("username", formData.username);
                    dispatch({
                        part: 'loginUser',
                        type: 'login',
                        username: formData.username
                    });
                    history("/");
                }
            });
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = cookies.id;
        if (token) {            
            axios.post("http://127.0.0.1:8000/login_check/", { token: token })
                .then((response) => {
                    if (response.status < 300) {                    
                        dispatch({
                            part: 'loginUser',
                            type: 'login',
                            username: response.data.username
                        });
                        history("/");
                    }
                })
                .catch(() => {                    
                    dispatch({
                        part: 'loginUser',
                        type: 'logout',
                    });
                });
        }
    };

    return (
      <section className="hero is-warning is-large">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-6-tablet is-5-desktop is-4-widescreen">
                <form onSubmit={loginSubmit} className="box">
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
                    <label className="label">패스워드</label>
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
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <div className="field">
                          <button className="button is-primary" type="submit">
                            로그인
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <a className="is-link" href="/register">
                          회원가입
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <div className="content tcentered">
                  <strong>또는</strong>
                </div>
                <div className="buttons is-centered">
                  <button className="button is-white">

                    <span>Github</span>
                  </button>
                  <button className="button is-info">

                    <span>Facebook</span>
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
