#!/usr/bin/env node
const express = require('express')
const app = express()

app.set("view engine", "hbs");
 
app.use("/", function(request, response){
    
    const directoryContent = ["gavgav@mycorp.com", "mioaw@mycorp.com", "nikita@mail.ru"];

    response.render("index.hbs", {
        directoryContentVisible: true,
        directoryContent: directoryContent,
    });
});

app.listen(3000)