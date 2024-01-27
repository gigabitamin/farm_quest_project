import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CommunityMainList from './CommunityMainList';
import CommunityMainDetail from './CommunityMainDetail';
import { useSelector, useDispatch } from 'react-redux';

const CommunityMain = ({ mainType }) => {
    const dispatch = useDispatch();
    const mainPagePreset = {link: `http://localhost:8000/community/main/${mainType}`, num: 0};
    const mainPage_ = useSelector(state => state.community.mainPage);
    const [mainPage, setMainPage] = useState(mainPage_.link ? mainPage_ : mainPagePreset);
    const [data, setData] = useState({results: []});

    const loadData = async () => {
        const response = await axios.get(mainPage.link);
        // 테스트 출력
        console.log(response.data)
        setData(response.data);
    };

    const toNext = () => {
        if (data.next) {
            setMainPage({link: data.next, num: mainPage.num+1});
        };
    };

    const toPrevious = () => {
        if (data.previous) {
            setMainPage({link: data.previous, num: mainPage.num-1});
        };
    };

    const toDetail = (item, mainPage) => {
        dispatch({
            part: 'community',
            type: 'detail',
            threadNo: item.thread_no,
            mainPage: mainPage
        });
    };

    const toCreate = () => {
        dispatch({
            part: 'community',
            type: 'create',
            mainPage: mainPage
        });
    };

    useEffect(() => {
        loadData();
    }, [mainPage]);

    useEffect(() => {
        setMainPage(mainPagePreset);
    }, [mainType]);

    return (
        <section>
            <div className='community_main_top_box'>
                <button onClick={toPrevious}>이전</button>
                <button onClick={toNext}>다음</button>
                <button onClick={toCreate}>작성</button>
            </div>
            <div className='community_main_center_box'>
                {   
                    data.results.map(item => {
                        return (
                            <a onClick={() => toDetail(item, mainPage)}><CommunityMainList item={item} /></a>
                        );
                    })
                }
            </div>
            <div className='community_main_bottom_box'>
                <button onClick={toPrevious}>이전</button>
                <button onClick={toNext}>다음</button>
            </div>
        </section>
    );
};

export default CommunityMain;