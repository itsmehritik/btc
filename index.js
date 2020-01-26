const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var crypto = req.body.crypto;
    var flat = req.body.flat;
    var amount = req.body.amount;
    // var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global?";

    var Options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: flat,
            amount: amount,
        }
    }
    request(Options, function (error, response, body) {
        var data = JSON.parse(body);
        var price = data.price;
        var currentTime = data.time;

        res.write("<p> Current date is " + currentTime + "</P>");
        res.write("<h1> The price of " + amount + crypto + " in " + flat + " is " + price + "</h1>");
        res.send();
    });

})

app.listen("3000", function () {
    console.log("server is started on port 3000");
});