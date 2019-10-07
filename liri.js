var x = require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');





var spotify = new Spotify(keys.spotify);



var command = process.argv[2];
var param = combine();



switch(command) {
    case "concert-this":
      test(command, param);
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
      console.log("default");

  }



  function test (a,b){
    console.log(a + " " + b);
  }

  function combine(){
    var array = []
    for (i=3;i<process.argv.length;i++) {
      array.push(process.argv[i]);
    }
    return array.join("-");
  }

  function spotifySearch(a,b){
    spotify.search({ type: 'track', query: a }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
var songArtist = data.tracks.items[0].album.artists[0].name
var songName = data.tracks.items[0].name
var songLink = data.tracks.items[0].external_urls.spotify
var songAlbum = data.tracks.items[0].album.name
    console.log(songArtist);
    console.log(songName);
    console.log(songLink);
    console.log(songAlbum)
    });
  }