const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

require('dotenv').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_ATLAS;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongo database connection established successfully");
})

const imageRouter = require('./routes/image');
app.use('/image', imageRouter);

app.listen(port, () => 
  {console.log(`Server is running on port: ${port}`);}
);