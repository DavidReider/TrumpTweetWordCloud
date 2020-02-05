// Node.js is used to run this code. First a node is created with packages to use JS and JSON.
// TwitterOAuth is a library that is useful when using twitter api with js
// package.json and package-lock.json are from the node i created for this

console.log('The bot is starting'); //just some output to see that the code has begun

var Twit = require('twit'); // twit is from TwitterOAuth, it begins the requests from twitter api using the keys below

var config = require('./config');
var T = new Twit(config);
const fs = require('fs');

//Twit get request using the twitter api call for statuses from the user timeline. Given parameters defined above
//and returns with gotData which is a function that returns error messages, the data and response
T.get("statuses/user_timeline", {screen_name: 'realDonaldTrump', count: 200, exclude_replies: true, include_rts: false, tweet_mode: 'extended'}, function(err, data, response) {
  var tweets = data; // this creates a variable that stores all of the data for a tweet from the timeline
  for (var i=0; i<tweets.length;i++){ // the for loop cycles through all of the tweets that are collected from the timeline
    console.log(tweets[i].text);
    fs.appendFileSync('Output.txt', tweets[i].full_text + '\n', (err) => {
      // In case of a error throw err.
      if (err) throw err;
    })
  }
  // Get the id of the last tweet
  var last_id = data[data.length-1].id-1;
  // Submit another request using the last_id
  T.get("statuses/user_timeline", {screen_name: 'realDonaldTrump', count: 200, max_id: last_id, exclude_replies: true, include_rts: false, tweet_mode:'extended'}, function(err, cont_data, response) {
    var cont_tweets = cont_data;
    for (var i=0; i<cont_tweets.length;i++){ // the for loop cycles through all of the tweets that are collected from the timeline
      fs.appendFileSync('Output.txt', cont_tweets[i].full_text + '\n', (err) => {
        // In case of a error throw err.
        if (err) throw err;
      })
    }
  })
})
