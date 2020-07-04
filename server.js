const express = require('express')
const { runInNewContext } = require('vm')
const { fstat } = require('fs')
const app = express()
const fs = require('fs')
const http = require('http')
const https = require('https')
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',(req,res,next)=>{
    // console.log(req.originalUrl)
    // console.log(req.headers.referer)
    let host = req.header("host")
    if(host.split('reward')[0]=='www.'){
        res.redirect(301,'https://rewardfactory.in'+req.originalUrl)
    }
    else{
        next()
    }
    
})
app.use("/",express.static(__dirname))

const options = {
    key = fs.readFileSync('/etc/letsencrypt/live/rewardfactory.in/privkey.pem','utf8'),
    cert = fs.readFileSync('/etc/letsencrypt/live/rewardfactory.in/cert.pem','utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/rewardfactory.in/chain.pem','utf8')
}
app.get('*',(req,res)=>{
    res.status(404).render('404')
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(options,app)
httpServer.listen(80, () => console.log("Server running on http://localhost:80"))
httpsServer.listen(443, () => console.log("Server running on http://localhost:80"))