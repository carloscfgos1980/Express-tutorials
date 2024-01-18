## express tutorial

https://www.youtube.com/watch?v=f2EqECiTBL8&t=23s

# 02.tut. Write and read file with nodejs (Min 18)

1. Search the offitial website of Nodejs

2. Click File system module

3. Command + f to habilitate the search command, then type the keyword, in this case: read

# 03.tut. NPM packages (min 49)

N: Explanation over npm packages and semantic versioning

1. Install data functions package
   npm i date-fns

2. Install nodemon as a dev dependency
   npm i nodemon -D

- Semantic

1. The carrot (^) means that the minor version and the path can be updated. In this example, minor version is 3 and path is 2.
   ^8.3.2

2. Like this you are specificating that only this version will work for this project:
   8.3.2

3. The tilde (~) is allow only to update the path version but not the minor version

4. Update everything (\*)

- If we want to install an specific version we add @after the package name and the version number

# 04.tut. Event emitter (1:08 hr)

Create and event emitter

There are package to log the error instead to create a event emitter ourselves. This is an example to build everything from scratch. Good practice but not practical

# 05.tut. Build a web server (1:22 hr)

N: This is a pain int the ass. So happy that expressjs exists!

# 06.tut. Intro to Expressjs (2:02 hr)

app.get('^/$|/index(.html)?', (req, res) => {})
N: Serving a client

- ^/$|/index(.html)? => This path gives us the option to avoid errors
- (.html)? => make optional to includes .html, and avoid error also.

app.get('/chain(.html)?', [one, two, three]);

- It is possible to call varios functions in one route. All the functions should use next(), except the last one. They works as middlewares.

# 07.tut. Middleware (2:22 hr)

N: Middleare created for logs and handle error. This is custom made but can be alse used by 3rd party middleware and it is a lot easier!

- There are 3 types of middlewares:

1. Built-in (app.use(express.json()))
2. Custum (Logger)
3. 3rd party (CORS)

N: folder: middleware contains a custum middleware for logs.
npm i cors

N: Shit load of explanations!

N: Custum made Error handler

# 08.tut. Routing (2:58 hr)

1. Create root and subdir inside folder routes.
2. Create folder api and file employees to handle data

- Shit load of variations. Most I have seen before except that the links all the routes in employess.js:

router.route('/')
.get((req, res) => {
res.json(data.employees);
})
.post((req, res) => {
res.json({
"firstname": req.body.firstname,
"lastname": req.body.lastname
});
})
.put((req, res) => {
res.json({
"firstname": req.body.firstname,
"lastname": req.body.lastname
});
})
.delete((req, res) => {
res.json({ "id": req.body.id })
});

- Except for the route that gets the element by id:

router.route('/:id')
.get((req, res) => {
res.json({ "id": req.params.id });
});

- Uses Thunder Client instead of POSTMan which I find very annoying!

# 09.tut. MVC REST API (3:23 hr)

MVC => Model View Controller. This is a popular pattern

1. Rename the folder data into model

2. Erase a lot of code that we need only for examples

3. Replicate how a database would work, We create ths function:
   const data = {
   employees: require('../model/employees.json'),
   setEmployees: function (data) { this.employees = data }
   }

4. Add new employee

const createNewEmployee = (req, res) => {
const newEmployee = {
id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
firstname: req.body.firstname,
lastname: req.body.lastname
}

        data.setEmployees([...data.employees, newEmployee]);

- Using the method of deep copy

5. Tremendo arroz con mango formo este loco pa hacer lo del update. Explanation 3:38. It works and this is not really important coz it just to understand how it works under the hood, with MongDB are just a few lines of code!

# 10.tut. Authentification (3:45 hr)

N: Recreate how database woul work. Create in model folder, a file: users.json

1. Create a file in the controllers folder in order to do the business logic.controllers/registerController.js:

2. Function to mock database functionality, it is like a set function from React:
   const usersDB = {
   users: require('../model/users.json'),
   setUsers: function (data) { this.users = data }

3. Import stuff we need:

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

N: Ne need to install bcrypt to handle passwords:

Install bcrypt
npm i bcrypt

// controllers/registerController.js
const bcrypt = require('bcrypt');

4. Function handleNewUser has a bunch of codes to replicsate database. All explained there (tutorial: 3:50)

5. Create controllers for register and auth
   5.1 - Create a function that recreates database functionality, very similiar to set function in React:
   const usersDB = {
   users: require('../model/users.json'),
   setUsers: function (data) { this.users = data }
   }

5.2 Require bcrypt in order to compare hashed passwords:
const bcrypt = require('bcrypt');

5.3 Evaluate password
const match = await bcrypt.compare(pwd, foundUser.password);

6. Create the routes for register and auth

7. server.js routes as middleware:
   app.use('/register', require('./routes/register'));
   app.use('/auth', require('./routes/auth'));

# 11.tut. JWT Auth (4:09 hr)

JWT => Json Web Tokens

N: Create a tokens and a middleware to verify the JWT

1.  Install the packages we need. It can be all done in one sinle line:
    npm i dotenv jsonwebtoken cookie-parser

2.  Get random crypto bytes. Type in the terminal
    node
    require('crypto').randomBytes(64).toString('hex')

3.  create JWTs
    const accessToken = jwt.sign(
    { "username": foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
    );
4.  Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

5.  Save (write) current user with refresh token in the fake database:
    await fsPromises.writeFile(
    path.join(\_\_dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
    );
6.  Send cookie response with refresh token:

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

7.  Send response to the client with the access token
    res.json({ accessToken });

8.  Create middleware to very the token. /middleware/verifyToken.js

9.  The the server.js, implement the vrify token in the route we want to protect, in this case, just employees route:
    app.use(verifyJWT);
    app.use('/employees', require('./routes/api/employees'));

10. Refresh route. This is used to issue a new access cookie.
    N: First we need to implement cookie-parser in server.js

controllers/refreshTokenController.js:
const usersDB = {
users: require('../model/users.json'),
setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(401);
const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );

}

module.exports = { handleRefreshToken }

11. create a refresh route. This is create with get method. routes/refreshRoute and call it from the server over the verifyToken middleware.

12. Logout controller and route (Explanation: 4:50)

13. Credentials custum middleware explanation: 5 hr. This is to ix an error in crom that CORS issues!

# 12.tut. User Role. Authorization (5:10 hr)

Authentification => is the process of verifying who some is
Authorization => is the process of verifying what resourses a user has access to

1.  /config. Create a file: roles.js. This file are copied from the source code!
    Checkout that roles object is added to very user

2.  controllers/registerController.js. Add roles to newUser:
    const newUser = {
    "username": user,
    "roles": { "User": 2001 },
    "password": hashedPwd
    };

3.  authController.js. Add roles data to the token
    if (match) {
    const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },

4.  refresgTokenController.js. Make the same adjustments:
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
    {
    "UserInfo": {
    "username": decoded.username,
    "roles": roles
    }
    },

5.  Make the changes in verifyJWT (5:20):
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;

6.  routes/api/employeesRoute.js add middleware to give certain permission to the users (Roles)

N: I need to check twice the tutorial to undestand how works verifyRoles middleware! This seems a bit more complicated that needed!

N: With ThunderClient we need to make a change in authController.js, remove: secure: true from the cookie that is sent. But with Chrome and production we need this flag!

N: req.roles comes from the middleware veryfyJWT.

- This RESTFul API does noet uses sessions!

# 13.tut. MongoDB intro (5:40 hr)

N: I had to reinstall dotenv coz it was giving me an error

**ADVANTAGES OF MONGODB**

- Performance (very fast)
- Flexibility (very easy to make structures)
- Scalability (noSQL can support large database with high request rates at a very low latency)
- Usability (we can get up and running in the cloud very fast)

1. Get the link for mongoDH and add the name of the database
2. Install Mongoose
3. config/dbConn.js. Create this file that will contain moongose connection to MongoDB

4. server.js. Require mongose, Connect to MongoDB and listen to req only if it is connected to mongoDB
   const mongoose = require('mongoose');

connectDB();

mongoose.connection.once('open', () => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

- Always check the documentatioin how to implement moongose coz the updates!

# 14.tut Mongoose Data Model (5:55 hr)

1. model/Employee.js. Create Employee schema
2. model/User.js. Create User schema
3. Changes in registerController to implement mongoose.

- This is 2 years old so the way of execute CRUDS operation with mongoose has changed! Always check official docs!

# 15.tut. Async CRUDS operations (6:15 hr)

1. RefreshController. Just add User schema functionability:
   const User = require('../model/User');
   const foundUser = await User.findOne({refreshToken}).exec();

- We have to convert the function into asynchronic coz we are using await

2. logoutController.js. Just add User schema functionability, just like above
3. employeeController.js. Add employee schema functionability
