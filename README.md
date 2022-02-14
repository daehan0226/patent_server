# Patent api
### Nginx + Express + MongoDB(Mongoose) + jest(MongoDB In-Memory Server) + Redis

## API
1. README.md 기능, API 명세 작성
2. 테스트 코드 추가
3. 테스트 코드를 통과하는 코드 작성
4. 리팩토링

## Features
1. 특허 검색
   1. 조건 : 등록 날짜 기간
   2. 사이즈&페이지 단위의 검색 결과 반환
   3. 랜덤 특허(특허 수, 날짜 파라미터)
   4. 검색 - 명칭, 요약
      1. 길이 제한
      2. AND/OR 조합 쿼리
2. DB - 특허 데이터
   1. Mongoose로 DB 데이터 조작
   2. MongoDB - 특허 문서 인덱스 설정 - 출원번호는 유일한 값이자 모든 특허가 가지고 있고, 검색시 가장 많이 사용되는 필드이므로 아이디 값으로 설정하고, 명칭(title)과 요약(abstract)을 fulltext search를 위해 인덱스 설정 및 각각 인덱스 설정  
   3. Redis - 랜덤 문서 요청시 전체 문서수를 먼저 얻고 그 문서수에서 랜덤 숫자를 만들어 랜덤 숫자만큼 스킵하는데 처음 전체 문서수를 얻는 시간이 너무 오래 걸려서 전체 문서수는 저장(이후 년도,월 별로 추가 예정)

## Features to add
1. 검색 기능 다양화 명칭, 요악에서 검색 가능
2. MySQL - 유저 정보, 관심 특허 분야 / 관심 특허 저장

## Status Codes
*  https://www.npmjs.com/package/http-status-codes

## Endpoints
### /patents
<details>
<summary>Fetch patents</summary>

| | |
| :--- | :--- | 
| URL	| /patents/ |
| Method	| GET |
| Query Params | size=size&page=page&gdStartDate=gdStartDate&gdEndDate=gdEndDate&title=title&desc=desc&claim&claim |
| Success Response	| Code: 200 {"result":[{"_id": 11341, "title": "patent title"}, ...}], "message": "Success"}
| Error Response	| Code: 400 {"Message": "Param wrong type"} <br/> Code: 500 {"Message": "Oops, something went wrong"}
| Sample Request	| axios.get('/patents/?size=5&page=1&gdStartDate=20210101&gdEndDate=20211231&title=자동차&desc=문&claim&자동차문') |
|Type| size: number default 10 <br/> page: number default 1 <br/> title: string <br/> desc: string <br/> claim: string <br/> gdStartDate: string(YYYYMMDD) - required <br/> gdEndDate: string(YYYYMMDD) - required |
|Etc| gd: granted date(등록일) <br/>|
</details>

<details>
<summary>Fetch a patent by id</summary>

| | |
| :--- | :--- | 
| URL	| /patents/<strong>string:_id</strong> |
| URL Parameters |	Required: <strong>_id=[string]</strong> |
| Method	| GET |
| Success Response	| Code: 204 {"message": "Request has succeeded"}
| Error Response	| Code: 404  {"message": "Couldn't find what you want"} <br> Code: 500 {"message": "Oops, something went wrong"}
| Sample Request	| axios.get('/patents/61e95f1c1c9de498fdab2998')  |
</details>


### /patents/random
<details>
<summary>Fetch random patents</summary>

| | |
| :--- | :--- | 
| URL	| /patents/random |
| Method	| GET |
| Query Params | size=size&gdStartDate=gdStartDate&gdEndDate=gdEndDate |
| Success Response| Code: 200 {"result":[{"_id": 11341, "title": "patent title"}, ...}], "message": "Success"}
| Error Response	| Code: 500 {"Message": "Oops, something went wrong"}
| Sample Request	| axios.get('/patents/?size=5&gdStartDate=20210101&gdEndDate=20211231&title=자동차&desc=문&claim&자동차문') |
|Type| number: size / default: size 10 <br/> string(YYYYMMDD): gdStartDate, gdEndDate - required |
|Etc| gd: granted date(등록일) <br/>|
</details>
