var request = require('request');
var token = "token " + process.env.GTOKEN;
var urlRoot = "https://github.ncsu.edu/api/v3";

/*
Takes in github ID of developer and returns the star-index i.e. If the star-index of a developer is s, then he/she has
s repositories with at least s stars while the remaining repositories have less than s stars.
*/
function getStarIndexRepos(userId)
{
	var options = {
		url: urlRoot + "/users/" + userId + "/repos",
		method: "GET",
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
  			"Authorization": token
		} ,
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		stars = [];

		//Get all stars values of all the repositories of the developer
		for( var i = 0; i < obj.length; i++ )
		{
			stars.push(obj[i].stargazers_count);
		}

		//Sort in descending order
		stars.sort(function(a, b){
			return b - a;
		});

		//Calculate star-index
		for( var i = 1; i <= stars.length; i++ )
		{
			if( i >= stars[i - 1] )
			{
				return i;
			} 
		}
	});
}

exports.getStarIndexRepos = getStarIndexRepos;