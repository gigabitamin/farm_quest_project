import React, { useState, useEffect } from 'react';

const SchedulerModal = ({ handleCloseModal }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const currentTime = new Date();

        const isModalVisible = currentTime.getHours() >= 0 && currentTime.getHours() < 2;

        setShowModal(isModalVisible);

        if (isModalVisible) {
            const timeoutId = setTimeout(() => {
                setShowModal(false);
            }, (2 - currentTime.getHours()) * 60 * 60 * 1000); 

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, []); 

    const handleCloseButtonClick = () => {
        setShowModal(false);
        handleCloseModal();
    };

    return (
        <div className={`modal-overlay${showModal ? ' visible' : ''}`}>
            <div className="modal">
                <div className="modal-content">
                    <p>0시 ~ 2시에는 예보 서비스가 제공되지 않습니다.</p>
                    <button onClick={handleCloseButtonClick}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default SchedulerModal;
