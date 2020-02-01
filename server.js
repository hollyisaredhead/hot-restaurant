//Dependencies
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Variables to store reservations and waitlist
var tables = [];
var waitlist = [];

//Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"))
});

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"))
});

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"))
});


//Displays reservations
app.get("/api/tables", (req, res) => {
    return res.json(tables);
});

//Displays waitlist
app.get("/api/waitlist", (req, res) => {
    return res.json(waitlist);
});

//Post reservations
app.post("/api/tables", (req, res) => {
    var newReservation = req.body;

    var name = newReservation.name;

    //If current name is already in table array, don't add the user again
    for (let i = 0; i < tables.length; i++) {
        if (name === tables[i].name)
            return res.json(true);
    }

    //If current name is already in waitlist array, don't add the user again
    for (let j = 0; j < waitlist.length; j++) {
        if (name === waitlist[j].name)
            return res.json(true);
    }

    //If current name is not in table or waitlist array, add the user to the corresponding array
    if (tables.length < 5) {
        tables.push(newReservation);
    }
    else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});

//Starts the server
app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});