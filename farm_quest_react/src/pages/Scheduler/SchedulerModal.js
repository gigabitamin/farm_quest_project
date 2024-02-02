import React, { useEffect } from 'react';

const SchedulerModal = ({ handleCloseModal, showModal }) => {
    useEffect(() => {
        if (showModal) {
            console.log('Modal is visible');

            const timeoutId = setTimeout(() => {
                handleCloseModal();
            }, 2000);

            return () => {
                clearTimeout(timeoutId);
            };
        } else {
            console.log('Modal is not visible');
        }
    }, [handleCloseModal, showModal]); 

    const handleCloseButtonClick = () => {
        handleCloseModal();
    };

    return (
        <div className={`modal-overlay${showModal ? ' visible' : ''}`}>
            <div className="modal">
                <div className="modal-content">
                    <p>자정 ~ 새벽 1시에는 예보 서비스가 제공되지 않습니다.</p>
                    <button onClick={handleCloseButtonClick}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default SchedulerModal;