var request = require('request');
var token = require('./secrets');
var fs = require('fs');
var https = require('https');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, body) {
    // parse the JSON string into an object and pass this object
    //(an array of contributor objects) to the callback function.
    var parse = JSON.parse(body);
    cb(err, parse);
  });
}

// callback function
getRepoContributors("jquery", "jquery", function(err, result) {
   for (var i = 0; i < result.length; i++) {
    console.log(result[i]["avatar_url"]);

  };
  console.log("Errors:", err);
  console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))

}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")




