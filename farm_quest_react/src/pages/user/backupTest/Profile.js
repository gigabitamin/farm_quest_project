import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import ProfileImage from './ProfileImage'; 
import ProfileImg from '../../images/profile/farm_quest_site.png';
import { Link } from 'react-router-dom';


const Profile = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imageData, setImageData] = useState("");
  
  const history = useNavigate()
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
  
    axios
      .patch(`http://localhost:8000/profile/${userId}/`, formData, {  // 사용자의 ID를 URL에 추가합니다.
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status < 300) {
          alert('수정 완료')
          history("/");
        }
      });
  };

  const getProfile = () => {
    const token = cookies.id;
    const userId = cookies.user.id;
    axios
      .get(`http://localhost:8000/profile/${userId}`, {
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
        .get(`http://localhost:8000/profile_image/${userId}/`)
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
        <div className="container mcentered">
          <div className="profile-img">
            <div className="profile-img">
              <figure className="image is-128x128">
                <img src={ProfileImg} alt="프로필" />
                
                <img
                  src={`data:image/png;base64,${imageData}`}
                  onChange={handleChange}
                  alt="profile_image"
                  width="256"
                />
              </figure>
            </div>
            <div className="texts mcentered">
              <div className="title" onChange={handleChange}>
                
              </div>
              <div className="tags are-medium">
                <div className="tag">
                아이디 {cookies.user.username}
                </div> 
                <div className="tag">
                닉네임 {nickname}
                </div> 
                <div className="tag">
                성명 {userName}
                </div> 
                <div className="tag">
                휴대폰 번호 {phoneNumber}
                </div> 
                <div className="tag">
                주소 {address}
                </div> 
              </div>
              <br />
              <div className="button is-primary" onClick={updateClick}>
                <button>프로필 수정하기</button>                                
              </div>
              
            </div>
          </div>
          
          <div className="delete_profile"><Link to="/delete_profile"> 회원탈퇴</Link></div>
        </div>
      );
    } else {
      return (
        <div className="container mcentered">
          <div className="profile-img">
            <div className="profile-img">
              <div className="file has-name is-centered">
                <label className="file-label">
                <div className="file-label">프로필 이미지 업로드</div>
                  <div>
                  <input
                    className="file-input"
                    type="file"
                    name="profile_image"
                    onChange={fileChangeHandler}
                  /></div>
                    <img src={ProfileImg} alt="프로필" />
                    <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>                    
                    </span>                                    
                  <span className="file-name">{profileImage}</span>
                </label>
              </div>
            </div>
            
            <div className="texts mcentered">
              <div>
              닉네임 : 
              <input
                className="input is-primary is-medium"
                type="text"
                name="nickname"
                onChange={handleChange}
                placeholder={nickname}
              />
              </div>
              <div>
              성명 : 
              <input
                className="input is-primary is-medium"
                type="text"
                name="user_name"
                onChange={handleChange}
                placeholder={userName}
              />
              </div>
              <div>
              휴대폰 번호 : 
              <input
                className="input is-primary is-medium"
                type="text"
                name="phone_number"
                onChange={handleChange}
                placeholder={phoneNumber}
              />
              </div>
              <div>
              주소 : 
              <input
                className="input is-primary is-medium"
                type="text"
                name="address"
                onChange={handleChange}
                placeholder={address}
              />
              </div>
              <div>
              <button className="button is-primary" onClick={updateClick}>
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