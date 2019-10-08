var x = require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var movie = keys.movieKey;

var command = process.argv[2];
var param = combine();

switch(command) {
    case "concert-this":
      console.log("concert-this")
      break;

    case "spotify-this-song":
      spotifySearch(param)

      break;

    case "movie-this":
      movieSearch(param);
      break;

    case "do-what-it-says":
      readFile();
      break;

    default:
      console.log("I don't recognize one or more of your commands, please try node liri spotify-this-song <song name> or another applicable command");
  };

  // loops through any present process arguments and joins them together in a string seperated by a hyphen
  function combine(){
    var array = []
    for (i=3;i<process.argv.length;i++) {
      array.push(process.argv[i]);
    }
    return array.join("+");
  }

  // search the spotify api by track
  function spotifySearch(search){
    spotify.search({ type: 'track', query: search }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      };
    var songArtist = data.tracks.items[0].album.artists[0].name;
    var songName = data.tracks.items[0].name;
    var songLink = data.tracks.items[0].external_urls.spotify;
    var songAlbum = data.tracks.items[0].album.name;
    console.log("Artist: " + songArtist);
    console.log("Song Name: " + songName);
    console.log("Song Preview: " + songLink);
    console.log("Album: " + songAlbum);
    });
  };


  function movieSearch(param){
  var url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + param ;
  axios({
    method: 'get',
    url: url,
  })
    .then(function (response) {
      var movieTitle = response.data.Title;
      var movieYear = response.data.Year;
      var movieRatingImdb = response.data.Ratings[0].Value;
      var movieRatingRt = response.data.Ratings[1].Value
      var movieCountry = response.data.Country;
      var movieLanguage = response.data.Language;
      var moviePlot = response.data.Plot;
      var movieActors = response.data.Actors;
      console.log('Title: ' + movieTitle);
      console.log('Year: ' + movieYear);
      console.log('IMBD Rating: ' + movieRatingImdb);
      console.log('Rotten Tomatoes Rating: ' + movieRatingRt);
      console.log('Country: ' + movieCountry);
      console.log('Language: ' + movieLanguage);
      console.log('Plot: ' + moviePlot);
      console.log('Actors: ' + movieActors);
      }).catch(function (error) {
        console.log(error);
      });
    };



function readFile (){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    var param = dataArr[0]
    var dataSearch = dataArr[1]

    switch(param) {
      case "concert-this":
        console.log("concert-this")
        break;

      case "spotify-this-song":
        spotifySearch(dataSearch)

        break;

      case "movie-this":
        movieSearch(dataSearch);
        break;

      default:
        console.log("I don't recognize one or more of your commands, please try node liri spotify-this-song <song name> or another applicable command");
    }
  });
}
