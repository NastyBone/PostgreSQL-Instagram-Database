const app = require('./src/app')
const pool = require('./src/pool')


pool.connect({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'postgres',
    password: 'josepc'
}).then(() =>{
    console.log('Database Connected!')
    app().listen(3005, () =>{console.log('Listening on port 3005')})
}).catch((e) => {
    console.error(e.message)
})