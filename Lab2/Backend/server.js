const express = require('express');
const app = express();
const port = 3000;

//GET request for city data
app.get('/:city', (req, res) => {

    //Get city data from JSON
    const data=require('../sample.json');

    //Find city
    let target = null;
    data.forEach((city) => {
        if(city.cityName == req.params.city) {
            target = city;
        }
    });

    //City not found
    if(target == null) {
        res.status(404).send("City not found!");
        console.log("Invalid city: " + req.params.city);
    }//City found
    else {
        res.send(target);
        console.log("City found: " + req.params.city);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});