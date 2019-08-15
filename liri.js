require("dotenv").config();
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const query = process.argv[3];

console.log(command);
console.log(query);

// concert-this
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// spotify-this-song
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

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

