const express = require("express");
const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'willgod',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

const helpers = require('./utils/helpers');
const { truncate } = require("./models/Post");
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
        });