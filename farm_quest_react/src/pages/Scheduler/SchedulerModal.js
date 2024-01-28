import React from 'react';

const SchedulerModal = ({ showModal, handleCloseModal }) => {
    return (
        <div className={`modal-overlay${showModal ? ' visible' : ''}`}>
            <div className="modal">
                <div className="modal-content">
                    <p>예보 서비스 시간이 아닙니다.</p>
                    <button onClick={handleCloseModal}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default SchedulerModal;
