const supertest = require('supertest')
require('dotenv').config()
const base64 = require("base-64")
const { userSequelize } = require('../src/model')
const { app } = require('../src/server')
const bearerCheck = require('../src/middleware/bearerCheck')
const muke = supertest(app)
  // "scripts": {
  //   "test": "echo \"Error: no test specified\" && exit 1"
  // },

  beforeAll(async () => {
     await userSequelize.sync()
})

afterAll(async () =>{
     await userSequelize.drop()
})

describe('server test' , () => {


     it('signup test' , async () =>{
          const name = 'ehab1'
          const res = await muke.post('/signup').send({
               username: name,
               password : '123123',
               role: 'admin'
          })

          expect(res.statusCode).toBe(201)
          expect((JSON.parse(res.text).user.username)).toBe(name)

     })

    const base = base64.encode('ehab1:123123') 
     it('signin test' , async () =>{
          const res = await muke.post('/signin').set('Authorization', `Basic ${base}`)

          // console.log(JSON.parse(res.text),'66666666666666666666666666666');
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).message.user.username).toBe('ehab1')

     })

     it('get order test' , async () =>{
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVoYWIxIiwicGFzc3dvcmQiOiIkMmIkMDUkNW1GYUFCM0JYNEFjRUlzMENReDdodWZ4T1VUZGQ2dGNEdmZLeUk4VEVKQ2RhM2svQ3NBWk8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgzMTcyOTF9.JfYUG3-Z3AtdSotZa9DxjDdieOQWTgyhGjCbq-Tdkyg'
          const res = await muke.get('/order').set('Authorization', `Basic ${token}`)

          // console.log(JSON.parse(res.text) , '66666666666666666666777777777777');

          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).wc).toBe("welcome , you have the access ")

     })
     it('post order test' , async () =>{
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVoYWIxIiwicGFzc3dvcmQiOiIkMmIkMDUkNW1GYUFCM0JYNEFjRUlzMENReDdodWZ4T1VUZGQ2dGNEdmZLeUk4VEVKQ2RhM2svQ3NBWk8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgzMTcyOTF9.JfYUG3-Z3AtdSotZa9DxjDdieOQWTgyhGjCbq-Tdkyg'
          const res = await muke.post('/order').set('Authorization', `Basic ${token}`)
  
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).wc).toBe("welcome , you have the access to create a contant ")

     })
     it('put order test' , async () =>{
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVoYWIxIiwicGFzc3dvcmQiOiIkMmIkMDUkNW1GYUFCM0JYNEFjRUlzMENReDdodWZ4T1VUZGQ2dGNEdmZLeUk4VEVKQ2RhM2svQ3NBWk8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgzMTcyOTF9.JfYUG3-Z3AtdSotZa9DxjDdieOQWTgyhGjCbq-Tdkyg'
          const res = await muke.put('/order').set('Authorization', `Basic ${token}`)
  
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).wc).toBe("welcome , you have the access to update a contant ")

     })
     it('delete order test' , async () =>{
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVoYWIxIiwicGFzc3dvcmQiOiIkMmIkMDUkNW1GYUFCM0JYNEFjRUlzMENReDdodWZ4T1VUZGQ2dGNEdmZLeUk4VEVKQ2RhM2svQ3NBWk8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgzMTcyOTF9.JfYUG3-Z3AtdSotZa9DxjDdieOQWTgyhGjCbq-Tdkyg'
          const res = await muke.delete('/order').set('Authorization', `Basic ${token}`)
  
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).wc).toBe("welcome , you have the access to delete a contant")

     })
     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVoYWIxIiwicGFzc3dvcmQiOiIkMmIkMDUkNW1GYUFCM0JYNEFjRUlzMENReDdodWZ4T1VUZGQ2dGNEdmZLeUk4VEVKQ2RhM2svQ3NBWk8iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODgzMTcyOTF9.JfYUG3-Z3AtdSotZa9DxjDdieOQWTgyhGjCbq-Tdkyg'


     // ===============================================================================================================


     it('get all clothes' ,async () =>{
          const res = await muke.get('/clothes').set('Authorization', `Basic ${token}`)
          console.log(JSON.parse(res.text));
          const list =     [
               {
                 id: 1,
                 name : 'pants' ,
                 externalId : 1
               }
             ]
          expect(JSON.parse(res.text).name).toBe(list.name)
     })
     it('post clothes' ,async () =>{
          const res = await muke.post('/clothes').set('Authorization', `Basic ${token}`).send({
               name : 'pants' ,
               externalId : 1
          })
          console.log(JSON.parse(res.text).name);
          expect(JSON.parse(res.text).name).toBe('pants')
     })
     it('post clothes 2' ,async () =>{
          const res = await muke.post('/clothes').set('Authorization', `Basic ${token}`).send({
               name : 'pants 2' ,
               externalId : 2
          })
          console.log(JSON.parse(res.text).name);
          expect(JSON.parse(res.text).name).toBe('pants 2')
     })
     it('get one clothe' ,async () =>{
          const res = await muke.get('/clothes/2').set('Authorization', `Basic ${token}`)
          console.log(JSON.parse(res.text).name);

          expect(JSON.parse(res.text).name).toBe('pants 2')
     })
    
     it('update Clothe' ,async () =>{
          const res = await muke.put('/clothes/1').set('Authorization', `Basic ${token}`).send({
               name : 'shirt',
               externalId : 3
          })
          console.log(JSON.parse(res.statusCode) , '77777777777777777777777');

          expect(res.statusCode).toBe(202)
     })

     it('delteteClothe' ,async () =>{
          const res = await muke.delete('/clothes/1').set('Authorization', `Basic ${token}`)
          

          expect(res.status).toBe(204)
     })


})