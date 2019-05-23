require("dotenv").config();
var axios = require("axios");
//var keys = require("./keys.js");
var fs = require('fs');
//var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);
var moment = require('moment');


var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function bandsInTown() {
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp&date=upcoming").then(
    function (response) {
      for (var i = 0; i < 5; i++) {
        console.log("The venue: " + response.data[i].venue.name);
        console.log("\n");
        console.log("the city for the venue is " + response.data[i].venue.city);
        console.log("\n");
        console.log(response.data[i].datetime);
        console.log("\n");

      }
    }
  );
}

function OMDBmovie(){
axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
  function (response) {
    //console.log(response.data.Ratings);
    console.log("\n");
    console.log("The Title of the movie is " + response.data.Title);
    console.log("\n");
    console.log("The movie came out in " + response.data.Released);
    console.log("\n");
    console.log("This movie was rated on imdb, a " + response.data.imdbRating);
    console.log("\n");
    if (response.data.Ratings && response.data.Ratings[1] && response.data.Ratings[1].Source === 'Rotten Tomatoes') {
      console.log('Rotten Tomatoes rating: ' + response.data.Ratings[1].Value);
    } else {
      console.log('Rotten Tomatoes rating does not exist for some reason. Don\'t ask me why!');
    }
    console.log("\n");
    console.log("This movie was produced in the good old " + response.data.Country);
    console.log("\n");
    console.log("The spoken language in the movie is " + response.data.Language);
    console.log("\n");
    console.log("The humans that brought it to life were " + response.data.Actors);
    console.log("\n");
    console.log("The movie is about " + response.data.Plot);
    console.log("\n");
  }
);
}
 


//  if (userInput === undefined) {
// //   axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(function (response) {
// //     console.log(response.data);
// //   });
// }


function spotifySong() {
  spotify.search({ type: "track", query: userInput }, function (err, data) {
    if (err) {
      return console.log("error accured: " + err);
    }

    console.log("artist " + data.tracks.items[0].artist[0].name);

  }
  );
}

function getRandom() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);

  });
}

fs.appendFile("random.txt", ", " + action + " " + userInput, function (err) {

  if (err) {
    console.log(err);
  } else {
    console.log("added to random.txt");
  }

});


switch (action) {

  case "concert-this":
    bandsInTown();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    OMDBmovie();
    break;

  case "do-what-it-says":
    getRandom();
    break;

  default:
    console.log('Invalid input. Accepted inputs are: concert-this <band here>, spotify-this-song <song here>, movie-this <movie here>, or do-what-it-says');
    break;

}
