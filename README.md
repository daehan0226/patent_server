# Patent api
### Nginx + Express + MongoDB + MongoDB In-Memory Server(for Test-with Jest)

## API 개발
1. README.md 기능, API 명세 작성
2. 테스트 코드 추가
3. 테스트 코드를 통과하는 코드 작성
4. 리팩토링

## Features
1. 특허 검색
   1. 조건 : 등록 날짜 기간
   2. 검색 분류 : 명칭, 요악, 청구항에서 검색 가능
   3. 사이즈&페이지 단위의 검색 결과 반환
   4. 랜덤 특허(특허 수, 날짜 파라미터)

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