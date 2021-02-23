import express from 'express'


const app = express()

app.get('/hello', (request, response) => {
    return response.json({message: 'Hello World'})
})

app.post('/', (request, response) =>{
    return response.json({message: 'Data saved!'})
})

app.listen(5050, ()=> console.log('Server is running!'))
