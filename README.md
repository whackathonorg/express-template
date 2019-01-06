# express-template

[Express](https://expressjs.com/) is a framework for writing HTTP APIs. In this example a two routes are provided which output random apis.



## Example

https://whackathon.org/examples/randomapi/random?amount=3



## Routes

### /random

*Outputs several random APIs*

#### params:

- amount : <number>

#### example:

``` 
localhost:8080/random?amount=3
```

#### returns:

Array



### /spoiler

*Outputs all APIs if the  correct param is provided*

#### params:

- areYouSure: <String>

#### example:

```
localhost:8080/spoiler?areYouSure=yes_i_am_really_sure
```

#### returns:

Array



##Requirements

For this template to work you must have [node and npm](https://nodejs.org/en/) installed on your system. 



## Project setup

*Installs all package dependencies.*

```
npm install
```

### Start server with file watch

*Automatically restart the server when changes are saved.*

```
npx nodemon
```

### Start server

*Simply starts the server.*

```
npm start
```

### 