const {db, syncAndSeed, models: {User}} = require('./db/index.js')


const init = async () =>{
    try{
        await syncAndSeed();
        
    }
    catch(err){
        console.log(err)
    }
}

init();