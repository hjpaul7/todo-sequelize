require("dotenv").config();
const Express = require("express");
const db = require("./db");

const app = Express();

// Import middlewares as a bundle
const middlewares = require("./middlewares");

// Import controllers as a bundle
const controllers = require("./controllers");

// Parse the body of all requests as JSON
app.use(Express.json());

// Controller Routes
app.use("/user", controllers.User);

// Protected Routes using Middleware
app.use("/list", middlewares.ValidateJWT, controllers.ToDo);
app.use("/item", middlewares.ValidateJWT, controllers.Item);

// Base route to show that the app is working
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the ToDoApp api!",
  });
});

// Startup procedure
// Sequelize will attempt to connect via the authenticate method
// It will then synchronize the models with the database.
// After the previous processes have successfully completed, the app will mount to the localhost socket
db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(8080, () => {
      console.log(`[server]: App is listening on localhost:8080`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
