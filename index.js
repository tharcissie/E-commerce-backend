const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
//const db = require('./queries')
const cors = require('cors');
const db = require('./database/config/database');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors("*"));

app.use('/', require('./routes/routes'));

db.sync().then(() => {
    app.listen(port, console.log(`Server started on port ${port}`));
}).catch(err => console.log("Error: " + err));





 