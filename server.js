const express = require("express");
const path = require("path");

// create server app at port 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Allows the app to be able to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listens for user input
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});