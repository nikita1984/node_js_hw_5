#!/usr/bin/env node
const express = require('express')

const path = require('path')

const  { getDirectoryItems, isDirectory, getContent } = require('./utils')

const CWD = process.cwd();

const app = express()
app.set("view engine", "hbs");

app.get("/", function(request, response){
    (async () => {
        const directoryContentHTML = await getContent(CWD);
        response.send(directoryContentHTML);
    })();
});

app.use("/content", function(request, response){
    const queryPath = request.query.path;
    (async () => {
        const directoryContentHTML = await getContent(queryPath);
        response.send(directoryContentHTML);
    })();
});

app.listen(3000)

console.log("server started");


