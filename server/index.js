require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

const app = express()
const ac = require("./controllers/authController")

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
  app.set("db", db)
  console.log(`They're going to kill us....`)
})

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

app.post(`/auth/register`, ac.register)

app.listen(SERVER_PORT, () => {
  console.log(`The Red Coats are Coming with ${SERVER_PORT} men!`)
})
