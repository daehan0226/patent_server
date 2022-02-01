# Patent api
### Nginx + Express + MongoDB

## API 개발
1. README.md 기능, API 명세 작성
2. 테스트 코드 추가
3. 테스트 코드를 통과하는 코드 작성
4. 리팩토링

## Features
1. 특허 검색
   1. 조건 : 출원 날짜 기간, 등록 날짜 기간
   2. 검색 분류 : 명칭, 요악, 청구항에서 검색 가능
   3. 사이즈&페이지 단위의 검색 결과 반환

## Status Codes
*   API returns the following status codes:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 202 | `ACCEPTED` |
| 204 | `No CONTENT` |
| 400 | `BAD REQUEST` |
| 401 | `NO AUTH` |
| 403 | `FORBBIDEN` |
| 404 | `NOT FOUND` |
| 409 | `CONFLICT` |
| 500 | `INTERNAL SERVER ERROR` |

## Endpoints
### /patents
<details>
<summary>Fetch patents</summary>

| | |
| :--- | :--- | 
| URL	| /patents/ |
| Method	| GET |
| Query Params | size=size&page=page&adStartDate=adStartDate&adEndDate=adEndDate&gdStartDate=gdStartDate&gdEndDate=gdEndDate&title=title&desc=desc&claim&claim |
| Success Response	| Code: 200 {"result":[{"_id": 11341, "title": "patent title"}, ...}], "message": "Success"}
| Error Response	| Code: 400 {"Message": "Param wrong type"} <br/> Code: 500 {"Message": "Oops, something went wrong"}
| Sample Request	| axios.get('/patents/?size=5&page=1&adStartDate=20190101&adEndDate=20190101&gdStartDate=20210101&gdEndDate=20211231&title=자동차&desc=문&claim&자동차문') |
|Type| number: size, page - Not required / default: size 10, page 1 <br/> string: title, desc, claim -  Not required / default: empty string <br/> string(YYYYMMDD): adStartDate, adEndDate, gdStartDate, gdEndDate - Not required |
|Etc| ad: application date(출원일), gd: granted date(등록일) <br/> 출원일, 등록일 기본 값|
</details>


<details open>
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
