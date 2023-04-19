const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
// routes
const itemRoutes = require("./routes/routes");
const multer  = require('multer');

const app = express();
const port = 3002;


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
require('./routes/image_routes')(app);

app.use("/blogs", itemRoutes);

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});