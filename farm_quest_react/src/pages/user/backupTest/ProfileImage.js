import React from 'react';


const ProfileImage = ({ imageData }) => {
  const imageUrl = `data:image/png;base64,${imageData}`;

  return (
    <div>
      <h2>프로필 이미지</h2>
      <img src={imageUrl} alt="프로필 이미지" />
    </div>
  );
};

export default ProfileImage;
