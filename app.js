const express = require("express");
const cors = require("cors");


require("./lib/connectMongoose");

const app = express();

app.locals.JWT_SECRET = "glitter";

app.use(express.json());

app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/glits", require("./routes/glits"));
app.use("/users", require("./routes/users"));
app.use(express.static("./public"));

app.listen(3000, () => console.log("Glitter is listening in 3000"));

module.exports = app;
