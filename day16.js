const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

function connectToMongoDB() {
    mongoose.connect('mongodb://localhost:27017/').then(() => {
        console.log('Successfully connected to MongoDB')
    }).catch((err) => {
        console.log('Error connection to MongoDB!')
    })
    }

app.get('/', (req, res) => {
    res.json({"status":"up and running!"})
})

connectToMongoDB();

app.listen(port, (err) => {
    if(!err)
        console.log('Server running on port: ', port);
})