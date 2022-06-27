const express = require('express');
const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork',
    user: 'postgres',
    password: 'josepc'
});

//pool.query('SELECT 1 + 1').then((res) => console.log(res));

const app = express();
app.use(express.urlencoded({extended: true}));

app.get('/posts', async (req,res) =>{
    const { rows } = await pool.query(`
    SELECT * FROM posts`);
    res.send(`
    <table>
        <thead>
        <tr>
            <th>id</th>
            <th>latitude</th>
            <th>longitude</th>
            
            
        </tr>
        </thead>
        <tbody>
        ${rows.map(row =>{
            return `
            <tr>
            <td>${row.id}</td>
            <td>${row.loc.x}</td>
            <td>${row.loc.y}</td>
            </tr>`
        }).join('')}
        </tbody>
    </table>
    <form method='POST'>
    <h3>Create post!</h3>    
    <div>
    <label>lat</label>
    <input name='lat'/>
</div>
<div>
        <label>lng</label>
        <input name='lng'/>
    </div>
<button type= 'submit'> CREATE </button>
    </form>`);
});

app.post('/posts', async (req, res) =>{{
    const {lng, lat} = req.body
    await pool.query(`INSERT INTO posts (loc) VALUES ($1)`, [`(${lat}, ${lng})`]);

    res.redirect('/posts')

}});

app.listen(3005, () => console.log('listening at 3005'));