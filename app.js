'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var speech; 

//Body paser instilization
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


/* database varaibles to access data and database name */
var storing_Details = cloudant.db.use("storage");


/* //recived function for insertdetails
var insertdetails=function(user_details, callback)
{
		storing_Details.insert(user_details, function(err, body) {
		if(err)
		{
			  callback({
                       'message': 'I was not able to process that request.',
                       'context': err
                      });
			
		}else{
			  callback({
                        'message': 'I was able to process that request.',
                        'context': body
                      });
			 }
	}); 	
} */


//Api cration
restService.post('/service', function(req, res) {
	console.log('entire req log')
	console.log(req);
	console.log('entire req log')
	console.log(req.body);
	console.log('entire req log')
	console.log(req.body.result);
	console.log('entire action log')
	console.log(req.body.result.action);
	if(req.body.result.action == 'forward')
	{
		    return res.json({
			speech: req.body.result.fulfillment.speech,
			displayText: req.body.result.fulfillment.messages,
			data:req.body.result.fulfillment.messages,
			contextOut: req.body.result.contexts,
			source: "Miracle Inovation Labs"
			 });
		
	}else {
		console.log()
		
		
	}
	/* //calling function for storing deatails into cloudant
	insertdetails(req.body.result.contexts[0].parameters, function(response) {
 if(response){
	 
			var speech; 				
			return res.json({
			speech: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ ' and your details are stored in our database',
			displayText: 'Great! booking your stay at ' +req.body.result.contexts[0].parameters.hotel+ ' Hotel for ' +req.body.result.contexts[0].parameters.number+ '  and your deatails are stored in our database',
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
    }); */
	 
});


//server listen on 8000
restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
