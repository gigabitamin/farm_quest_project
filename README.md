# Final Project Farm Quest with Team Final Farmtasy

<!-- notice -->
### 공지

v0.3.4 - jsh  

====================================================
<!-- version -->
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

