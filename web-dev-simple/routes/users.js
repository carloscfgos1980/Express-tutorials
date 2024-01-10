const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send("User List")
});

router.get('/new', (req, res)=> {
    res.render("users/new")
});

router.post('/', (req, res)=> {
    const isValid = true;
    if(isValid){
        users.push({firstName: req.body.firstName})
        res.redirect(`users/${users.length - 1}`)
    } else{
        console.log("Error");
        res.render('users/new', {firstName: req.body.firstName});
    }
    console.log(req.body.firstName);
    res.send('Hi');
});

router
    .route('/:id')
    .get((req, res)=> {
        console.log(req.user)
    userId = req.params.id
    res.send(`Get user with id: ${userId}`)
    .put((req, res)=> {
    userId = req.params.id
    res.send(`Get user with id: ${userId}`)
    })
    .delete((req, res)=> {
    userId = req.params.id
    res.send(`Get user with id: ${userId}`)
    });
});

const users = [{firstName: "Kyle"}, {firstName: "Yanelis"}]
module.exports = router;