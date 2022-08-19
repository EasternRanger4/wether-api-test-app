console.log("Server is online")
console.log("Startup prosses is staring now")

const { request, response } = require("express");
const express = require("express");
const Datastore = require("nedb");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config();

const app = express();
app.listen(3000, () => console.log("Listening into 3000"));
app.use(express.static("public")); 
app.use(express.json());

const database = new Datastore("data/database.db");
database.loadDatabase();
database.insert ("Server Refresh");

("Start up prosess ended\n")
app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
    //response.json({ test: 123})
});

let Counter1 = 0;
app.post("/api", async(request, response) => {
    console.log("\nI have a request!");
    const data = request.body;
    console.log(`User Session: ${Counter1}`)
    console.log(`Got Clinet Data`)
    const api_key = process.env.API_KEY;
    console.log("Required API Keys")

    const wether_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.lat}%2C%20${data.lon}?unitGroup=metric&key=${api_key}&contentType=json`;
    const wether_responce = await fetch(wether_url);
    const weatherjson = await wether_responce.json();
    
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${data.lat},${data.lon}`;
    const aq_responce = await fetch(aq_url);
    const aqjson = await aq_responce.json();
    
    console.log(`Got External Data`)

    const modData = {
        SessionNumber: Counter1,
        ClinetName: data.name,
        Lat: data.lat,
        Lon: data.lon,
        Time: data.timestamp,
        CurentTemp: weatherjson.currentConditions.feelslike,
        AirQal: "NoData"
    };
    console.log(data);
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert (modData);
    response.json(modData);
    Counter1++;
});

app.get("/weather", async (request, response) => {
    const api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/51.6389859%2C%20-0.0746159?unitGroup=metric&key=CEMX3TQXMBDNFES85W5ZHCUG4&contentType=json`;
    const fetch_responce = await fetch(api_url);
    const json = await fetch_responce.json();
   response.json(json);
});
