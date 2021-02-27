import request from 'supertest'
import { getConnection, OptimisticLockVersionMismatchError } from 'typeorm'
import { app } from '../app'
import createConnection from '../database'

describe('Survey', ()=>{

    beforeAll(async ()=> {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async ()=> {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it('Should be able to create a new Survey', async ()=> {
        const response = await request(app).post('/survey').send({
        title: 'Teste',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae natus, dolore cupiditate voluptates modi rerum similique quo dolorem voluptatem numquam ullam totam soluta quis praesentium cumque aliquid maiores nostrum non.'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')

    })

    it('Should be able to get all Surveys', async ()=>{
        await request(app).post('/survey').send({
            title: 'Teste 2',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae natus, dolore cupiditate voluptates modi rerum similique quo dolorem voluptatem numquam ullam totam soluta quis praesentium cumque aliquid maiores nostrum non.'
        })
        const response = await request(app).get('/survey')
        
        expect(response.body.length).toBe(2)
    })

    // it('Should not be able to create a new Survey' , async()=> {

    //     const response = await request(app).post('/surveys').send({
    //     email:"user@exemple.com",
    //     name: "user example"

    // })

    // expect(response.status).toBe(400)
    
    // })


    

})