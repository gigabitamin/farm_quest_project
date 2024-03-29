import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CsNoticeList from './CsNoticeList';
import { useSelector, useDispatch } from 'react-redux';

const CsMain = ({ mainType }) => {
    const DjangoServer = useSelector(state => state.DjangoServer);
    const dispatch = useDispatch();
    const mainPagePreset = { link: `${DjangoServer}/cs_notice/main/${mainType}`, num: 1 };
    const mainPage_ = useSelector(state => state.customerCenter.mainPage);
    const [mainPage, setMainPage] = useState(mainPage_.link ? mainPage_ : mainPagePreset);
    const [data, setData] = useState({ results: [] });
    const [pagination, setPagination] = useState([]);

    const linkPreset = mainPagePreset.link + "?page=";

    const title = () => {
        if (mainType === 'main') {
            return '전체';
        } else if (mainType === 'service') {
            return '서비스'
        } else if (mainType === 'community') {
            return '커뮤니티'
        } else if (mainType === 'shop') {
            return '쇼핑'
        }
    }

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

    const loadData = async () => {
        const response = await axios.get(mainPage.link);
        setPagination(paginator(mainPage.num, response.data.page_count));
        setData(response.data);
        console.log('공지사항 데이타 ', response.data)
    };

    const toNext = () => {
        if (data.next) {
            setMainPage({ link: data.next, num: mainPage.num + 1 });
        };
    };

    const toPrevious = () => {
        if (data.previous) {
            setMainPage({ link: data.previous, num: mainPage.num - 1 });
        };
    };

    const toPage = (idx) => {
        if (idx === -1) {
            return
        };
        console.log(String(idx))
        const link = linkPreset + String(idx);
        setMainPage({ link: link, num: idx });
    };

    const toDetail = (item) => {
        dispatch({
            part: 'customerCenter',
            type: 'detail',
            threadNo: item.thread_no,
            mainPage: mainPage
        });
    };

    const toCreate = () => {
        dispatch({
            part: 'customerCenter',
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
        <section class="cs_notice_section">
            <div><h2>공지사항</h2></div>
            <div className='cs_notice_main_top_box'>
                <p>{title()}</p>
                {/* <button onClick={toCreate}>작성</button> */}
            </div>
            <div className='cs_notice_main_column_box'>
                <div className="cs_notice_list_item_display">
                    <div>
                        <div className="cs_notice_no">번호</div>
                    </div>
                    <div className="cs_notice_title" style={{ textAlign: 'center' }}>제목</div>
                    <div>
                        {/* <div className="cs_nickname">닉네임</div> */}
                        <div className="cs_notice_date">작성시간</div>
                        <div className="cs_notice_ctg_type">분류</div>
                    </div>
                </div>
            </div>
            <div className='cs_notice_main_center_box'>
                {
                    data.results.map(item => {
                        return (
                            <CsNoticeList item={item} />
                        );
                    })
                }
            </div>
            <div className='cs_notice_main_bottom_box'>
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

export default CsMain;
