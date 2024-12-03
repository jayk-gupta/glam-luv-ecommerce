const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
})