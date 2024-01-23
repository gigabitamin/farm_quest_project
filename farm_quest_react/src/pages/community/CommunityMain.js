import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CommunityMainList from './CommunityMainList';
import CommunityMainDetail from './CommunityMainDetail';
import { useSelector, useDispatch } from 'react-redux';

const CommunityMain = ({ mainType }) => {
    const dispatch = useDispatch();
    const { mainPage } = useSelector(state => state.community);

    const [page, setPage] = useState(mainPage ? mainPage : `http://localhost:8000/community/main/${mainType}`);
    const [data, setData] = useState({results: []});

    const loadData = async () => {
        // 테스트 출력 
        // console.log(page);
        const response = await axios.get(page);
        setData(response.data);
    };

    const toNext = () => {
        if (data.next) {
            setPage(data.next);
        };
    };

    const toPrevious = () => {
        if (data.previous) {
            setPage(data.previous)
        };
    };

    const toDetail = (item, page) => {
        dispatch({
            part: 'community',
            type: 'detail',
            threadNo: item.thread_no,
            mainPage: page
        });
    };

    const toCreate = () => {
        dispatch({
            part: 'community',
            type: 'create',
            mainPage: page
        });
    };

    useEffect(() => {
        loadData();
    }, [page]);

    useEffect(() => {
        setPage(`http://localhost:8000/community/main/${mainType}`);
    }, [mainType]);

    return (
        <section>
            <div>
                <button onClick={toPrevious}>이전</button>
                <button onClick={toNext}>다음</button>
                <button onClick={toCreate}>작성</button>
            </div>
            <div>
                {   
                    data.results.map(item => {
                        return (
                            <a onClick={() => toDetail(item, page)}><CommunityMainList item={item} /></a>
                        );
                    })
                }
            </div>
            <div>
                <button onClick={toPrevious}>이전</button>
                <button onClick={toNext}>다음</button>
            </div>
        </section>
    );
};

export default CommunityMain;