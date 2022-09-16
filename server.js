const { syncAndSeed, models: { User } } = require('./db')

const express = require('express')
const app = express();

const path = require('path')

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/src', express.static(path.join(__dirname, 'src')))


app.get('/api/users', async (req, res, next)=>{
    try{
        const data = await User.findAll({
            attributes:{
                exclude: ['bio']
            }
        });
        res.send(data)
    }
    catch(err){
        next(err);
    }
})

app.get('/api/users/:id', async (req, res, next)=>{
    try{
        const data = await User.findByPk(req.params.id)
        res.send(data)
    }
    catch(err){
        next(err);
    }
})


const init = async () =>{
    try{
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=>console.log(`listening on port ${port}`))
        
    }
    catch(err){
        console.log(err)
    }
}

init();