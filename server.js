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
// function next(){
//     app.use("/",express.static(__dirname))
// }
// app.use((req,res)=>{
//     let host = req.header("host")
//     console.log(host)
//     // if(host === 'localhost'){
//     //     console.log(host)
//     //     return res.redirect(301,'http://www.google.com/'+req.originalUrl)
//     // }
//     console.log(host.split('lo')[0])
//     console.log(host.split('lo')[1])
//     return next()
// })

// app.get('/error',(req,res)=>{
//     res.render('404')
// })
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use('/',(req,res,next)=>{
    // console.log(req.originalUrl)
    console.log(req.headers.referer)
    let host = req.header("host")
    if(host.split('factory')[0]=='reward'){
        res.redirect(301,'http://www.rewardfactory.in'+req.originalUrl)
    }
    else{
        next()
    }
    
})
app.use("/",express.static(__dirname))
// app.get('*',(req,res)=>{    //should be kept just above the app.listen()
//     let host = req.header("host")
//     console.log(host.split('local')[1])
//     // if(host.split('local')[1]=='host'){
//     //     res.redirect(301,'http://rewardfactory.in')
//     // }

//     app.use("/",express.static(__dirname))
    
// })
const options = {
    key:'/etc/letsencrypt/live/rewardfactory.in/privkey.pem',
    cert:'/etc/letsencrypt/live/rewardfactory.in/cert.pem',
}
app.get('*',(req,res)=>{
    // console.log('Hello')
    res.status(404).render('404')
})

const httpServer = http.createServer(app)
const httpsServer = https.createServer(options,app)
httpsServer.listen(80, () => console.log("Server running on http://localhost:80"))
