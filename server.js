const express = require('express')
const app = express()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
function next(){
    app.use("/",express.static(__dirname))
}
app.use((req,res)=>{
    let host = req.get('Host')
    // console.log(host)
    if(host === 'rewardfactory.in'){
        console.log(host)
        return res.redirect(301,'http://www.rewardfactory.in/'+req.originalUrl)
    }
    return next()
})

app.listen(80, () => console.log("Server running on http://localhost:80"))
