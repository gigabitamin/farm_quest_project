import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './diagnosisBoard.css'

const DiagnosisBoardMainList = ({ item }) => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const diagnosis_result_all_id = item.diagnosis_result_all_id;
    const yolo_plant_name = item.plant_name;
    const serialized_results = item.detect_result.serialized_results_list[0];

    let highestConfidence = 0;
    let selectedBoxIndex = -1;

    console.log('item', item)

    for (let i = 0; i < serialized_results.boxes.length; i++) {
        const label = serialized_results.boxes[i]['label'];
        const confidence = Number(serialized_results.boxes[i]['confidence']);

        if (label >= 6 && confidence > highestConfidence) {
            highestConfidence = confidence;
            selectedBoxIndex = i;
        }
    }

    const obj_result_label = selectedBoxIndex !== -1
        ? serialized_results.names[serialized_results.boxes[selectedBoxIndex]['label']]
        : null;

    const obj_result_prob = selectedBoxIndex !== -1
        ? Number(serialized_results.boxes[selectedBoxIndex]['confidence']).toFixed(4) * 100
        : null;

    const obj_yolo_solution_word = selectedBoxIndex !== -1
        ? serialized_results.boxes[selectedBoxIndex]['solution_info']['solution_word']
        : null;

    const save_file_name = item.save_file_name;
    const url = save_file_name
        ? `${DjangoServer}/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
        : null;

    // const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/diagnosis_upload_result_board', { state: { file_name: item } });
    };

    return (
        <div className="community_content_box_list_item">
            <div className="community_list_item_display" onClick={handleClick}>
                <div className="thread_no">{diagnosis_result_all_id}</div>
                <div className="thread_title">
                    <div className="diagnosis_result_analystic_image">
                        <img src={url} alt="UploadResult" className="diagnosis_result_analystic_image_img" />
                    </div>
                    <span>{yolo_plant_name} | </span>
                    <span>{obj_result_label} | </span>
                    <span>{obj_result_prob}% | </span>
                    <span>솔루션 워드({obj_yolo_solution_word}) | </span>
                    <span>{item.diagnosis_create_time} | </span>
                    <span className="result_span_last">즐겨찾기</span>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisBoardMainList;
