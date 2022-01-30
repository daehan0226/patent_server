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
| Query Params | ?size=size&page=page&adStartDate=adStartDate&adEndDate=adEndDate&gdStartDate=gdStartDate&gdEndDate=gdEndDate& |
| Success Response	| Code: 200 {"result":[{"pid": 11341, "title": "patent title"}, ...}], "message": "Success"}
| Error Response	| Code: 500 {"Message": "Oops, something went wrong"}
| Sample Request	| axios.get('/patents/?size=5&page=1&adStartDate=20190101&adEndDate=20190101&gdStartDate=20210101&gdEndDate=20211231') |
</details>