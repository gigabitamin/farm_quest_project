import React, { useState } from "react";
import axios from "axios";
import "../../shared/App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    let history = useNavigate();

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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("[Login.js] handleSubmit");
        axios
        .post("http://127.0.0.1:8000/login/", formData)
        .then((response => {       
            console.log(formData)     
            if (response.status < 300) {
                console.log("[Login.js] Call props.doLogin");          
                localStorage.setItem("token", response.data["token"]);                
                localStorage.setItem("respons_data", response.data);                
                localStorage.setItem("username", formData.username);
                localStorage.setItem("password", formData.password);
                dispatch({
                  part: 'loginUser',
                  type: 'login',
                  username: formData.username
                });
                console.log(response.data);
                history("/");}})
        );
    }

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
