const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple blogs CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Norbert Ishimwe",
          url: "web.com",
          email: "ishimwe96@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
      
      
    },
   // apis: ["./routes/*.js"],
    apis: ['userRoutes.js', 'postRoutes.js', 'messageRoutes.js'],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,  { explorer: true })
  );
 // console.log(process.env.PORT)

  // Start the Express server
 app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
