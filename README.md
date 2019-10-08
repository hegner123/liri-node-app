# Liri-node-app
## A command line application
Based off of siri, the liri node app is a convenient way to retrieve information from spotify, OMBD, and bands in town.

## Commands
the following commands can be proccessed by the Liri node app:

* `concert-this` : make a request to the bands in town api.
* `spotify-this-song` : search spotify for a song.
* `movie-this` : search the OMBD by movie title.
* `do-what-it-says` : read the text file random.txt and process it's content as commands.
* `help` : provides a list of available commands.

## Example Commands
The following are example commands that should be passed to the Liri node app in full.
* concert-this
```
node liri.js concert-this blink 182
```
* spotify-this-song
```
node liri.js spotify-this-song  first date
```
* movie-this
```
node liri.js movie-this the matrix
```
* do-what-it-says
```
node liri.js do-what-it-says
```
# Important
If you clone this repository you must include your own API keys.

You can create a .env file and insert your keys with the following format to easily incorperate your own keys.

```
# API keys

SPOTIFY_ID=yourclientid
SPOTIFY_SECRET=yourclientsecret
MOVIE_API=yourapikey
BAND_KEY=yourapikey
```
# Pull Requests

This project is for my coding bootcamp, and as such I will not be accepting any Pull Requests. Thank you for your understanding.
