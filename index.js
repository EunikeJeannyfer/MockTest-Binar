const express = require("express");
const app = express();
const port = 5000;
const routers = require('./router')

const path = require('path')

const swaggerJSON = require('./apiDocummentation.json')
const swaggerUI = require('swagger-ui-express')

app.use(express.json())
app.use(express.urlencoded({ extended:false })) //req.body untuk form dataa


app.set("view engine", "ejs") //register sbg view engine flash
app.set("views", path.join(__dirname, './view'))
app.use(routers)

app.get('/', (req, res) => res.send('Hello, berikut adalah mock test binar CDP'))
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});