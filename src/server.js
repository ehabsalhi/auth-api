const express = require("express")
const app = express()
const cors = require('cors')
const authRouter = require("./routes")
const router = require("./clothesRoutes")
require('dotenv').config()


app.use(cors())
app.use(express.json())


app.use(authRouter)
app.use(router)


function start(){
     app.listen(4001 , () => {
          console.log('up and roninng on port', 4001 )
     })
}


module.exports = {
     start,
     app
}