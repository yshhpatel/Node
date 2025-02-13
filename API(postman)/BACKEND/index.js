const express = require('express');
const app = express();
const port = 3010;
const db = require('./config/db');
const route = require('./route/route');
const cors = require('cors');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use('/', route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});