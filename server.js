const express = require("express");
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');

const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/public"));
// }

app.use(routes);

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/public/index.html"));
// });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, function () {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
