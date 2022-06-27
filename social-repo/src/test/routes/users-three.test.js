const request = require('supertest');
const buildApp = require('../../app');
const UserRepo = require ('../../repos/user-repo');
const pool = require('../../pool')
const Context = require('../context')

let context
beforeAll(async () =>{
    context = await Context.build()
})

beforeEach(async () =>{
    await context.reset()
})


afterAll(()=>{
    return context.close()

})

it('create a user', async () =>{
    const startCount = await UserRepo.count();


    await request(buildApp())
    .post('/users')
    .send({username: 'a test user', bio: 'testing bio'})
    .expect(200)
   
    const finishCount = await UserRepo.count();
    expect(finishCount - startCount).toEqual(1)

})