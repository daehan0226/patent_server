# Patent api
### Nginx + Express + MongoDB

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
<!-- <details>
<summary>Fetch actions</summary>

| | |
| :--- | :--- | 
| URL	| /actions/ |
| Method	| GET |
| Success Response	| Code: 200 {"result":[{"id": 1, "name": "play"}, ...}], "message": "Success"}
| Error Response	| Code: 500 {"Message": "Oops, something went wrong"}
| Sample Request	| axios.get('/actions/') |
</details>
<details>
<summary>Create an action</summary>

| | |
| :--- | :--- | 
| URL	| /actions/ |
| Query Params | ?name=action-name |
| Method	| POST |
| Success Response	| Code: 201 {"result":action_id, "message": "Created"}
| Error Response	| Code: 400 {"Message": "Dupilicate action name"} <br> Code: 401 {"message": "Please login first"} <br> Code: 403  {"message": "No permission"} <br> Code: 500  {"Message": "Oops, something went wrong"}
| Sample Request	| axios.post('/actions/?name=action name') |
</details>
<details>
<summary>Fetch an action</summary>

| | |
| :--- | :--- | 
| URL	| /actions/<strong>int:action_id</strong> |
| URL Parameters |	Required: <strong>action_id=[integer]</strong>|
| Method	| GET |
| Success Response	| Code: 200 {"message": "Success", "result": {id: action_id, name: action_name}} 
| Error Response	| Code: 404 {"message": "Couldn't find what you want"} <br> Code: 500 {"message": "Oops, something went wrong"}
| Sample Request	| axios.get(/actions/1) |
</details>
<details>
<summary>Delete an action</summary>

| | |
| :--- | :--- | 
| URL	| /actions/<strong>int:action_id</strong> |
| URL Parameters |	Required: <strong>action_id=[integer]</strong>|
| Method	| DELETE |
| Success Response	| Code: 204 {"message": "Request has succeeded"}
| Error Response	| Code: 401 {"message": "Please login first"} <br> Code: 403  {"message": "No permission"} <br> Code: 404 {"message": "Couldn't find what you want"} <br> Code: 500  {"message": "Oops, something went wrong"}
| Sample Request	| axios.delete(/actions/1) |
</details>
<details>
<summary>Update an action</summary>

| | |
| :--- | :--- | 
| URL	| /actions/<strong>int:action_id</strong> |
| URL Parameters |	Required: <strong>action_id=[integer]</strong> |
| Query Params | ?name=action-name |
| Method	| PUT |
| Success Response	| Code: 204 {"message": "Request has succeeded"}
| Error Response	| Code: 401  {"message": "Please login first"} <br> Code: 403 {"message": "No permission"} <br> Code: 404  {"message": "Couldn't find what you want"} <br> Code: 500 {"message": "Oops, something went wrong"}
| Sample Request	| axios.put('/actions/?name=new-action-name')  |
</details> -->

