const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to mongoDB database
const dbURL = "mongodb://localhost:27017/meetSCU";
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
    console.log("Database Connected")
})
.catch((err) => {
    console.log("Database Connection Error");
    console.log(err);
})

app.get('/', (req, res) => {
    res.send("Hello from Meet SCU!");
});

// google oauth
app.post('/auth/google', (req, res) => {
    
});


const server = app.listen(3000, () => {
    console.log("Server is listening at http://%s:%s", server.address().address, server.address().port);
});