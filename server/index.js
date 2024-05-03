const connectToMongoose = require("./db/db");
const express = require("express");
const cors = require("cors");
const fetchuser=require('./middleware/fetchuser')

const app = express();
const port = process.env.PORT || 5000; //changes the port so because react  also run at 3000

app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectToMongoose()
  .then(() => {
    // Start your server or perform other tasks that require MongoDB connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

//Available routes
app.use("/api/auth", require("./controllers/UserController"));
app.use("/api/servauth", require("./controllers/ServiceProviderController"));
app.use("/api/incidents", fetchuser,require("./controllers/incidents"));
app.use("/api/assistance",fetchuser,require("./controllers/assistanceRequest"))


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
