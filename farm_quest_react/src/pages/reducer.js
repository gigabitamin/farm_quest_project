const initialState = {
    loginUser: {
        isLoggedIn: false,
        username: null
    },

    community: {
        show: 'main', // 표시 상태
        mainPage: {
            link: null,
            num: null
        }, // 메인 화면 페이지 정보
        threadNo: null, // 디테일 화면 쓰레드 번호
        item: {}
    },

    customerCenter: {
        show: 'main',
        mainPage: {
            link: null,
            num: null
        }, 
        threadNo: null, 
        item: {}
    },

    diagnosis: {

    },

    diagnosisBoard: {
        show: 'main',
        mainPage: {
            link: null,
            num: null
        }, 
        threadNo: null, 
        item: {}
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
    if (action.part === 'loginUser') {
        // 로그인 관련 실행코드
        let loginState = { ...state.loginUser };
        if (action.type === 'login') {
            loginState.isLoggedIn = true;
            loginState.username = action.username;
        } else if (action.type === 'logout') {
            loginState = { ...initialState.loginUser };
        };
        newState.loginUser = loginState;

    } else if (action.part === 'community') {
        // 커뮤니티 관련 실행 코드
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

    } else if (action.part === 'customerCenter') {
        // 고객센터 관련 실행 코드
        let customerCenterState = { ...state.customerCenter };
        if (action.type === 'detail') {
            customerCenterState.show = 'detail';
            customerCenterState.threadNo = action.threadNo;
            customerCenterState.mainPage = action.mainPage;
        } else if (action.type === 'mainBack') {
            customerCenterState.show = 'main';
            customerCenterState.threadNo = null;
        } else if (action.type === 'create') {
            customerCenterState.show = 'create';
        } else if (action.type === 'update') {
            customerCenterState.show = 'update';
            customerCenterState.item = action.item;
        } else if (action.type === 'detailBack') {
            customerCenterState.show = 'detail';
        } else if (action.type === 'reset') {
            customerCenterState = { ...initialState.customerCenter };
        };
        newState.customerCenter = customerCenterState;

    } else if (action.part === 'diagnosisBoard') {
        // 진단 게시판 관련 실행 코드
        let diagnosisBoardState = { ...state.diagnosisBoard };
        if (action.type === 'detail') {
            diagnosisBoardState.show = 'detail';
            diagnosisBoardState.threadNo = action.threadNo;
            diagnosisBoardState.mainPage = action.mainPage;
        } else if (action.type === 'mainBack') {
            diagnosisBoardState.show = 'main';
            diagnosisBoardState.threadNo = null;
        } else if (action.type === 'create') {
            diagnosisBoardState.show = 'create';
        } else if (action.type === 'update') {
            diagnosisBoardState.show = 'update';
            diagnosisBoardState.item = action.item;
        } else if (action.type === 'detailBack') {
            diagnosisBoardState.show = 'detail';
        } else if (action.type === 'reset') {
            diagnosisBoardState = { ...initialState.diagnosisBoard };
        };
        newState.diagnosisBoard = diagnosisBoardState;

    };
    



    return newState;
};
