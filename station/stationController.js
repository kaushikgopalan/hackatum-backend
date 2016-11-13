var Station = require('./stationSchema');
var exec = require('child_process').exec;


exports.getAllLines = function(req, res){
    var lines = ["S1","S2","S3","S4","S7","U1","U2","U3","U4","U5","U6"];
    // Station.find().distinct("line",function(err, lines) {
    //     if (err) {
    //         res.status(500).send(err);
    //         return;
    //     }
    // });
    res.statusCode= 200;
    res.json(lines);
};

exports.getStationById = function(req, res){
    Station.find({id: req.params.station_id }, function(err, station) {
        if (err) {
            console.log(errorForStack);
            res.status(500).send(err);
            return;
        }
        res.json(station);
    });

};

exports.putStation = function(req, res){
    console.log("You put some station");
};

exports.getStationByName = function(req, res){

    Station.find({name: req.params.station_name }, function(err, station) {
        if (err) {
            console.log(errorForStack);
            res.status(500).send(err);
            return;
        }
        res.statusCode = 200;
        res.json(station);
    });
};

exports.getStationByLine = function(req, res){
    Station.find({line: req.params.line_id}, function(err, station) {
        if (err) {
            console.log(errorForStack);
            res.status(500).send(err);
            return;
        }
        res.statusCode = 200;
        res.json(station);
    });
};

exports.getLiveData = function(req, res){

    var command = "mvg_json " + req.params.station_name;

    // console.log(command);
    var output; 
    exec(command, function (error, stdout, stderr) {
       console.log(stdout);
       console.log(stderr);
       //output = stdout;
       res.send(stdout);
    });

     res.statusCode = 200;
     //res = output; 
};

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};