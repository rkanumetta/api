'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();


restService.use(bodyParser.urlencoded({
    extended: true
}));


restService.use(bodyParser.json());

//Cloudant Credentials
var Cloudant = require('cloudant');
var me = 'rajesh92k'; // Set this to your own account
var password = 'rajesh.rajee';
var cloudant = Cloudant({
    account: me,
    password: password
});

/* database varaibles to access data */
var storing_Details = cloudant.db.use("storage");

var insertdetails=function(deatails, callback)
{
	var user_details=deatails;
	
	storing_Details.insert(user_details, function(err, body) {
		if(err)
		{
			callback({
                            'message': 'I was not able to process that request.',
                            'context': err
                        });
			
		}else{
			 callback({
                            'message': 'I was not able to process that request.',
                            'context': body
                        });
		}
		
	}); 
	
	
}

restService.post('/service', function(req, res) {
	//console.log(req.body.result.contexts[0].parameters.geo-state-us);
	//console.log(req.body.result.contexts[0].parameters.JSON.stringify(geo-state-us));
	
		console.log(req.body);
	console.log('results ');
	console.log(req.body.result);
	console.log('rsult with speech');
	console.log(req.body.result.fulfillment.speech);
	console.log('rsult with message');
	console.log(req.body.result.fulfillment.messages);
	console.log('parameters');
	console.log(req.body.result.contexts[0].parameters);
	//console.log(req.body.result.parameters.echoText);
	
	insertdetails(req.body.result.contexts[0].parameters, function(response) {
        //res.json(response);
 if(response){
			var speech; 
			return res.json({
			speech: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your deatails are stored in our database',
			displayText: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your deatails are stored in our database',
			source: 'Miracle Innovation Labs'
		                    });
		    }else{
			var speech; 
			return res.json({
			speech: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
			displayText: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
			source: 'Miracle Innovation Labs'
						   });
		}
    });
	
	
   /*  var speech; 
    return res.json({
      speech: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
        displayText: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
        source: 'Miracle Innovation Labs'
    }); */
});

restService.post('/echo', function(req, res) {
	//console.log(req.body.result.contexts[0].parameters.geo-state-us);
	//console.log(req.body.result.contexts[0].parameters.JSON.stringify(geo-state-us));
	console.log(req.body.result);
	console.log(req.body.result.contexts[0].parameters);
	//console.log(req.body.result.parameters.echoText);
    var speech; 
    return res.json({
      speech: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
        displayText: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' members on ' +req.body.result.contexts[0].parameters.date+ ' and your hotel address is that 2 Lexington Ave, New York, NY 10010, USAPhone: +1 212-920-3300',
        source: 'Miracle Innovation Labs'
    });
});

restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
