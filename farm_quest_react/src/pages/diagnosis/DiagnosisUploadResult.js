import React, { useRef} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiagnosisUploadResult.css';


const DiagnosisUploadResult = () => {

    const location = useLocation();

    const DjangoServer = useSelector(state => state.DjangoServer);

    console.log('(location.state.file_name = ', location.state.file_name);

    const save_file_name = location.state.file_name.save_file_name;

    const serialized_results = location.state.file_name.detect_result.serialized_results_list[0];
    // const obj_result_label = serialized_results.names[serialized_results.boxes[0]['label']]
    // const obj_result_prob = Number(serialized_results.boxes[0]['confidence']).toFixed(4) * 100

    // const diagnosis_result_id_list = location.state.file_name.detect_result.diagnosis_result_id_list[0];
    const tf_predict_result_list_sorted = location.state.file_name.detect_result.tf_predict_result_list_sorted;
    const diagnosis_result_pk = location.state.file_name.diagnosis_result_pk
    const containerRef = useRef();
    const crops_path_list = location.state.file_name.detect_result.crops_path_list

    console.log('crops_path_list', crops_path_list)

    let highestConfidence = 0;
    let selectedBoxIndex = -1;
    
    for (let i = 0; i < serialized_results.boxes.length; i++) {
        const label = serialized_results.boxes[i]['label'];
        const confidence = Number(serialized_results.boxes[i]['confidence']);
        
        // label이 6 이상이고 confidence가 현재까지의 최고값보다 크다면 갱신
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
    

    // console.log("솔루션 워드", serialized_results.boxes[selectedBoxIndex]['solution_info']['solution_word'])

    const obj_yolo_solution_word = selectedBoxIndex !== -1
        ? serialized_results.boxes[selectedBoxIndex]['solution_info']['solution_word']
        : null;

    

    // const solution_row_list_serialized = location.state.file_name.detect_result.solution_row_list_serialized;

    // console.log(save_file_name)
    // console.log('diagnosis_result_id_lsit = ', diagnosis_result_id_list)
    // console.log('serialized_results = ', serialized_results)
    // console.log(serialized_results.boxes)
    // console.log('tf_predict_result_list_sorted = ', tf_predict_result_list_sorted)
    // console.log(tf_predict_result_list_sorted[0])
    // console.log(tf_predict_result_list_sorted[0][0])
    // console.log(tf_predict_result_list_sorted[0][0][1])
    // console.log(tf_predict_result_list_sorted[0][0][4])
    // console.log(solution_row_list_serialized)
    // console.log(solution_row_list_serialized[0])
    // console.log(solution_row_list_serialized[0][0])
    // console.log(solution_row_list_serialized[0][0]['solution_word'])
    // const firstKey = Object.keys(tf_predict_desease_list)[0];
    // const tf_predict_desease = tf_predict_desease_list[firstKey];

    if (serialized_results && serialized_results.boxes && tf_predict_result_list_sorted[0]) {

        const url = save_file_name
            // ? `${DjangoServer}/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
            ? `${DjangoServer}/media/diagnosis/yolo/origin_img/result_img/${save_file_name}`
            : null;

        // const file_name = save_file_name.split('.')[0];

        return (
            <div className="diagnosis_result_wrap">
                <section className="diagnosis_result_section_wrap">
                    <article title="title" className="diagnosis_result_title"><h1>진단 결과</h1></article>
                    <article title="notice" className="diagnosis_result_notice"><span></span></article>
                    <article title="content" className="diagnosis_result_content_wrap">

                        <section className="diagnosis_result_analystic_wrap">

                            <section className="diagnosis_result_yolo_analystic_wrap">
                                <article title="info" className="diagnosis_result_analystic_info">
                                    <div><h3>전체 부위 탐색 결과</h3></div>
                                    <div>진단파일명: {save_file_name}</div>
                                    <div>진단번호: {diagnosis_result_pk}</div>
                                </article>

                                <article title="summary" className="diagnosis_result_analystic_summary_box">
                                    <div className="diagnosis_result_analystic_summary_box_item">
                                        <div><h3>진단 요약 (
                                            솔루션 워드 : 
                                            <Link title="상품추천으로 이동" to={{pathname: `/diagnosis_recommend/${obj_yolo_solution_word}`,
                                                        state: { solutionWord: obj_yolo_solution_word }
                                                    }}>
                                                <span className="diagnosis_button">{ obj_yolo_solution_word}</span>)
                                            </Link>
                                        </h3></div>
                                        <div>약 {obj_result_prob} % 의 확률로 <span className='diagnosis_button_1'>{obj_result_label}</span> 일 것으로 예상됩니다</div>
                                    </div>
                                    <div className="diagnosis_result_analystic_summary_box_detail">
                                        <div className="diagnosis_result_analystic_image"><img src={url} alt="UploadResult" className="diagnosis_result_analystic_image_img" /></div>
                                        <div className="diagnosis_result_analystic_summary_content">
                                            <div className="diagnosis_result_analystic_summary_solution_item">
                                                <div ref={containerRef} style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>증상 : {tf_predict_result_list_sorted[0][1]['symptom']}</div>
                                                <div ref={containerRef} style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>발생환경 : {tf_predict_result_list_sorted[0][1]['occurence_environment']}</div>
                                                <div ref={containerRef} style={{ overflowY: 'scroll', height: 'calc(440px / 3)' }}>대처법 : {tf_predict_result_list_sorted[0][1]['solution_content']}</div>
                                            </div>                                  
                                        </div>
                                    </div>

                                </article>

                                <article className="diagnosis_result_detect_wrap">
                                    {serialized_results.boxes
                                        .filter(box => box.label >= 6)
                                        .map((box, index) => {
                                        const label = box.label;
                                        const labelName = serialized_results.names[label];
                                        const confidence = Number(box.confidence).toFixed(4);
                                        const isDisease = label >= 6;
                                        
                                        // const url_crops = crops_path_list[index]
                                        // const url_crops = `${process.env.PUBLIC_URL}/media/diagnosis/yolo/origin_img/result_img/${file_name}/crops/${labelName}/${file_name}.jpg`;

                                        // const modifiedPathList = crops_path_list.map(filePath => {
                                        //     const parts = filePath.split(/\\/g);
                                        //     const index = parts.indexOf('upload');
                                        //     if (index !== -1) {
                                        //       const relativePath = parts.slice(index + 1).join('/');
                                        //       const url_crops = `http://localhost:8000/${relativePath}`;
                                        //       return url_crops;
                                        //     }
                                        //     return null;
                                        //   }).filter(url_crops => url_crops !== null);
                                          
                                        // console.log('modifiedPathList)',modifiedPathList);

                                        if (!isDisease) {
                                            return null;
                                        }

                                        const url_crops = crops_path_list[index];

                                        return (
                                            <div title="detect" className="diagnosis_result_detect_item" key={index}><hr />
                                                
                                                <div className="diagnosis_result_detect_item_content">
                                                    <div className="diagnosis_result_predict_image">
                                                        {url_crops && (<img src={url_crops} alt={`Crops_${index}`} />)}
                                                    </div>                                        
                                                    <div className="diagnosis_result_detect_content">
                                                        <div>
                                                            {/* {isDisease ? (
                                                                    <h3>탐지된 질병</h3>
                                                                ) : (
                                                                    <h3>탐지된 작물</h3>
                                                                )} */}

                                                            {/* <h3>탐지된 질병</h3> */}
                                                            <div className="diagnosis_result_predict_item">
                                                                <div className="diagnosis_result_detect_item_title">박스_{index + 1}</div>
                                                                <div className="diagnosis_result_detect_item_1">{labelName}</div>
                                                                <div className="diagnosis_result_detect_item_2">{confidence * 100} %</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}                         
                                </article>
                            </section>
                            
                            <section className="diagnosis_result_tf_analystic_wrap">
                                <article title="partial_predict_summary" className="diagnosis_result_partial_predict">
                                    <h3>부위별 상세 진단 결과 : 진단 작물 ({tf_predict_result_list_sorted[0][0][1]}) </h3>
                                    {Number(tf_predict_result_list_sorted[0][0][4] * 100) <= 30 ? (
                                        <div>죄송합니다 예상되는 정보를 찾을 수 없습니다</div>
                                        ) : (
                                        <>
                                            {/* 30 이상일 때의 출력 */}
                                            {/* <div className="diagnosis_result_partial_predict_plant">진단 작물 : {tf_predict_result_list_sorted[0][0][1]}</div> */}
                                            <div className="diagnosis_result_partial_predict_disease">
                                            {(Number(tf_predict_result_list_sorted[0][0][4] * 100)).toFixed(2) } % 의 확률로 <span className='diagnosis_button_1'>({tf_predict_result_list_sorted[0][0][3]})</span> 일 것으로 예상됩니다
                                            </div>
                                            {/* <div className="diagnosis_result_partial_prob">예측 확률 : {(Number(tf_predict_result_list_sorted[0][0][4] * 100)).toFixed(2) } %</div> */}
                                        </>
                                    )}
                                </article>

                                <article title="partial_predict_detail" className="diagnosis_result_predict_disease_list_wrap">
                                    <h3>부위별 상세 진단 결과 예측 후보</h3>
                                    <div className="diagnosis_result_predict_disease_list_box">
                                        {tf_predict_result_list_sorted.map((predict, index) => {
                                        const probability = (Number(predict[0][4]) * 100).toFixed(2);
                                        if (probability <= 30) {
                                            return null;
                                        }

                                        if (index >= 2) {
                                            return null;
                                        }

                                        return (
                                            <div className="diagnosis_result_predict_disease_item" key={index}>
                                                <div className="diagnosis_result_predict_disease_item_summary">
                                                    <div className="diagnosis_result_predict_disease_item_summary_item">
                                                        {index + 1}. {predict[0][1]} ({predict[0][3]}) : {probability} %
                                                    </div>                
                                                    <div className="diagnosis_result_solution_word">
                                                        솔루션 워드 :    
                                                        <Link title="상품추천으로 이동" to={{
                                                            pathname: `/diagnosis_recommend/${predict[1]['solution_word']}`,
                                                            state: { solutionWord: predict[1]['solution_word'] }
                                                        }}>
                                                            <span className="diagnosis_button">{predict[1]['solution_word']}</span>
                                                        </Link>
                                                    </div>                        
                                                        <div className="diagnosis_result_predict_disease_item_content_wrap">
                                                        <div className="diagnosis_result_symptom">증상 : {predict[1]['symptom']}</div>
                                                        <div className="diagnosis_result_occurence_environment">발생환경 : {predict[1]['occurence_environment']}</div>
                                                        <div className="diagnosis_result_guide">대처법 : {predict[1]['solution_content']}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                        })}
                                    </div>
                                </article>
                            </section>
                        </section>
                    </article>
                </section>                
            </div>
        );
    }

    const url_empty = save_file_name
        // ? `${DjangoServer}/media/diagnosis/yolo/origin_img/${save_file_name}`
        ? `http://localhost:8000/media/diagnosis/yolo/origin_img/${save_file_name}`
        : null;

    return (
        <div className="diagnosis_result_none">
            <div className="diagnosis_result_none_info">
                <div><h3>진단 결과</h3></div>
                <div>진단 파일명: {save_file_name}</div>
                <div>죄송합니다 질병 부위를 찾지 못했습니다</div>
            </div>
            <div className="diagnosis_result_none_info_img_div"><img className="diagnosis_result_none_info_img" src={url_empty} alt="UploadResult" /></div>
        </div>
    );

};

export default DiagnosisUploadResult;
