require('dotenv').config();
const Express = require('express');
const db = require('./db');

const app = Express();
const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(Express.json());

// Controller Routes
app.use('/user', controllers.User);

// Injecting middleware
app.use('/todo', middlewares.ValidateJWT, controllers.ToDo);
app.get('/test', (req, res) => {
  console.log(req.user);
  res.json({
    message: 'Made it'
  });
});

// Startup procedure
db.authenticate()
  .then(() => db.sync())
  .then(() => app.listen(8080, () => {
    console.log(`[server]: App is listening on localhost:8080`);
  }))
  .catch((e) => {
    console.log('[server]: Server Crashed');
  })
