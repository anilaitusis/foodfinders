// Imports
const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const { Console } = require('console')


const app = express()
const server = http.createServer(app)

//Static folder: folder the server is going to serve to the client, where all the game files are
app.use(express.static(path.join(__dirname, "public")))

// Start Server
// if we run on the dev server, any changes to the server while it is running will be automatically changed
// due to Nodemon
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`))