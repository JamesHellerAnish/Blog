const express = require('express')
const app = express()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// function next(){
//     app.use("/",express.static(__dirname))
// }
// app.use((req,res)=>{
//     let host = req.get('Host')
//     console.log(host)
//     if(host === 'localhost'){
//         console.log(host)
//         return res.redirect(301,'http://www.google.com/'+req.originalUrl)
//     }
//     return next()
// })
app.use("/",express.static(__dirname))
// app.get('/error',(req,res)=>{
//     res.render('404')
// })
app.get('*',(req,res)=>{    //should be kept just above the app.listen()
    res.status(404).render('404')
})

app.listen(80, () => console.log("Server running on http://localhost:80"))
