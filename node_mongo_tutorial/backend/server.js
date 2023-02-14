const express = require("express");
const dotenv = require("dotenv").config();
const colors = require('colors')
//const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const request = require('supertest')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors')
const options = require('../docs/apidoc')

connectDB()
const app = express();

  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );


//app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.use(errorHandler)
app.use(cors())
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app