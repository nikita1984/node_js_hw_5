#!/usr/bin/env node
const express = require('express')

const  { getDirectoryItems, isDirectory } = require('./utils')

const app = express()
app.set("view engine", "hbs");

app.use("/", function(request, response){
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

app.listen(3000)

console.log("server started");


