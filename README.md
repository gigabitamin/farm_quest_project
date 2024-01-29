# Final Project Farm Quest with Team Final Farmtasy

<!-- notice -->
### 공지

### kdy jsh ltj develop 240129_1016

====================================================
<!-- version -->

### v0.5.5 kdy  
- 진단시스템 페이지 css 전부 완료(진단 준비, 진단 결과, 솔루션 상품 페이지)
- 솔루션 상품 페이지 상단에 찜하기(상품 목록 localStorage -> db에 저장, 불러오기) 기능 추가

### v0.5.4a kdy  
- 진단 페이지 CSS 수정  
- 작물 선택 이미지 업로드 통합   
- 반응형으로 전환 중, @media screen and (max-width: 720px)
- 진단 결과 페이지 수정, TOP2로 변경
- 진단결과 페이지 CSS 수정

### v0.5.4 jsh 
- 커뮤니티 댓글 기능 구현

### v0.5.3 kdy 
- 진단 시스템 css 적용 중

### v0.5.2 jsh
- 스케쥴러 관련 서버 문제 해결
- views.py 102라인 -> api_view() 사용, SchedulerWeather.js localhost:8000 풀주소 기입후 정상 작동

### v0.5.1a kdy  
- 진단 시스템 예외처리 완료
- 기존:YOLO에서 감지 못할 경우 serialized_result 빈 리스트 상태로 전송 -> boxes 찾을 수 없어서 에러
- 수정 후 : yolo_detections.py 빈 리스트 출력시 예외처리, DiagnosisUploadResult.js 에서 boxes 존재 여부 체크 후 출력으로 변경
- 가드닝 샵 views.py 68라인 Id->id (models.py 19라인 id 참조, inspectdb에서 id로 출력 확인)

### v0.5.1 psh  
- 스케쥴러 업데이트 사항 통합  
- grid_data 출력 로직 추가 
- 다른 팀원 환경에서 출력이 안되는 이슈로 수정중

### v0.5.0 jsh
- DB연동 관련 마이너 수정

### v0.4.9 kdy  
- abstract 방식으로 User 커스텀 모델 커스텀 회원가입 기능 구현
- 회원탈퇴 기능 구현
- 로그인 사용자의 프로필 정보 확인 / 수정 기능 추가
- users_app_user 테이블 구조 변경  

### v0.4.8 psh
- 스케쥴러 db 구조 변경, 모델 변경 반영, 기능 업데이트, api 기능 키 등록  

### v0.4.7 psh
- 스케줄러 초기 구성
- package.jso devDependencies "@babel/plugin-proposal-private-property-in-object": "^1.0.7" 추가

### v0.4.6 kdy  
- 로그아웃 시 쿠키 토큰 id 삭제 추가 
- local 

### v0.4.5 - jsh  (develop)
- 커뮤니티 DB관련 문제 해결

### v0.4.4 kdy  
- 로그인 유저의 정보를 LocaStorage 에 token을 저장하는 방식에서 cookie에 저장하여 로그인하는 방식으로 변경  
- 페이지 리로딩시 로그인 풀리는 문제 해결

### v0.4.3 jsh  
- 로그인 및 커뮤니티 권한 부여 초기

### v0.4.2a jsh kdy
- 로그인 및 커뮤니티 양식 수정
- 로그인 양식 수정, 헤더에 테스트 페이지용 링크메뉴 하나 생성  

### v0.4.1 ltj  
- 가드닝 샵 상세페이지 구현  
- header, top 오류 수정  

### v0.4.0 kdy  
- 리액트 회원가입, 로그인, 로그아웃 기능 및 페이지 구현
- user 테이블에 정상적으로 생성확인  

### v0.3.9 - kdy  
- 진단 결과 솔루션 키워드 연동 상품출력 페이지 무한스크롤 적용
- 스크롤이 하단에 닿을 때 10개씩 db로부터 불러와서 렌더링에 추가, 10개씩 추가로 출력  

### v0.3.8 - kdy  
- 진단 결과 나온 질병코드로 솔루션 테이블 연동 -> 질병 관련 솔루션 출력  
- 솔루션 결과 나온 솔루션 키워드 연동 -> 솔루션 키워드로 필터링 된 상품목록 출력  

### v0.3.7 - jsh  
- react-redux 관련 기본 양식 도입
- 리액트 커뮤니티 페이지 이식 및 장고 커뮤니티 프레임워크 연동
- requirement.txt 마이너 업데이트

### v0.3.6 - kdy  
- 진단페이지 yolo, tensorflow 종합 모델 오류 수정  
- 객체 탐지 모델 crop 이미지 질병, 확률 표기
- 이미지 분류 모델 확률순으로 질병, 확률 표기

### v0.3.5 - ltj  
- 가드닝샵 복구완료  
- 통합 후 CRUD 이상 무 확인  

### v0.3.4 - jsh  
- react-redux 초기설정 완료

### v0.3.3 - ltj  
- 가드닝샵 react-django 페이지 레이아웃, CRUD 기본 완료 (github merge 오류로 롤백)

### v0.3.2 - kdy  
- 진단 페이지 yolo -> 이미지 분류 모델 연동 완료  
- 두 모델의 결과 모두 보여주고 사용자에게 판단 맡기기
- 이미지 분류 모델의 경우 잘라진 객체를 사용하기에 해당 crops 이미지 페이지에 출력
- 이미지 분류 모델의 경우 1개의 레이블과 확률만 출력

### v0.3.1 - kdy  
- diagnosis_result db 생성  
- 진단 결과 results 객체로부터 뽑아내서 json 형태로 저장
- 파일 저장 & db 에 저장
- 진단 결과 페이지에 diagnosis_result 의 진단 병증 클래스 출력 완료

### v0.3.0 - kdy  
- diagnosis django backend, react front 기본적인 작물 직병 탐지 진단시스템 완료  

### v0.2.9 - kdy  
- farm_quest_project 가상환경에서 django - react CRUD 테스트 완료  
- diagnosis_app 리액트 마이그레이션 완료  
- app.js index.js header footer SideNav 마이그레이션 완료  

### v0.2.8  - jsh  
- React Template 마이그레이션 테스트

### v0.2.7 - ltj  
- 가드닝샵, 메인페이지 레이아웃 및 css 세부 손질  

### v0.2.6  - kdy
- 네비게이션 드롭다운 메뉴 추가, 각 메뉴 세부페이지 연결 추가    - kdy
- community 등 다른 메뉴에서 가드닝샵 index가 호출되는 문제 수정     - kdy
- static/js/jquery-3.4.1.min.js 추가    - kdy
- 기타 오류 수정    - kdy

### v0.2.5  
- solution_tb diagrnosis_history 기타 db 업데이트 migrate  -kdy  

### v0.2.4a  
- django 전 페이지 기본 app 생성 및 페이지 링크 완료, models.py 및 views.py CRUD 형식 작성 완료 - kdy
- 개인/일반 스케쥴러, 마이페이지 레이아웃 수정 - psh
- 진단 결과 레이아웃 수정  - kdy

### v0.2.3  
- 검색창 가드닝샵 url 'gardening_shop_search/(str:keyword)' -> '(str:keyword)/' 로 수정 -> 정상 작동  - kdy   

### v0.2.2  
- 가드닝샵 상품 리뷰 필터링 기능 추가  - kdy  
- 통합 검색창 기능 추가  -kdy  
- 검색 카테고리 선택 후 검색어 입력시 해당 카테고리 페이지로 이동 후 해당 카테고리 db에서 키워드로 검색 후 검색 결과 리스트로 받아와서 출력  - kdy
- 가드닝 샵 검색창 정상 작동 확인   - kdy
- index -> base footer header 분리 templates 폴더  -kdy  

### v0.2.1  
- 가드닝샵 상품 리뷰 별점 분석 긍/부 - ltj
- 가드닝샵 django app 추가 shopping_shop_review 테이블 crud 출력 - kdy

### v0.2.0
- django 기본 보일러 + 팀원 html 통합 후 수정, django로 구동 테스트 - kdy  
- 팀원 별 레이아웃 html 통합
- 고객센터(공지사항, FAQ, 1대1 문의), 회원가입, 로그인, 작물 진단 페이지 레이아웃 - kdy  
- index(헤더,푸터), 가이드 -ltj  
- 커뮤니티(팜로그, 질문/답변) - jsh  
- 스케쥴러(일반, 개인), 마이페이지 - psh  

### v0.1.0  
- django 기본 세팅 + 장고 보일러 메인페이지 구현 세팅 - kdy


### v0.0.1  
- django-react farm_quest 프로젝트 생성 테스트 - kdy

