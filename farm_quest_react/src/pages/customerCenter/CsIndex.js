import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './customerCenter.css'
import CsNotice from './CsNotice';
import CsFaq from './CsFaq';
import CsOne from './CsOne';
import CsMain from './CsMain';
import CsDetail from './CsDetail';
import CsCreate from './CsCreate';
import CsUpdate from './CsUpdate';
import CsLeft from './CsLeft';
import CsRight from './CsRight';

const CsIndex = () => {
    const dispatch = useDispatch();
    const [mainType, setMainType] = useState(useParams().mainType);
    const show = useSelector(state => state.customerCenter.show);

    useEffect(() => {
        return () => dispatch({
            part: 'customerCenter',
            type: 'reset'
        });
    }, [mainType]);

    return (
        <article id="customerCenter">
            {/* <CsLeft setMainType={setMainType} /> */}
            <div className='customerCenter_main_box'>
                { (show === 'main') && <CsMain mainType={mainType} /> }
                
                { (show === 'notice') && <CsNotice /> }
                { (show === 'faq') && <CsFaq /> }
                { (show === 'one') && <CsOne /> }

                { (show === 'detail') && <CsDetail /> }
                { (show === 'create') && <CsCreate /> }
                { (show === 'update') && <CsUpdate /> }

            </div>
            {/* <CsRight /> */}
        </article>
    );
};


export default CsIndex;
