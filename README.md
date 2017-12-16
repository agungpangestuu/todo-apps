# Todo Apps Rest-Api

list of routes user :

| Routes | HTTP | Descriptions |
|--------|------|--------------|
| / signup | POST  | Sign in with new user info  |
| / signin   | POST | Sign in while get an access token based on credentials  |

list of routes :

| Routes | HTTP | Descriptions |
|--------|------|--------------|
|/ create-task | POST  | User Create a Task  |
|/ edit-task / :{idTask}  | PUT | Update Descriptions a Task  By ID Task|
|/ mark-task-complete / :{idTask} |  PUT | Update Task to complete a user task   |
|/ mark-task-uncomplete / :{idTask}  | PUT | Update Task to uncomplete a user Task  |
|/ get-all-task   | GET  | Get all task User |
|/ delete-task / :{idTask}  | DELETE  | Delete a Task User By ID Task |


## Usage


with only npm :

```
npm install

npm run dev
```
To Access the API via `http://localhost:3000/api`.
