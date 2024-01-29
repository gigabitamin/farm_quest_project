import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/community.css'
import CommunityLeft from './CommunityLeft';
import CommunityRight from './CommunityRight';
import CommunityMain from './CommunityMain';
import CommunityMainDetail from './CommunityMainDetail';
import CommunityMainCreate from './CommunityMainCreate';
import CommunityMainUpdate from './CommunityMainUpdate';
import { useSelector, useDispatch } from 'react-redux';

const Community = () => {
    const dispatch = useDispatch();
    const [mainType, setMainType] = useState(useParams().mainType);
    const show = useSelector(state => state.community.show);

    useEffect(() => {
        return () => dispatch({
            part: 'community',
            type: 'reset'
        });
    }, [mainType]);

    return (
        <article id="community">
            <CommunityLeft setMainType={setMainType} />
            <div className='community_main_box'>
                { (show === 'main') && <CommunityMain mainType={mainType} /> }
                { (show === 'detail') && <CommunityMainDetail /> }
                { (show === 'create') && <CommunityMainCreate /> }
                { (show === 'update') && <CommunityMainUpdate /> }
            </div>
            <CommunityRight />
        </article>
    );
};

export default Community;