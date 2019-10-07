var x = require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var param = combine();

switch(command) {
    case "concert-this":

      break;

    case "spotify-this-song":

      spotifySearch(param)

      break;

    case "movie-this":
      console.log("movie-this");
      break;

    case "do-what-it-says":
      console.log("do what it says");
      break;

    default:
      console.log("I don't recognize one or more of your commands, please try node liri spotify-this-song <song name> or another applicable command");
  }

  // loops through any present process arguments and joins them together in a string seperated by a hyphen
  function combine(){
    var array = []
    for (i=3;i<process.argv.length;i++) {
      array.push(process.argv[i]);
    }
    return array.join("-");
  }

  // search the spotify api by track
  function spotifySearch(search,){
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