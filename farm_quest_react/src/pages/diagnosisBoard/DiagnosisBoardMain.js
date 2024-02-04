import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import DiagnosisBoardMainList from './DiagnosisBoardMainList';
// import DiagnosisBoardMainDetail from './DiagnosisBoardMainDetail';
import { useSelector, useDispatch } from 'react-redux';

const DiagnosisBoardMain = ({ mainType }) => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const dispatch = useDispatch();
    const mainPagePreset = { link: `${DjangoServer}/diagnosis_board/${mainType}`, num: 1 };
    // console.log(mainPagePreset)
    const mainPage_ = useSelector(state => state.diagnosisBoard.mainPage);
    const [mainPage, setMainPage] = useState(mainPage_.link ? mainPage_ : mainPagePreset);
    const [data, setData] = useState({ results: [] });
    const [pagination, setPagination] = useState([]);

    const linkPreset = mainPagePreset.link + "?page=";
    console.log('hi')
    const title = () => {
        if (mainType === 'main') {
            return '전체';
        } else if (mainType === 'result') {
            return 'result'
        } else if (mainType === 'share') {
            return 'share'
        }
    }
    console.log('hi')
    const paginator = (currentPageNum, lastPageNum, range = 2) => {
        const cond1 = 1 < currentPageNum - range;
        const cond2 = lastPageNum > currentPageNum + range;
        let arr = [];
        if (2 * range + 1 >= lastPageNum) {
            return [...Array(lastPageNum)].map((_, i) => { return i + 1 });
        };
        if (cond1 && cond2) {
            arr = arr.concat([-1]);
            arr = arr.concat([...Array(2 * range + 1)].map((_, i) => { return currentPageNum - range + i }));
            return arr.concat([-1]);
        };
        if (cond1 && !cond2) {
            arr = arr.concat([-1]);
            return arr.concat([...Array(lastPageNum + range + 1 - currentPageNum)].map((_, i) => { return currentPageNum - range + i }));
        };
        if (!cond1 && cond2) {
            arr = arr.concat([...Array(currentPageNum + range)].map((_, i) => { return i + 1 }));
            return arr.concat([-1]);
        };
    };
    console.log('hi')
    const loadData = async () => {
        const response = await axios.get(mainPage.link);
        console.log('response', response)
        setPagination(paginator(mainPage.num, response.data.page_count));
        setData(response.data);

    };

    const toNext = () => {
        if (data.next) {
            setMainPage({ link: data.next, num: mainPage.num + 1 });
        };
    };
    console.log('hi')
    const toPrevious = () => {
        if (data.previous) {
            setMainPage({ link: data.previous, num: mainPage.num - 1 });
        };
    };

    const toPage = (idx) => {
        if (idx === -1) {
            return
        };
        // console.log(String(idx))
        const link = linkPreset + String(idx);
        setMainPage({ link: link, num: idx });
    };
    console.log('hi')
    const toDetail = (item) => {
        const updatedMainPage = mainPage || mainPagePreset;
        dispatch({
            part: 'diagnosisBoard',
            type: 'detail',
            threadNo: item.thread_no,
            mainPage: updatedMainPage
        });
    };
    const toCreate = () => {
        dispatch({
            part: 'diagnosisBoard',
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
    console.log('9')
    return (
        <section>
            <div className='community_main_top_box'>
                <p>{title()}</p>
                <button className='community_button_default' onClick={toCreate}>작성</button>
            </div>
            <div className='community_main_column_box'>
                <div className="community_list_item_display">
                    <div className="thread_no">번호</div>
                    {/* <div className="thread_type">분류</div> */}
                    <div className="thread_title" style={{ textAlign: 'center' }}>제목</div>
                    {/* <div className="nickname">닉네임</div> */}
                    {/* <div className="nums">조회수</div> */}
                </div>
            </div>
            <div className='community_main_center_box'>
                {
                    data.results.map(item => {
                        return (
                            <Link onClick={() => toDetail(item)}><DiagnosisBoardMainList item={item} /></Link>
                        );
                    })
                }
            </div>
            <div className='community_main_bottom_box'>
                {mainPage.num > 1 && (<button onClick={toPrevious}>이전</button>)}
                {
                    pagination.map(idx => {
                        return (
                            <Link
                                style={{
                                    padding: '4px',
                                    cursor: idx === mainPage.num || idx === -1 ? 'default' : 'pointer',
                                    color: idx === mainPage.num ? 'blue' : 'black',
                                    textDecorationLine: idx === mainPage.num ? 'underline' : 'none',
                                }}
                                onClick={() => toPage(idx)}
                            >
                                {idx === -1 ? '...' : idx}
                            </Link>
                        )
                    })
                }
                {mainPage.num < data.page_count && (<button onClick={toNext}>다음</button>)}
            </div>
        </section>
    );
};

export default DiagnosisBoardMain;