#!/usr/bin/env node
const express = require('express')

const path = require('path')

const  { getDirectoryItems, isDirectory, renderContent } = require('./utils')

const CWD = process.cwd();

const app = express()
app.set("view engine", "hbs");

app.get("/", function(request, response){
    renderContent(CWD, response);
    
});

app.use("/content", function(request, response){
    const queryPath = request.query.path;

    renderContent(queryPath, response);
});

app.listen(3000)

console.log("server started");


