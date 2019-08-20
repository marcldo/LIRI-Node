# LIRI-Node
### Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 

The app takes the users command and query and calls one of three APIs (Bands in Town, Spotify, or OMDB) depending on the command given.  Additionally, it logs all commands run into a log.txt file. 

### To run this application:
* Clone repository to your local machine. 
* In the command line run npm install to install any dependancies
* Type the following command into the command line: 
* To search for a concert: node liri.js concert-this <artist/band name here>
* To search for a song: node liri.js spotify-this-song '<song name here>'
* To search for a movie: node liri.js movie-this '<movie name here>'
* node liri.js do-what-it-says will run a default song search

### Technologies used: 
* Node.js
* NPM packages: axios, moment.js
* APIs: node-spotify-api, Bands In Town, OMDB