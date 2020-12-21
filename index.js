const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const connectStore = require("connect-mongo");
const path = require("path");
// routes
const auth = require("./routes/auth");
const employee = require("./routes/employee");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("MongoDB connected");
    const app = express();
    const MongoStore = connectStore(session);

    app.disable("x-powered-by");
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // File uploading
    // app.use(fileupload());
    app.use(
      session({
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "session",
          ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
        }),
        cookie: {
          sameSite: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: parseInt(process.env.SESS_LIFETIME),
        },
      })
    );

    app.use("/api/auth", auth);
    app.use("/api/employee", employee);

    // REACT CLIENT
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });

    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
})();
