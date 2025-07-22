const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001
const cors = require('cors');
app.use(cors());


mongoose.connect("mongodb+srv://bjjacome1:brayan024680@veterinaria.cwmkznu.mongodb.net/?retryWrites=true&w=majority&appName=Veterinaria", {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("System connected to MongoDb Database"));

app.use(express.json());

const dogRoutes = require("./routes/dogRoutes");

app.use("/veterinary", dogRoutes);



app.listen(port, () => 
    console.log("MY Computer Store Server is running on port ---> " + port)
);
