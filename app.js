const express = require("express");
const https = require("https");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    //res.send("up")
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.emailAddress;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/f511efc9bas";
    const options = {
        method: "POST",
        auth: "user:" + process.env.MAILCHIMP_API,
    };

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (d) => {
            const data = JSON.parse(d);
            console.log(data);
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res)=>{
  res.redirect("/")
})

app.listen(3000, () => {
    console.log("server is running");
});

