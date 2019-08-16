require("dotenv").config();
const keys = require('./keys');
const axios = require('axios');
const moment = require('moment');
// const spotify = new Spotify(keys.spotify);

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
            console.log("do it");
            break;
    }
};

function concert(query) {
    //add error handling
    let concertLink = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    axios.get(concertLink).then((response) => {
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
        console.error(error);
    });

}


// spotify-this-song
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

function movie(query) {

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

// do-what-it-says

