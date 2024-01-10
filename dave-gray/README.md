## express tutorial

https://www.youtube.com/watch?v=f2EqECiTBL8&t=23s

# 02.tut. Write and read file with nodejs (Min 18)

1. Search the offitial website of Nodejs

2. Click File system module

3. Command + f to habilitate the search command, then type the keyword, in this case: read

# 03.tut. NPM packages (min 49)

1. Install data functions package
   npm i date-fns

2. Install nodemon as a dev dependency
   npm i nodemon -D

# 04.tut. Event emitter (1:08 hr)

Create and event emitter

# 05.tut. Build a web server (1:22 hr)

N: This is a pain int the ass. So happy that expressjs exists!

# 06.tut. Intro to Expressjs (2:02 hr)

app.get('^/$|/index(.html)?', (req, res) => {})

- ^/$|/index(.html)? => This path gives us the option to avoid errors
- (.html)? => make optional to includes .html, and avoid error also.

app.get('/chain(.html)?', [one, two, three]);

- It is possible to call varios functions in one route. All the functions should use next(), except the last one. They works as middlewares.

# 07.tut. Middleware (2:22 hr)

- There are 3 types of middlewares:

1. Builtin
2. Custum
3. 3rd party

npm i cors

N: Shit load of explanations!

# 08.tut. Routing (2:58 hr)

1. Create root and subdir inside folder routes.
2. Create folder api and file employees to handle data

- Shit load of variations. Most I have seen before except that he links all the routes in employess.js:

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

2. Errase a lot of code that we need only for examples

3. Create the folder controller and move all the logig from the routes to a fil inside this folder: employeesController.js

- Tremendo arroz con mango formo este loco pa hacer lo del update!

# 10.tut. Authentification (3:45 hr)

Install bcrypt

npm i bcrypt

2. Create controllers for register and auth

3. Create the routes for register and auth

4. server.js routes as middleware:
   app.use('/register', require('./routes/register'));
   app.use('/auth', require('./routes/auth'));

# 11.tut. JWT Auth (4:09 hr)

JWT => Json Web Tokens

1. Install the packages we need. It can be all done in one sinle line:
   npm i dotenv jsonwebtoken cookie-parser

2. Get random crypto bytes. Type in the terminal
   node
   require('crypto').randomBytes(64).toString('hex')

N: After this I just follow the tutorial. It was very condusing....

# 12.tut. User Role. Authorization (5:10 hr)

Cada dia estiendo menos esta meirda!
It was not working because I copied the repository and it does not include .env

# 13.tut. MongoDB intro (5:40 hr)

N: I had to reinstall dotenv coz it was giving me an error

# 14.tut Mongoose Data Model (5:55 hr)

# 15.tut. Async CRUDS operations (6:15 hr)
