import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import CommunityMainList from './CommunityMainList';
import CommunityMainDetail from './CommunityMainDetail';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const CommunityMain = ({ mainType }) => {
    const [cookies] = useCookies(['id']);
    const history = useNavigate();
    const DjangoServer = useSelector(state => state.DjangoServer);
    const dispatch = useDispatch();
    const mainPagePreset = {link: `${DjangoServer}/community/main/${mainType}`, num: 1};
    const mainPage_ = useSelector(state => state.community.mainPage);
    const [mainPage, setMainPage] = useState(mainPage_.link ? mainPage_ : mainPagePreset);
    const [data, setData] = useState({results: []});
    const [pagination, setPagination] = useState([]);
    const [loading, setLoading] = useState(true)

    const linkPreset = mainPagePreset.link + "?page=";

    const title = () => {
        if (mainType === 'main') {
            return '전체';
        } else if (mainType === 'farmlog') {
            return '팜로그'
        } else if (mainType === 'qna') {
            return 'Q&A'
        }
    }

    // 없어서 수작업 했다 ㅠㅠㅠ
    const paginator = (currentPageNum, lastPageNum, range=2) => {
        const cond1 = 1 + range < currentPageNum;
        const cond2 = currentPageNum < lastPageNum - range;
        let arr = [];
        if (2*range + 1 >= lastPageNum){
            return [...Array(lastPageNum)].map((_, i) => {return i + 1});
        };
        if (cond1 && cond2) {
            arr = arr.concat([-1]);
            arr = arr.concat([...Array(2*range + 1)].map((_, i) => {return currentPageNum - range + i}));
            return arr.concat([-1]);
        };
        if (cond1 && !cond2) {
            arr = arr.concat([-1]);
            return arr.concat([...Array(2*range + 1)].map((_, i) => {return lastPageNum - 2*range + i}));
        };
        if (!cond1 && cond2) {
            arr = arr.concat([...Array(2*range + 1)].map((_, i) => {return i + 1}));
            return arr.concat([-1]);
        };
    };

    const loadData = async () => {
        const response = await axios.get(mainPage.link);
        // 테스트 출력
        console.log(response.data);
        setPagination(paginator(mainPage.num, response.data.page_count));
        setData(response.data);
        setLoading(false)
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

    const toPage = (idx) => {
        if (idx === -1){
            return
        };
        console.log(String(idx))
        const link = linkPreset + String(idx);
        setMainPage({link: link, num: idx});
    };

    const toDetail = (item) => {
        dispatch({
            part: 'community',
            type: 'detail',
            threadNo: item.thread_no,
            mainPage: mainPage
        });
    };

    const toCreate = () => {
        if (cookies.id) {
            dispatch({
                part: 'community',
                type: 'create',
                mainPage: mainPage
            });
        } else if (window.confirm('로그인이 필요한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?')) {
            history('/login')
        }
    };

    useEffect(() => {
        loadData();
    }, [mainPage]);

    useEffect(() => {
        setLoading(true);
        setMainPage(mainPagePreset);
    }, [mainType]);

    return (
        <section>
            <div className='community_main_top_box'>
                <p>{title()}</p>
                <button className='community_button_default' onClick={toCreate}>작성</button>
            </div>
            <div className='community_main_column_box'>
                <div className="community_list_item_display">
                    <div className="thread_no">번호</div>
                    <div className="thread_type">분류</div>
                    <div className="thread_title" style={{textAlign: 'center'}}>제목</div>
                    <div className="nickname">닉네임</div>
                    <div className="nums">조회수</div>
                </div>
            </div>
            <div className='community_main_center_box'>
                { loading ? (<p><br/>로딩중...</p>) :
                    data.results.map(item => {
                        return (
                            <a onClick={() => toDetail(item)}><CommunityMainList item={item} /></a>
                        );
                    })
                }
            </div>
            <div className='community_main_bottom_box'>
                {mainPage.num > 1 && (<button className="community_mini_button" onClick={toPrevious}>이전</button>)}
                {
                    pagination.map(idx => {
                        return (
                            <a
                                style={{
                                    padding: '4px 6px',
                                    cursor: idx===mainPage.num || idx===-1 ? 'default' : 'pointer',
                                    color: idx===mainPage.num ? 'blue' : 'black',
                                    textDecorationLine: idx===mainPage.num ? 'underline' : 'none',
                                }}
                                onClick={() => toPage(idx)}
                            >
                            {idx===-1 ? '...' : idx}
                            </a>
                        )
                    })
                }
                {mainPage.num < data.page_count && (<button className="community_mini_button" onClick={toNext}>다음</button>)}
            </div>
        </section>
    );
};

export default CommunityMain;