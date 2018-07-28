require("dotenv").config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");
var user = process.argv[2];


switch (user) {
    case "my-tweets":
        getTweets();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        pickAMovie();
        break;

    case "do-what-it-says":
        dwis();
        break;
}
// console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");
var receiver = process.argv[3];
// 	

//SPOTIFY
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

function spotify() {


Spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 else {
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview Here: " + data.tracks.items[0].preview_url);
}
 
console.log(JSON.stringify(data)); 
});
}
//TWITTER
// function getTweets() {
    var keys = new Twitter ({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

// function getTweets() {
    var params = {screen_name: 'maayyuu1', count: 20};
keys.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(JSON.stringify(tweets));
  }
  for (var i = 0; i < tweets.length; i++) {
    //   const element = array[i];
    console.log("___________________________________________");
    console.log("Tweeted on: " + tweets[i].created_at);
    console.log(tweets[i].text);
  }
});
// }

// function pickAMovie() {
    
    var findAMovie
    if (receiver === undefined)
    this.findShow = function(show) {
      var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;
  
      request(URL, function(err, response, body) {
        // parse the response body (string) to a JSON object
        var jsonData = JSON.parse(body);
  
        // showData ends up being the string containing the show data we will print to the console
        var showData = [
          "Movie: " + jsonData.movie,
          "year: " + jsonData.genres.year,
          "IMDB Rating: " + jsonData.rating.imdb,
          "Rotten Tomatoes Rating: " + jsonData.network.rottontomatoes,
          "Country: " + jsonData.country,
          "Language: " + jsonData.language,
          "Plot: " + jsonData.plot,
          "Actors: " + jsonData.actors
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function(err) {
          if (err) throw err;
          console.log(showData);
        });
      });
    // }}
    };
