require("dotenv").config();
const fs = require('fs');
const keys = require('./keys');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

//user inputs
const command = process.argv[2];
const query = process.argv.slice(3).join(" ");


search(command, query);

function search(command, query) {
    switch (command) {
        case "concert-this":
            concert(query);
            break;
        case "spotify-this-song":
            spotifyThisSong(query);
            break;
        case "movie-this":
            movie(query);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("Command Not Found, Try concert-this, spotify-this-song, movie-this, do-what-it-says")
    }
};

// concert-this
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")


function concert(query) {
    //add error handling
    let concertLink = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    axios.get(concertLink).then(response => {
        if (response.data.length != 0) {
            console.log(`
            ${query.toUpperCase()} 
            is playing at: ${response.data[0].venue.name}, ${response.data[0].venue.city}, ${response.data[0].venue.region} 
            on: ${moment(response.data[0].datetime).format('MM/DD/YYYY')}`);
        }
        else {
            console.log("No Concert Found, Try Another Artist");
        }

    }).catch(error => {
        console.error(`Oops! there was an error ${error}`);
    });

};

// spotify-this-song
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong(searchTerm) {
    if (searchTerm === '') {
        var childProc = require('child_process');
        childProc.exec('open -a "Google Chrome" https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        return;
    }
    else {
        spotify.search({ type: 'track', query: searchTerm, limit: 1 }).then(response => {

            // print all artist(s) 
            for (let artist in response.tracks.items[0].artists) {
                console.log(response.tracks.items[0].artists[artist].name)
            }
            console.log(`Song Name: ${response.tracks.items[0].name}`);
            console.log(`Spotify Link: ${response.tracks.items[0].external_urls.spotify}`);
            console.log(`Album: ${response.tracks.items[0].album.name}`);

        }).catch(error => {
            console.error(`Oops! there was an error ${error}`);
        });
    }
}


// movie-this
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.


function movie(query) {

    if (query === '') {
        query = 'Mr. Nobody.';
    }


    axios.get(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`).then(response => {
        if (response.data.Response === 'False') {
            console.log(response.data.Error)
        }
        else {
            console.log(response);
            console.log(`Title: ${response.data.Title}`);
            console.log(`Year of Release: ${response.data.Year}`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);

            //check if rotten tomatoes rating exists
            if (response.data.Ratings.length > 2) {
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`)
            }
            else { console.log("Rotten Tomatoes Rating: N/A") };

            console.log(`Country Produced: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        }
    }).catch(error => {
        console.error(`Oops! there was an error ${error}`);
    });;
};

// do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.

function doIt() {
    fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) { console.error(err) };

        let fileContents = data.split(",");

        let command = fileContents[0]
        let query = fileContents[1];
        search(command, query);
    });
};
