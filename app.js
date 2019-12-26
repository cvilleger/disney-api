const https = require('https');
const ThemeParks = require("themeparks");
const DisneylandParisMagicKingdom = new ThemeParks.Parks.DisneylandParisMagicKingdom();
const DisneylandParisWaltDisneyStudios = new ThemeParks.Parks.DisneylandParisWaltDisneyStudios();

let rideTimesKingdom = null;
let rideTimesGlobal = null;
let rideTimesGlobalString = null;

const CheckWaitTimes = () => {
    DisneylandParisMagicKingdom.GetWaitTimes().then((rideTimes) => {
        rideTimesKingdom = rideTimes;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        DisneylandParisWaltDisneyStudios.GetWaitTimes().then((rideTimesStudios) => {
            rideTimesGlobal = rideTimesKingdom.concat(rideTimesStudios);
            rideTimesGlobalString = JSON.stringify(rideTimesGlobal);
        }).catch((error) => {
            console.error(error);
        });
        setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
    });
};

CheckWaitTimes();

https.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    if(req.url === '/') {
        res.write(rideTimesGlobalString); 
        res.end();
    }
    else { 
        res.write('WTF');  
        res.end();  
    }
}).listen(80, function() { 
    console.log("server start at port 80"); 
});
