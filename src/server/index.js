require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// Configuration
// ================================================================================================
const db = process.env.DB || "mongodb://localhost:27017/numismatters";
const port = process.env.PORT || 80;
const isProd = process.env.NODE_ENV !== 'development';
const outDir = path.resolve(__dirname, '../../build');

console.log("SERVER: " + JSON.stringify({db, port, outDir, isProd}));

// Set up Mongoose
mongoose.connect(db, error => {
  // Todo handle errors gracefully (log and restart)
  if(error) {
    console.log("Mongo Error: " + error.message);
    process.exit(0);
  }
});
mongoose.Promise = global.Promise;

// Set up Express server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes
require('./routes')(app);

// We use webpack dev server to serve content in development
if(isProd) {
  if(fs.existsSync(outDir)) {
    // Serve static content
    app.use(express.static(outDir));

    // Unhandled routes just return index - routing is done client side
    const index = path.join(outDir, 'index.html');
    app.use(function (req, res) {
      res.sendFile(index);
    });
  } else {
    console.log(`Failed to find build directory: ${outDir}`);
    process.exit(0);
  }
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    process.exit(0);
  } else {
    console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
  }
});

module.exports = app;
