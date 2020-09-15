# ToDo Express/Sequelize Application

## Startup Procedure

1. `npm install` or `yarn install`
2. Create a database in postgres called `todotest`
3. Create a `.env` file with these environment variables:

| Environment Variable | Example                                                |
| -------------------- | ------------------------------------------------------ |
| DB_CONNECTION_STRING | `postgres://<user>:<password>@localhost:5432/todotest` |
| JWT_SECRET           | `superSecretKey123`                                    |
