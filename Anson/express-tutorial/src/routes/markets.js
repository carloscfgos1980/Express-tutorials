const {Router} = require('express');

const router = Router();

const marketList = [
    {
        id: 1,
        name: "Mercado Habana",
        miles: 3
    },
    {
        id: 2, 
        name: "Palo Gordo",
        miles: 5
    },
    {
        id:3, 
        name: "Casa Mimbre",
        miles: 8
    },
        {
        id:4, 
        name: "Cadeca",
        miles: 2
    }
];

router.use((req, res, next)=>{
    if(req.session.user) next();
    else res.send(401);
});

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

module.exports = router;