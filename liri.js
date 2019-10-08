var x = require("dotenv").config();
var moment = require('moment');
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var movie = keys.movieKey.movieKey;
var bandKey = keys.bandKey.bandKey;

var command = process.argv[2];
var param = combine();

switch(command) {
    case "concert-this":
      bandSearch(param)
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

    case "help":
      console.log("Available commands: ")
      console.log('concert-this')
      console.log('spotify-this-song')
      console.log('movie-this')
      console.log('do-what-it-says')
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

  //  search the bands in town api
  function bandSearch(param){
    var search = "blink+182"
    if (param){
      search = param
    }
    var url = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandKey
    axios({
      method: 'get',
      url: url,
    })
      .then(function (response) {
        var concertVenueName = 'Venue Name: ' + response.data[0].venue.name;
        var concertVenueCity = response.data[0].venue.city;
        var concertVenueState = response.data[0].venue.region;
        var concertCityState = 'Venue Location: ' + concertVenueCity + " " + concertVenueState;
        var concertLineup = 'Lineup: ' + response.data[0].lineup[0];
        var date = "Concert Date: " + moment(response.data[0].datetime).format('M,D,YYYY');
        var logString = "\n " + concertLineup + "\n " + concertVenueName + "\n " + concertCityState + "\n " + date + "\n "
        console.log(concertLineup);
        console.log(concertVenueName);
        console.log(concertCityState);
        console.log(date);
        logData(logString);
        }).catch(function (error) {
          console.log(error);
        });
      };

  // search the spotify api by track
  function spotifySearch(param){
    var search = 'The Sign'
    if (param){
      search = param
    };
    spotify.search({ type: 'track', query: search }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      };
    var songArtist = "Artist: " + data.tracks.items[0].album.artists[0].name;
    var songName = "Song Name: " + data.tracks.items[0].name;
    var songLink = "Song Preview: " + data.tracks.items[0].external_urls.spotify;
    var songAlbum = "Album: " + data.tracks.items[0].album.name;
    var logString = "\n " + songArtist + '\n' + songName + '\n' + songLink + '\n' + songAlbum + '\n'
    console.log(songArtist);
    console.log(songName);
    console.log(songLink);
    console.log(songAlbum);
    logData(logString);
    });
  };

  // search the OMBD api
  function movieSearch(param){
    var search = "Mr.+Nobody"
    if (param){
      search = param
    };
  var url = 'http://www.omdbapi.com/?apikey=' + movie +'&t=' + search ;
  axios({
    method: 'get',
    url: url,
  })
    .then(function (response) {
      logData("\n");
      var movieTitle = 'Title: ' + response.data.Title;
      var movieYear = 'Year: ' + response.data.Year;
      var movieRatingImdb = 'IMBD Rating: ' + response.data.Ratings[0].Value;
      var movieRatingRt ='Rotten Tomatoes Rating: ' +  response.data.Ratings[1].Value
      var movieCountry = 'Country: ' + response.data.Country;
      var movieLanguage = 'Language: ' + response.data.Language;
      var moviePlot = 'Plot: ' + response.data.Plot;
      var movieActors = 'Actors: ' + response.data.Actors;
      var logString = '\n ' + movieTitle + "\n" + movieYear + "\n" + movieRatingImdb + "\n" + movieRatingRt + "\n" + movieCountry + "\n" + movieLanguage + "\n" + moviePlot + "\n" + movieActors + "\n"
      console.log(movieTitle);
      console.log(movieYear);
      console.log(movieRatingImdb);
      console.log(movieRatingRt);
      console.log(movieCountry);
      console.log(movieLanguage);
      console.log(moviePlot);
      console.log(movieActors);
      logData(logString);
      }).catch(function (error) {
        console.log(error);
      });
    };

    //  run the search function based off of whats written in the random txt file
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
            bandSearch(dataSearch)
          break;

        case "spotify-this-song":
          spotifySearch(dataSearch)
          break;

        case "movie-this":
          movieSearch(dataSearch);
          break;

        case "help":
          console.log("Available commands: ")
          console.log('concert-this')
          console.log('spotify-this-song')
          console.log('movie-this')
          console.log('do-what-it-says')

        default:
          console.log("I don't recognize one or more of your commands, please try node liri spotify-this-song <song name> or another applicable command");
      };
    });
  };

  function logData(data){
    fs.appendFile("log.txt", data, function(err) {
      if (err) {
        console.log(err);
      };
    });
  }
