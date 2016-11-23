/*
  Emneknagg backend:
  - Listen for GET requests with ?q=TERM,
  - Strip xss-stuff from q
  - Relay search to Twitter API
  - Respond with Twitter result
*/

var dotenv = require('dotenv');
var express = require('express');
var http = require('http');
var OAuth2 = require('oauth').OAuth2;
var process = require('process');
var request = require('request');
var util = require('util');
var url = require('url');

var TWITTER_API_SEARCH_URL = 'https://api.twitter.com/1.1/search/tweets.json';

/* Load stuff from .env */
dotenv.config({silent: true});

var oauth2 = new OAuth2(
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  'https://api.twitter.com/',
  null,
  'oauth2/token',
  null
);

function getTokenAndSearch(searchURL, onSuccess) {
  /* Get token */
  oauth2.getOAuthAccessToken(
    '',
    {'grant_type': 'client_credentials'},

    function (e, accessToken, refreshToken, results) {

      /* Search */
      request.get(
        searchURL,
        {'headers': {'Authorization': 'Bearer ' + accessToken}},
        onSuccess
      );
    }
  );
}

function corsMiddleware(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  next();
}

/* Express */
var app = express();
app.enable('trust proxy');
app.use(express.static(__dirname + '/dist'));
app.use(corsMiddleware);

/* Views */
app.get('/search', function(req, res) {
  var searchURL = TWITTER_API_SEARCH_URL + '?q=' + process.env.DEFAULT_SEARCH_TERM;

  if('q' in req.query) {
    searchURL = TWITTER_API_SEARCH_URL + req.url.replace('/search/', '').replace('/', '');
    util.log(util.inspect(req.query));
  }

  getTokenAndSearch(searchURL, function(err, res, body) {
      res.send(body);
  });

});

app.get('/time', function(req, res) {
  // ISO-8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
  res.send({now: new Date().toISOString()});
});

/* FIXME: Remove? */
app.get('/', function(req, res) { });

util.log('http://localhost:' + process.env.PORT);

app.listen(process.env.PORT);
