#!/usr/bin/env node
const express = require('express')

const  { getDirectoryItems, isDirectory } = require('./utils')

const app = express()
app.set("view engine", "hbs");

app.get("/", function(request, response){
    const CWD = process.cwd();
    
    (async (filepath) => {
        if (isDirectory(filepath)) {
            const directoryContent = await getDirectoryItems(filepath);
            response.render("index.hbs", {
                directoryContentVisible: true,
                directoryContent: directoryContent,
            });
        }
    })(CWD);
});

app.use("/about", function(request, response){
    let userName = request.query.name;
    response.send("<h1>Информация</h1><p>" + userName + "</p>");
});

app.listen(3000)

console.log("server started");


