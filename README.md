# MERN-boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation
- [pm2](https://pm2.io) for running and deploying the server


## Requirements

- [Node.js](https://nodejs.org/en/) 8+
- [MongoDB](https://www.mongodb.com/)
- [pm2](https://pm2.io)

```shell
npm install
npm install --global pm2@2.10.4
```


## Running

A [dotenv](https://www.npmjs.com/package/dotenv) file is used to configure application secrets and build mode (development | production).

To use [dotenv](https://www.npmjs.com/package/dotenv) simply copy `.env.example`, and rename it `.env`.

---

To compile the code for production, ensure NODE_ENV is set to `"production"` in the `.env` file.

Run in production mode:

```shell
npm start
```

In Production mode Express serves the front-end as well as the API under the same port.

---

To compile the code for development, ensure NODE_ENV is set to `"development"` in `.env` file.

Development (Webpack dev server) mode:

```shell
npm run dev
```

In development mode the Express server only serves API routes, and is automatically restarted if any files changes under `src/server` directory change. The React front-end is served from a webpack-dev-server with HMR (hot module replacement) enabled.

The front-end runs on port 8080: http://localhost:8080

The back-end runs on port 80: http://localhost:80


