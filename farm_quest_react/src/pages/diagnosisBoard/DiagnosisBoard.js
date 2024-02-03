import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/community.css'
// import DiagnosisBoardLeft from './DiagnosisBoardLeft';
// import DiagnosisBoardRight from './DiagnosisBoardRight';
import DiagnosisBoardMain from './DiagnosisBoardMain';
import DiagnosisBoardMainDetail from './DiagnosisBoardMainDetail';
import DiagnosisBoardMainCreate from './DiagnosisBoardMainCreate';
import DiagnosisBoardMainUpdate from './DiagnosisBoardMainUpdate';
import { useSelector, useDispatch } from 'react-redux';

const DiagnosisBoard = () => {
    console.log('hi')
    const dispatch = useDispatch();
    const [mainType, setMainType] = useState(useParams().mainType);
    console.log(mainType)
    const show = useSelector(state => state.diagnosisBoard.show);
    console.log(mainType)
    console.log('hi')
    useEffect(() => {
        return () => dispatch({
            part: 'diagnosisBoard',
            type: 'reset'
        });
    }, [mainType]);
    console.log('hi')
    return (
        <article id="diagnosisBoard">
            {/* <DiagnosisBoardLeft setMainType={setMainType} /> */}
            <div className='community_main_box'>
                {(show === 'main') && <DiagnosisBoardMain mainType={mainType} />}
                {(show === 'detail') && <DiagnosisBoardMainDetail />}
                {(show === 'create') && <DiagnosisBoardMainCreate />}
                {(show === 'update') && <DiagnosisBoardMainUpdate />}
            </div>
            {/* <DiagnosisBoardRight /> */}
        </article>
    );
};

export default DiagnosisBoard;