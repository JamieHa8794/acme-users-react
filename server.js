const { syncAndSeed, models: { User } } = require('./db')

const express = require('express')
const app = express();

app.get('/api/users', async (req, res, next)=>{
    try{
        const data = await User.findAll();
        res.send(data)
    }
    catch(err){
        next(err);
    }
})


const init = async () =>{
    try{
        await syncAndSeed();
        const port = process.env.URL || 3000;
        app.listen(port, ()=>console.log(`listening on port ${port}`))
        
    }
    catch(err){
        console.log(err)
    }
}

init();