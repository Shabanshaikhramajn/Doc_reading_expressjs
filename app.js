import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './db/connectdb.js'
import web from './routes/web.js'
const app = express()
const port = process.env.PORT || '3000'

const DATABASE_URL  = process.env.DATABASE_URL

app.set('view engine','ejs')


app.use(express.urlencoded({extended:true}))


app.use('/',web)

//database connection

connectDB(DATABASE_URL)



app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)

})