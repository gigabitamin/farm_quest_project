const initialState = {
    loginUser: {

    },
    community: {
        show: 'main', // 표시 상태
        mainPage: null, // 메인 화면 페이지 정보
        threadNo: null, // 디테일 화면 쓰레드 번호
        item: {}
    },
    diagnosis: {

    },
    gardeningShop: {

    },
    scheduler: {

    }
};

export default function reducer(state=initialState, action) {

    // 현재 값을 복사
    const newState = { ...state };

    // 실행할 action에 맞는 코드 작성
    // 커뮤니티 관련 실행 코드
    if (action.part === 'community') {
        let communityState = { ...state.community };
        if (action.type === 'detail') {
            communityState.show = 'detail';
            communityState.threadNo = action.threadNo;
            communityState.mainPage = action.mainPage;
        } else if (action.type === 'mainBack') {
            communityState.show = 'main';
            communityState.threadNo = null;
        } else if (action.type === 'create') {
            communityState.show = 'create';
        } else if (action.type === 'update') {
            communityState.show = 'update';
            communityState.item = action.item;
        } else if (action.type === 'detailBack') {
            communityState.show = 'detail';
        } else if (action.type === 'reset') {
            communityState = { ...initialState.community };
        };
        newState.community = communityState;
    };

    return newState;
};