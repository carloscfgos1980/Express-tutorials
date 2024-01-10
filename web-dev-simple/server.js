const express = require('express');
const useRouter = require('./routes/users');

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
// app.get('/', (req, res)=> {
//     console.log('here');
//     res.render('index', {text: 'Word'})
// });

app.use('/users', useRouter)

app.listen(3000);