const Sequelize = require('sequelize')
const { STRING, TEXT } = Sequelize

const faker = require('faker')

const db =  new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_react_db');

const User = db.define('user', 
    {
        name: {
            type: STRING
        },
        bio:{
            type: TEXT
        }
    },
    {
        hooks:{
            beforeCreate: function(user){
                if(!user.bio){
                    user.bio = `${user.name} ${faker.lorem.paragraphs(2)} ${user.name}`;
                }
            }
        }
    }
)

User.createWithName = (name) =>{
    return(
        User.create({name})
    )
}

const syncAndSeed = async () =>{
    try{
        await db.sync({force: true})
        const [moe, larry, curly, ethyl] = await Promise.all(['Moe', 'Larry', 'Curly', 'Ethyl'].map(User.createWithName))
        console.log('connected to db')
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    db, 
    syncAndSeed,
    models: {
        User
    }
}