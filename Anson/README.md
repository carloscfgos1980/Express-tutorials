## Expressjs course by Anson the DEveloper

# Lesson 1. ExpressJS - Intro & Project Setup

https://www.youtube.com/watch?v=39znK--Yo1o&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2

- Expressjs is a framework that is used to build server side applications. APIs for your clients

1.  cd example-app
    npm init -y
    npm i express
    npm i -D nodemon

- This is to install nodemon locally

2. Write the script to start the app in package.json:
   "start": "node ./src/index.js",
   "start:dev": "nodemon ./src/index.js"

3. To start nodemon
   npm run start:dev

4. Setting basics of the server:
   onst express = require("express");

const app = express();
const PORT = 3001;

app.listen(PORT, ()=>{console.log(`Running Express server on port ${PORT}`)})

# Lesson 2. ExpressJS - GET Requests

https://www.youtube.com/watch?v=-rJp6pf_eDQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=2

app.get('/groceries', (req, res)=>{
res.send([
{
item: "milk",
quantity: 2
},
{
item: "cereal",
quantity: 4
},
{
item: "bread",
quantity: 1
}
])
});

# Lesson 3. ExpressJS - POST Requests

https://www.youtube.com/watch?v=-qkU95vNqTo&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=3

1. Create a middleware to be able to use json from the HTTP request

2. Function to post:
   app.use(express.json());
   app.post('/groceries', (req, res)=>{
   console.log(req.body);
   groceryList.push(req.body)
   res.send(201);
   });

# Lesson 4. Middleware

https://www.youtube.com/watch?v=o4RLiTIOfhQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=4

1. Example middleware:
   app.get(
   '/groceries',
   (req, res, next)=>{
   console.log("before handling request");
   next();
   },
   (req, res)=>{
   res.send(groceryList);
   }
   );

- the second parameter (req, res, next). Use <next> function so it will go to the third paramater, otherwise we get an error. This is an example that is decapricated later on.

2. Create middleware to log method and path (url)

app.use((req, res, next)=>{
console.log(`${req.method} : ${req.url}`);
next();
});

- Middleware has to be before the routes

# Lesson 5. ExpressJS - Route Parameters

https://www.youtube.com/watch?v=DTeL4Q1emSw&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=5

app.get('/groceries/:item', (req, res)=>{
const {item} = req.params;
const groceryItem = groceryList.find((g)=>g.item === item);
res.send(groceryItem);
});

- groceries/:item'. <item> is the path we path tl select a single item (grocery) to the url.
- const {item} = req.params;. Distructured constant to grab the value from the request body.
- const grocery. Use get method to find the item in the groceryList array.
- res.send(groceryItem);. Send the respond to the client.

# Lesson 6. ExpressJS - Routers

https://www.youtube.com/watch?v=9XtXkMkpQOM&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=6

1. Create a folder for the routes and a file for the grorcery routes
   src/routes/groceries.js

2. import Router from express and save it as a function:

const {Router} = require('express');

const router = Router();

3. Cut the routes from index.js and copy in groceries.js. Then substitue app.use for router.use. Like this:

router.get('/', (req, res)=>{
res.send(groceryList);
});

4. Export the router:

module.exports = router;

5. src/index.js. Import the route and connect it to app that containts express, it is like a middleware:

const groceriesRouter = require ('./routes/groceries');

app.use('/groceries', groceriesRouter);

6. Create another route. Same process, this route is for markets

# Lesson 7. ExpressJS - Query Parameters

https://www.youtube.com/watch?v=74bz-GuXfWA&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=7

- Query parameter are passed in the URL in order to filter or sort the data that is sent back to the user.

router.get('/', (req, res)=>{
console.log(req.query);
const {miles} = req.query;
const parsedMiles = parseInt(miles);

    if(!isNaN(parsedMiles)){
        const filteredStores = marketList.filter((s)=> s.miles <= parsedMiles);
        res.send(filteredStores);
    } else{
        res.send(marketList);
    }

});

1.  Get the query paramater:
    const {miles} = req.query;

2.  Parse into a number (Int) coz the parameter is a string, even when it look like a number:
    const parsedMiles = parseInt(miles);

3.  Check if it is a number.isNaN stands for not a number but it has (!) before. So double negative makes is positive :
    if(!isNaN(parsedMiles))

4.  Filter out the stores that are in a area (miles) equal or lower than the parameter given in url (POSTman)

        const filteredStores = marketList.filter((s)=> s.miles <= parsedMiles);
        res.send(filteredStores);

5.  Send all the collection of instances in case that not query parameter has been passed:
    else{
    res.send(marketList);
    }

N: Query Parameters are used to filer or sort data in the request, while route parameter is used to get a single object (collection) of data.

# Lesson 8. ExpressJS - Cookies

https://www.youtube.com/watch?v=SqJqtXjkBts&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=8

N: http is stateless. Cookie allows http to have state

1. Install parser for cookies
   cd express-tutorial
   npm i cookie-parser

2. src/index.js. Require cookie parser and implemented as a middleware:
   const cookieParser = require('cookie-parser');

   app.use(cookieParser());

3. src/roures/groceries.js. send a cookie in the get route
   router.get('/', (req, res)=>{
   res.cookie('visited', true, {
   maxAge: 60000
   });
   res.send(groceryList);
   });

4. Log de req from the request grocery
   router.get('/:item', (req, res)=>{
   console.log(req.cookies);
   })

# Lesson 9. ExpressJS - Sessions

https://www.youtube.com/watch?v=isURb7HQkn8&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=9

- All the data that's store in cookies live in the client side (browser). We use sessions to store the data in the server side. it is saver

1. Install express-session
   cd express-tutorial
   npm i express-session

2. src/groceries.js. Get shopping cart list created with session:
   router.get('/shopping/cart', (req, res)=>{
   const {cart} = req.session;
   console.log('Cart');
   if(!cart){
   res.send('You have no cart session')
   } else{
   res.send(cart);
   }
   });

3. Populate the Shopping cart

router.post('/shopping/cart/item', (req, res)=>{
const {item, quantity} = req.body;
const cartItems = {item, quantity};
const {cart} = req.session;
if(cart){
req.session.cart.items.push(cartItems)
} else{
req.session.cart = {
items:[cartItems]
}
};
res.send(201);
});

# Lesson 10, ExpressJS - Sessions Cont. w/ Fake Authentication Example

https://www.youtube.com/watch?v=HyDCUFaAOyU&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=10

- This is just setting a fake situation to undestand how session works.

1. Install package to handle session
   cd express-tutorial
   npm i express-session

2. src/index.js. Require session and implemant session middleware
   const session = require('express-session');

app.use(
session({
secret: 'WWEIBEXUEXFCFUERCPQI',
resave: false,
saveUninitialized: false
})
);

3. Create a file to login. src/routes/auth.js:
   const {Router} = require('express');

const router = Router();

router.post('/login', (req, res)=>{
const {username, password} = req.body;
if(username && password){
if(req.session.user){
res.send(req.session.user)
}else{
req.session.user = {
username,
};
res.send(req.session);
}
} else {
res.send(401)
}
});

module.exports = router

4. Set middleware locally in grocery.js and markets.js. If I set it in in index.js it will also protect the route of the auth (login).

router.use((req, res, next)=>{
if(req.session.user) next();
else res.send(401);
});

N: Now I only have access to the markets and grocery routes only after I have send a post to login

# Lesson 11. ExpressJS - MongoDB & Mongoose

https://www.youtube.com/watch?v=o1g7ihFunxQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=11

N: MongoDB is not SQL so is componed of documents that contain collections

- Mongoose is a very popular tool. It's called ORM that stands for Object Relational Mapper. It mapps objects javascript objects into the actual database table or database collection or document

1. Install mongoDB in my Mac. It was a pain in the ass!

2. Install mongoose

cd express-tutorial
npm i mongoose

3. Create folder and file to handle mongodb with mongoose:
   src/database/index.js

4. Require mongoose and query the connection

const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost:27017/express-tutorial')
.then(()=>{console.log('Connected to mongoDB')})
.catch((err)=>{console.log(err)});

5. src/index.js. Require the dolder with the database

require('./database');

6. Inside database folder, create another folder to store the schema:
   src/database/schemas/User.js

6.1 Implement the schema:

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
username:{
type: mongoose.SchemaTypes.String,
required: true,
},
password: {
type: mongoose.SchemaTypes.String,
required: true,
},
email: {
type: mongoose.SchemaTypes.String,
required: true,
},
createAt: {
type: mongoose.SchemaTypes.Date,
required: true,
default: new Date(),
},
});

module.exports = mongoose.model('users', UserSchema);

7. src/routes/auth.js. Create a router to create new users:

router.post('/resgister', async (req, res)=>{
const {username, password, email} = req.body;
const userDB = await User.findOne({ $or: [{username},{email}]});

    if(userDB){
        res.status(400).send('User already exists!')
    } else {
        const newUser = await User.create({username, password, email});
        res.send(201);
    }

});

- We use async - await when wh are connecting to the DB.
- findOne({ $or: [{username},{email}]}). We use the <or> command to check if either of this key value already exist.

Check with POSTman: post new user

N: Mongo Compass show the collections. I had a little bug cs I didn't know how to update the collection to check the new ones nevertheless, it's solved!

# Lesson 12. ExpressJS - Hashing Passwords

https://www.youtube.com/watch?v=La7rGj_z6wM&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=12

N: With hashing you can not recover the original value while with encrypting you can recover the value is you have the correct key.

1. Create folder utils and file helpers.js
   src/utils/helpers.js

2. Install package to encrypt and decrypt passwords
   cd express-tutorial
   npm i bcryptjs

3. src/utils/helpers.js. Require bcrypt and implement a function to encrypt passwords:

const bcrypt = require('bcryptjs');

function hashPassword(password){
const salt = bcrypt.genSaltSync();
return bcrypt.hashSync(password, salt)
}

4. src/router/auth.js. Require hashPassword function:

const {hashPassword} = require('../utils/helpers');

4.1 Call the function inside post-register route:

const hashedPassword = hashPassword(password);
console.log(hashedPassword);
const newUser = await User.create({username, password:hashedPassword, email});

# Lesson 13. ExpressJS - Basic Username & Password Authentication

https://www.youtube.com/watch?v=0R2tCDRh3nQ&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=13

N: Passport is a authentification middleware library. It is very common to use with Express.js but it could be use with other libraries.

1. src/utils/helpers.js. Implement compare function

function comparePassword(raw, hash){
return bcrypt.compareSync(raw, HashChangeEvent)
}

2. src/routes/auth.js. Implement the router to login:

router.post('/login', async (req, res)=>{
const {email, password} = req.body;
if(!email || !password) return res.send(400);
const userDB = await User.findOne({email})
if(!userDB) return res.send(401);
const isValid = comparePassword(password, userDB.password);
console.log('isValid:', isValid);
if(isValid){
console.log('Authenticated successful!');
req.session.user = userDB;
return res.send(200);
} else {
console.log('Failed to authenticated!')
return res.send(401);
}
});

2.1 Check is there are no blanck field sin the request:
if(!email || !password) return res.send(400);

2.2 find the email in the database and storage in avariable:
const userDB = await User.findOne({email})

2.3 Send an error message if the username (email) does not exist:
if(!userDB) return res.send(401);

2.3 Call the comparePassword function to check if the password is correct:
const isValid = comparePassword(password, userDB.password);

2.4 If everything is ok (isValid) then create a session and send a ok respond:
if(isValid){
console.log('Authenticated successful!');
req.session.user = userDB;
return res.send(200);
}

2.5 If the password is incorrect, send a 401 respond:
else {
console.log('Failed to authenticated!')
return res.send(401);
}

N: I had a bug in this part coz I didnt return the value in comparePassword function!

# Lesson 14. ExpressJS - Authentication with PassportJS

https://www.youtube.com/watch?v=NzOmWMQpO-I&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=15

1. install package passport:
   npm i passport passport-local

2. src/index.js Require passpor and implement middleware:

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

N: Middleware has to be just above the routes

# Lesson 15. ExpressJS - Passport Local Strategy

https://www.youtube.com/watch?v=ye-0bJENrps&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=16

1. Create folder for the passport strategy
   src/strategies/local.js

2. import this file in index.js:
   require('./strategies/local');

3. passport.use(
   new Strategy(
   {
   usernameField: 'email',
   },
   async (email, password, done)=>{
   console.log(email);
   console.log(password);
   try {
   if(!email || !password) throw new Error('Missing credentials!');
   const userDB = await User.findOne({email});
   const isValid = comparePassword(password, userDB.password);
   if(isValid){
   console.log('Authenticate successful!');
   done(null, userDB)
   } else {
   console.log('Invalid authentication!');
   done(null, null);
   }
   } catch(err){
   console.log(err);
   done(err,null)
   }
   }
   )
   );

N: Same logig that the example of lesson # 14. I had a guv because I typed usernamefield instead of usernameField!

4. Use password middleware in login route:

const passport = require('passport');

router.post('/login', passport.authenticate('local'),(req, res)=>{
console.log('Logged in');
res.send(200);
});

# Lesson 16. ExpressJS - Serialize User & Deserialize User

https://www.youtube.com/watch?v=wbylpKRkOD0&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=16

- The serialized functions is used to save specific data request session object

- Desarialize user takes the data that we serialized into the session and it needs to use to retrieve the original record from the database, typically the user

1. src/strategies/local.js. Serialize user. This is used when log in:
   passport.serializeUser((user, done)=>{
   console.log('Serializing user...');
   console.log(user);
   done(null, user.id)
   });

2. src/strategies/local.js. Desarialize user. This is used acees the route after logged in
   passport.deserializeUser(async (id, done) => {
   console.log('Deserializing User');
   console.log(id);
   try {
   const user = await User.findById(id);
   if (!user) throw new Error('User not found');
   console.log(user);
   done(null, user);
   } catch (err) {
   console.log(err);
   done(err, null);
   }
   });

3. src/routes/auth.js. middleware for the user:

router.use((req, res, next)=>{
console.log('Inside Groceries Auth for middleware');
console.log(req.user);
if(req.user) next();
else res.send(401);
});

# Lesson 17. ExpressJS - Session Stores

https://www.youtube.com/watch?v=IJ1nHIgSOQA&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=17

1. Package to connect with mongoDB:
   npm i connect-mongo

2. src/index.js. Require package
   const mongoStore = require('connect-mongo');

3. Store the session in a collection in mongoDB so the session will be available even if the server restart:

app.use(
session({
secret: 'WWEIBEXUEXFCFUERCPQI',
resave: false,
saveUninitialized: false,
store: mongoStore.create({
mongoUrl: 'mongodb://localhost:27017/express-tutorial',
}),
})
);

# Lesson 18. ExpressJS - OAuth2 with Discord

https://www.youtube.com/watch?v=9-qg8y0eFow&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=18

N: This is an alternative to the previous way to log in

1. ceate an app in discourse developer
   1.1 Copy de client id and the public key in a notepad so we can use later
   1.3 create a redirect url that we will use in our app
   http://localhost:3001/api/v1/auth/discord/redirect

2. Install passport discord. We can use the strategy we want by searchin in passwordjs offitial website.
   npm install passport-discord

3. src/database/schema/DiscordUser.js. Create schema to save discordId

const mongoose = require('mongoose');

const DiscordUserSchema = new mongoose.Schema({
discordId: {
type: mongoose.SchemaTypes.String,
required: true,
},
createdAt: {
type: mongoose.SchemaTypes.Date,
required: true,
default: new Date(),
},
});

module.exports = mongoose.model('discord_users', DiscordUserSchema);

4. strategies/discord.js. Create the strategy to use discord:
   const passport = require('passport');
   const {Strategy} = require('passport-discord');
   const DiscordUser = require('../database/schemas/DiscordUser');

passport.serializeUser((user, done) => {
console.log('Serializing User...');
console.log(user);
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
console.log('Deserializing User');
console.log(id);
try {
const user = await DiscordUser.findById(id);
if (!user) throw new Error('User not found');
console.log(user);
done(null, user);
} catch (err) {
console.log(err);
done(err, null);
}
});

passport.use(
new Strategy(
{
clientID: '1183719956706246666',
clientSecret: 'DuT9wpfrQLpGn2otW8r8sg8Hd6A1dXPw',
callbackURL: 'http://localhost:3001/api/v1/auth/discord/redirect',
scope: ['identify'],
},
async function (accessToken, refreshToken, profile, done) {
console.log(accessToken, refreshToken);
console.log(profile);
const { id: discordId } = profile;
try {
const discordUser = await DiscordUser.findOne({ discordId });
if (discordUser) {
return done(null, discordUser);
} else {
const newUser = await DiscordUser.create({ discordId });
return done(null, newUser);
}
} catch (err) {
console.log(err);
return done(err, null);
}
},
)
);

5. Import discord into index.js:
   require('./strategies/discord');

N: Since we are not using local strategy, then we comment importing local

6. src/routes/auth.js. Create the route to log in with discord:

router.get('/discord', passport.authenticate('discord'), (req, res) => {
res.send(200);
});

router.get(
'/discord/redirect',
passport.authenticate('discord'),
(req, res) => {
res.send(200);
}
);

# Lesson 19. ExpressJS - Jest & Unit Testing

https://www.youtube.com/watch?v=t5sFkGk8GY8&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=19

N: Unit testing is test small pieces of our application instead of testing the the whole app.

1. Install Jest
   npm install --save-dev jest

2. jest.config.js. Uncomment testMatcht. This will match the unit test files

3. Create folder for the business logic
   src/controllers/auth.js

const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/helpers");

async function authRegisterController (req, res){
const { email} = req.body;
const userDB = await User.findOne({email});

    if(userDB){
        res.status(400);
        res.send('User already exists!');
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await User.create({email, password});
        res.send(201);
    }

}

module.exports = {
authRegisterController,
}

N: He creates a controller with the name of the function coz previous videos he was using a callback functiion as business logi but that can bot be useful while testing, Good practice would be to have this format from the very beginning!

3. **test**/controller/auth.spec. It is where the test are written for auth route

3.1 Write a test. It is important. This has to parameter:

- description of the test
- a callback function that contant the test

it('should send a status code of 400 when user exists', async () => {

4. Create fake parameters functions that will be passed to function we are testing (authRegisterController)

const request = {
body: {
email: 'fake_email',
password: 'fake_password',
},
};

const response = {
status: jest.fn((x) => x),
send: jest.fn((x) => x),
};

5. Mocking the data base:

- Import the database schema with jest mock
  jest.mock('../../database/schemas/User');

- mocking the implementation inside the test

User.findOne.mockImplementationOnce(() => ({
id: 1,
email: 'email',
password: 'password',
}));

- call the function we are testing
  await authRegisterController(request, response);

6. Writing the assertions:
   expect(response.status).toHaveBeenCalledWith(400);
   expect(response.send).toHaveBeenCalledTimes(1);

7. Second test:
   it('should send a status code of 201 when new user is created', async () => {

8. Return user value as null. This means the user does not exist in the data base ad a new user can be created:

User.findOne.mockResolvedValueOnce(undefined);

9. Mock creating a new user:

User.create.mockResolvedValueOnce({
id: 1,
email: 'email',
password: 'password',
});

10. Call the function we are testing
    await authRegisterController(request, response);

11. Mock the hashPassword function:
    const { hashPassword } = require('../../utils/helpers');

jest.mock('../../utils/helpers', () => ({
hashPassword: jest.fn(() => 'hash password'),
}));

12. Write the assertions:
    expect(hashPassword).toHaveBeenCalledWith('fake_password');
    expect(User.create).toHaveBeenCalledWith({
    email: 'fake_email',
    password: 'hash password',
    });
    expect(response.send).toHaveBeenCalledWith(201);

# Lesson 20. ExpressJS - More Unit Testing Examples with Jest

https://www.youtube.com/watch?v=KXvuWExXY4Y&list=PL_cUvD4qzbkwp6pxx27pqgohrsP8v1Wj2&index=20

N: Write testing for the discord verify function.

1. All the test are running inside a block function:
   describe('Discord Verify Function', () => {

2. Mock the parameter that willbe used in the tested function

const accessToken = '123';
const refreshToken = '456';
const profile = {
id: '2313213424',
};

const done = jest.fn((x) => x);

3.  First test
    it('should return user if found', async ()

4.  Mocking the database
    jest.mock('../../database/schemas/DiscordUser');

        const mockedUser = {
          id: 'id_123',
          discordId: profile.id,
          createdAt: new Date(),
        };

    DiscordUser.findOne.mockResolvedValueOnce(mockedUser);

5.  Called the tested function:
    await discordVerifyFunction(accessToken, refreshToken, profile, done);

6.  Write the assertions:
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
    discordId: profile.id,
    });
    expect(done).toHaveBeenCalledWith(null, mockedUser);
    });

7.  Second test
    it('should create user & return if not found', async () => {

8.  Mock database
    const newProfile = {
    id: '1234',
    };
    const newUser = {
    id: 1,
    discordId: '1234',
    createdAt: new Date(),
    };
    DiscordUser.create.mockResolvedValueOnce(newUser);
    DiscordUser.findOne.mockImplementationOnce(() => undefined);

9.  Call the tested function for the second block (else)
    await discordVerifyFunction(accessToken, refreshToken, newProfile, done);

10. Write the assertions:
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
    discordId: newProfile.id,
    });
    expect(DiscordUser.findOne).toHaveReturnedWith(undefined);
    expect(DiscordUser.create).toHaveBeenCalledWith({ discordId: '1234' });
    expect(done).toHaveBeenCalledWith(null, newUser);
    });

N: I need to learn a lot more about Jets and Unit testing but so far at least I understood this part

**THE END**
