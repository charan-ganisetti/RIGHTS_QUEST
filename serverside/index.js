const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/routes.js"); // Corrected file extension

const app = express();
const url = "mongodb+srv://20pa1a0542:joEIRIOLUJ8x3AhO@cluster0.qzf412q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors()); // Correct usage of cors middleware
app.use(express.json());

mongoose.connect(url)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((e) => {
        console.log(e);
    });


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

//routes
app.use('/api', route);

