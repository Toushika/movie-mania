var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at: ", host, port);
});

var mongoDbUrl = "mongodb://localhost:27017/movie";
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbUrl, { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var movieSchema = mongoose.Schema({
    movieName: String,
    directorName: String,
    releaseYear: String
});

var moviemodels = mongoose.model("moviemodels", movieSchema);

app.post("/saveMovie", function (req, res) {
    var movieInfo = {
        movieName: req.body.movieName,
        directorName: req.body.directorName,
        releaseYear: req.body.releaseYear
    }
    var movieInfoDataSchema = new moviemodels(movieInfo);
    movieInfoDataSchema.save(function(err){
        if(err)throw err;
        console.log("Data Saved!!");
       res.send("data has been saved");
    });
    console.log(JSON.stringify(movieInfoDataSchema))

});

app.get("/getMovie",function(req,res){
    moviemodels.find({},function(err,data){
       if(err)throw err;
       console.log(data);
       res.send(JSON.stringify(data));
    })

});

app.get("/getMovieInfo",function(req,res){
    moviemodels.find({movieName:'d'},function(err,data){
       if(err)throw err;
       console.log(data);
       res.send(data);
    })

});


app.delete("/deleteMovie",function(req,res){
    moviemodels.remove({movieName: 'hary porter'},function(err){
       if(err)throw err;
       res.send("movie has deleted");
       console.log("deleted");
    })

});

