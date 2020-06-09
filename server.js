const express = require('express')
const app = express()

app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/",express.static(__dirname))


app.listen(80, () => console.log("Server running on http://localhost:80"))
