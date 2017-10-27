// dependencies
var path = require("path");

// require in the friends data
var friendData = require("../data/friends.js");

module.exports = function(app) {

    // route for displaying all friends in JSON format
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        // console.log(req.body);

        // grab new user inputs
        var newInput = req.body.scores;
        var scoresArr = [];
        var friendCount = 0;
        var match = 0;

        // loop through all friends on the list
        for (var i = 0; i < friendData.length; i++) {
            var dif = 0;

            // loop through scores and compare
            for (var j = 0; j < newInput.length; j++) {
                dif =+ (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newInput[j])));
            }

            // push results to scoresArray
            scoresArr.push(dif);
        }

        // after comparing all, find match
        for (var i = 0; i < scoresArr.length; i++) {
            if (scoresArr[i] <= scoresArr[match]) {
                match = i;
            }
        }

        // return match
        var bestie = friendData[match];
        res.json(bestie);

        // push new submission to friendData array
        friendData.push(req.body);
    })
};
