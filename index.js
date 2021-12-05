#!/usr/bin/env node
const express = require('express')

const  { getContent } = require('./utils')

const app = express()
app.set("view engine", "hbs");

app.use("/", function(request, response){
    let filepath = request.query.path;

    if (filepath === undefined) {
        filepath = process.cwd();
    }

    (async () => {
        const contentInHTML = await getContent(filepath);
        response.send(contentInHTML);
    })();
});

app.listen(3000)

console.log("server started");


