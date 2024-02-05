import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import ProfileImg from '../../images/profile/farm_quest_site.png';
import { Link } from 'react-router-dom';
import './mypage.css'


const Profile = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imageData, setImageData] = useState("");

  const [lastLogin, setLastLogin] = useState("");
  const [address, setAddress] = useState("");
  const [favorite, setFavorite] = useState("");

  const history = useNavigate()
  const DjangoServer = useSelector(state => state.DjangoServer);
  const [cookies, setCookie] = useCookies(['id', 'user']);
  const imageUrl = `data:image/png;base64,${imageData}`;
  console.log('imageUrl = ', imageUrl.data)

  console.log('cookies 1 = ', cookies)

  useEffect(() => {
    getProfile();
  }, []);

  const fileChangeHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setNewImage(file);
    setImage(file["name"]);
  };

  const updateClick = (event) => {
    event.preventDefault();
    if (isUpdate === true) {
      updateProfile();
    } else {
      setIsUpdate((prevIsUpdate) => !prevIsUpdate);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "nickname") setNickname(target.value);
    else if (target.name === "user_name") setUserName(target.value);
    else if (target.name === "phone_number") setPhoneNumber(target.value);
    else if (target.name === "address") setAddress(target.value);

    else if (target.name === "last_login") setLastLogin(target.value);
    else if (target.name === "email") setEmail(target.value);
    else if (target.name === "favorite") setFavorite(target.value);

  };


  const updateProfile = () => {
    const token = cookies.id;
    const userId = cookies.user.id;
    const formData = new FormData();
    formData.append("profile_image", newImage);
    formData.append("nickname", nickname);
    formData.append("user_name", userName);
    formData.append("phone_number", phoneNumber);
    formData.append("address", address);
    // formData.append("last_login", lastLogin);
    formData.append("email", email);
    formData.append("favorite", favorite);


    axios
      .patch(`${DjangoServer}/profile/${userId}/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status < 300) {
          alert('수정 완료');
          // Reload the profile page
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };


  const getProfile = () => {
    const token = cookies.id;
    const userId = cookies.user.id;
    axios
      .get(`${DjangoServer}/profile/${userId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status < 300) {
          console.log('response.data.user = ', response.data)
          setNickname(response.data["nickname"]);
          setUserName(response.data["user_name"]);
          setPhoneNumber(response.data["phone_number"]);
          setAddress(response.data["address"]);
          setLastLogin(response.data["last_login"]);
          setEmail(response.data["email"]);
          setFavorite(response.data["favorite"]);
          setImage(response.data["profile_image"]);
        }
        console.log('response 121 = ', response.data.profile_image)
        console.log('response 121 = ', response.data)
        console.log('response 121 = ', response)
      });
  };



  const getProfileImage = () => {
    const userId = cookies.user.id;
    axios
      .get(`${DjangoServer}/profile_image/${userId}/`)
      .then((response) => {
        console.log('image res = ', response)
        if (response.data.image_data) {
          setImageData(response.data.image_data);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
      });
  };

  useEffect(() => {
    getProfileImage();
  }, []);



  const renderContent = () => {
    const isLogin = props.isLogin;

    console.log('imgage = ', profileImage)

    if (isLogin === false) {
      return history("/login");
    }

    if (isUpdate === false) {
      return (
        <div className="profile_container_box">
          <div>
            <div>
              <div className="profile_img_box">
                <div className="profile_img_div">
                  <h2>{nickname}</h2>
                  <figure className="profile_image_128">
                    <br />
                    <img src={ProfileImg} alt="프로필" />
                  </figure>
                </div>
                <div className="profile_texts">
                  <div className="title" onChange={handleChange}>

                  </div>

                  <div className="profile_tag_medium">
                    <div className="profileName">
                      <div className="profile_tag">
                        아이디
                      </div>
                      <div className="profile_tag">
                        성명
                      </div>
                      <div className="profile_tag">
                        전화번호
                      </div>
                      <div className="profile_tag">
                        이메일
                      </div>
                      {/* <div className="profile_tag">
                  마지막 접속
                  </div> */}
                      <div className="profile_tag">
                        마이팜 위치
                      </div>
                      <div className="profile_tag">
                        나의 작물
                      </div>
                    </div>
                    <div className="profileInfo">
                      <div className="profile_tag">
                        {cookies.user.username}
                      </div>
                      <div className="profile_tag">
                        {userName}
                      </div>
                      <div className="profile_tag">
                        {phoneNumber}
                      </div>
                      <div className="profile_tag">
                        {email}
                      </div>
                      {/* <div className="profile_tag">
                    {lastLogin}
                    </div>  */}
                      <div className="profile_tag">
                        {address}
                      </div>
                      <div className="profile_tag">
                        {favorite}
                      </div>
                    </div>
                  </div>

                  <br />
                  <div className="profile_update" onClick={updateClick}>
                    <button className="profile_update_button" >프로필 수정하기</button>
                  </div>
                  <br />

                </div>
              </div>
              <br />
              <button className="delete_profile">
                <Link to="/delete_profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  회원탈퇴
                </Link>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile_container_box_put">
          <div id='profileModifyContainer'>
            <div className="profile_img">
              <div className="profile_img_box">
                <div className="profile_img_is">
                  <span className="profile_file_label">
                    프로필 사진 변경
                  </span>
                  <label className="profile_image_label">
                    <div className="profileFileImg">

                    </div>

                    <div className="profileFileImg">
                      <input
                        className="profile_file_input"
                        type="file"
                        name="profile_image"
                        onChange={fileChangeHandler}
                      />
                      <img className="profileFileImg" src={ProfileImg} alt="프로필" />
                      {/* <i className="file_upload"></i> */}
                    </div>
                  </label>
                </div>
              </div>
              <div id="profileModifyWrap">
                <div id="profileModify">
                  <div className="profileModifyTitle">
                    <div className="profile_tag_modify">
                      닉네임 </div>
                    <div className="profile_tag_modify">
                      휴대폰 번호 </div>
                    <div className="profile_tag_modify">
                      이메일 </div>
                    <div className="profile_tag_modify">
                      마이팜 위치 </div>
                    <div className="profile_tag_modify">
                      나의 작물 </div>
                  </div>

                  <div className="profileModifyInput">
                    <div className="profile_tag">
                      <input
                        className="profile_input input"
                        type="text"
                        name="nickname"
                        onChange={handleChange}
                        placeholder={nickname}
                      />
                    </div>
                    <div className="profile_tag input">
                      <input
                        className="profile_input"
                        type="text"
                        name="phone_number"
                        onChange={handleChange}
                        placeholder={phoneNumber}
                      />
                    </div>
                    <div className="profile_tag input">
                      <input
                        className="profile_input"
                        type="text"
                        name="email"
                        onChange={handleChange}
                        placeholder={email}
                      />
                    </div>
                    <div className="profile_tag input">
                      <input
                        className="profile_input"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        placeholder={address}
                      />
                    </div>
                    <div className="profile_tag input">
                      <input
                        className="profile_input"
                        type="text"
                        name="favorite"
                        onChange={handleChange}
                        placeholder={favorite}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="profile_button" onClick={updateClick}>
                  <span>수정 완료</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return renderContent();
};

export default Profile;