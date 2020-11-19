# IN MEMORY CRUD REST SERVICE WITH VALIDATION

## Task 2.1

Write a simple **REST** service with **CRUD** operations for User entity.
To create **REST** service, use **ExpressJS** (https://expressjs.com/).
The User should have the following properties (you can use **UUID** as a user identifier (`id`)):

```typescript
type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
```

Service should have the following **CRUD** operations for **User**:

- get user by `id`;
- create and update user;
- get auto-suggest list from `limit` users, sorted by login property and filtered by `loginSubstring` in the login property: `getAutoSuggestUsers(loginSubstring, limit)`
- remove user (**soft delete** – user gets marked with `isDeleted` flag, but not removed from the collection).

Store user’s collection in the service memory (while the service is running).
To test the service **CRUD** methods, you can use **Postman** (https://www.getpostman.com/).

## Task 2.2

Add server-side validation for create/update operations of **User** entity:

- all fields are **required**;
- `login` validation is required;
- `password` must contain letters and numbers;
- user’s `age` must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return **400 (Bad Request)** and detailed error message.

For requests validation use special packages like **joi** (https://github.com/hapijs/joi, https://www.npmjs.com/package/express-joi-validation).


# POSTGRESQL AND LAYERED ARCHITECTURE

## TASK 3.1
- Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgres or https://www.elephantsql.com/plans.html).
- Write SQL script which will create **Users** table in the DB and fill it in with predefined users’ collection.
- Configure your **REST** service to work with **PostgreSQL**.
- Use the **sequelize** package (http://docs.sequelizejs.com/) as **ORM** to work with **PostgreSQL**.
As an alternative to **sequelize** you can use more low-level **query-builder** library (http://knexjs.org/).

## TASK 3.2

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:

```
|- routers / controllers
|- services
|- data-access
|- models
```

# SECOND ENTITY AND MANY-TO-MANY ENTITY RELATIONSHIPS

## TASK 4.1

Add **Group** entity to already existing **REST** service with **CRUD** operations.

The **Group** entity should have the following properties (you can use **UUID** as Group **id**):

```typescript
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type GroupInterface = {
    id: string;
    name: string;
    permissions: Array<Permission>;
};
```

The service should provide the following **CRUD** operations for **Group**:
- get group by **id**;
- get all groups;
- create and update a group;
- remove group (**hard delete** – group data is fully removed from the DB).
Storing of groups data should be done in **PostgreSQL** in **Groups** table.
The service should follow the principles of 3-layer architecture.

## TASK 4.2

Link User records in one table with Group records in another table.
- Add a **UserGroup** table (*“many-to-many”* relationship) which will store the data describing
which users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be removed from
**UserGroup** as well.

## TASK 4.3

Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group. Use transactions to save records in DB.

# LOGGING & ERROR HANDLING

## TASK 5.1

Add express **middleware** which will log which service method has been invoked and which arguments have been passed to it.

## TASK 5.2

- Add express **middleware** which will log all unhandled errors and return a standard message with **HTTP** code  `500` **(Internal Server Error)**.

**Remark:** Do not modify the status code and the message for other errors like validation errors from the previous task.

- Add error handling to `process.on(‘uncaughtException’, ...)`.
- Add **Unhandled promise** rejection listener to log errors.

## TASK 5.3

Every method in the controllers should log the errors which should include the following information:
- method name;
- arguments which have been passed to the method;
- error message.

# JWT AUTHORIZATION AND CORS

## TASK 6.1

Add authorization to the already existing REST service.

- Add `login(username, password)` method which should return JWT token.
- Add a middleware which will proxy all the requests (except login) and check that HTTP Authorization header has the correct value of JWT token.
- In case of the HTTP Authorization header is absent in the request, the middleware should stop further controller method execution and return HTTP `401` code (Unauthorized Error) and standard error message.
- In case of HTTP Authorization header has invalid JWT token in the request, the middleware should return HTTP code `403` (Forbidden Error) and standard error message.

## TASK 6.2

Add **CORS middleware** to access service methods from WEB applications hosted on another domains (https://github.com/expressjs/cors).

# UNIT TESTS AND CONFIG

## TASK 7.1
- Add unit tests for User entity controller methods using Jest library (https://jestjs.io/).
- Add unit tests for Group entity controller methods using Jest.

## TASK 7.2

The information on DB connection (connection string) should be stored in .env file and should be passed to the application using environment variables with the help of dotenv package (https://www.npmjs.com/package/dotenv).
As an alternative package you can also use config (https://www.npmjs.com/package/config).

# To test the solution

- run `npm i`
- fill `.env` file with your DB credentials
- run SQL script `api\src\scripts\users.sql` to create required tables
- run `npm run task`

