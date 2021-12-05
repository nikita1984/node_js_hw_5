#!/usr/bin/env node
const express = require('express')

const path = require('path')

const  { getDirectoryItems, isDirectory } = require('./utils')

const CWD = process.cwd();

const app = express()
app.set("view engine", "hbs");

app.get("/", function(request, response){
    
    (async (filepath) => {
        if (isDirectory(filepath)) {
            const directoryItems = await getDirectoryItems(filepath);

            const directoryContentArray = [];

            for (item of directoryItems){
                let templateString = `<p>
                    <a href="/content?path=${path.join(filepath, item)}">${item}</a>
                </p>`

                directoryContentArray.push(templateString);
            }
            
            const directoryContentHTML = directoryContentArray.join('<br>');

            response.send(directoryContentHTML);
        }
    })(CWD);
});

app.use("/content", function(request, response){
    const queryPath = request.query.path;


    (async (filepath) => {
        if (isDirectory(filepath)) {
            const directoryItems = await getDirectoryItems(filepath);

            const directoryContentArray = [];

            for (item of directoryItems){
                let templateString = `<p>
                    <a href="/content?path=${path.join(filepath, item)}">${item}</a>
                </p>`

                directoryContentArray.push(templateString);
            }
            
            const directoryContentHTML = directoryContentArray.join('<br>');

            response.send(directoryContentHTML);
        }
    })(queryPath);

});

app.listen(3000)

console.log("server started");


