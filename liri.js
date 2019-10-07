var x = require("dotenv").config();
var keys = require("./keys.js");

var spotify = keys.spotify;

console.log(spotify)

var command = process.argv[2];
var param = combine();

console.log(param);

switch(command) {
    case "concert-this":
      test(command, param);
      break;

    case "spotify-this-song":
      console.log("spotify-this-song");
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
    return array.join(" ");
  }