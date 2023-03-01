const express = require("express");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
// const Cookies = require("cookies");
const app = express();
const port = 5000
const User = require("./models/user-model");
// const database = require('./config/database');
const midelwares = require('./midelwares/midelwares');

// app.use((req, res, next) => {
//     req.cookies = new Cookies(req, res);
//     req.userInfo = {};
//     if (req.cookies.get("userInfo")) {
//         req.userInfo = JSON.parse(req.cookies.get("userInfo"));
//         User.findById(req.userInfo.userid).then((user) => {
//             req.userInfo.isadmin = user.isadmin;
//             next();
//         });
//     } else {
//         next();
//     }
// });

app.use(midelwares);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })) 

app.use("/public", express.static(path.join(__dirname, "/public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/", require("./routes/main.js"));
app.use("/api", require("./routes/api.js"));
app.use("/admin", require("./routes/admin.js"));

// const port =  process.env.PORT || 4000 

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const mongoose = require("mongoose");
 
mongoose
  .connect(
    "mongodb+srv://alihassan:c4a@cluster0.offav6.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Example app listening at http://localhost:5000");
    });
  })
 
  .catch((err) => {
    console.log(err);
  }); 