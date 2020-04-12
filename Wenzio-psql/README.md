# wenzio(Youtube-clone)

# Heroku links--
(Postgres) -->  https://wenziopostgres.herokuapp.com
-
# git repo url--

(Postgresql vwersion)-->https://github.com/Divya-sen-au6/Wenzio/tree/Divya-Wenzio-PostgreSql
------------------------------------------------------------------------------

# Elephant SQL Credentials
HOST = ahufjvcr(host)
USER = ahufjvcr(user)
PASS = zlSU8FcckapUog5G9wZwgJGCA6_1P2je(password)

------------------------------------------------------------------------------

# API DOCUMENTAION
___________________

# Sample inputs with existing data in database.
# Each route has brief explaination of what it does and what it expects as an input.
# sample inputs route links are already filled with an access token of some user which will get expired after 24h, kindly register a new user or login the existing one to get a fresh token to use in the urls as params for accessing the authenticated routes.
# inclosed in request.rest file for the execution of these reoutes.
==============================================================================
?
###
//access token expires in 24h, so make a new user, or login to get a working token
POST https://wenziopostgres.herokuapp.com/user/register
Content-Type: application/json

 {
     "user_email": "sendivyajyoti@gmail.com",
     "user_name" :"Divya",
     "user_password": "123456"
 }
------------------------------------------------------------------------------
?
###
//access token expires in 24h, so make a new user, or login to get a working token

{
     "user_email": "divyajyoti@gmail.com",
     "user_name" :"Divya",
     "user_password": "123456"
 }




###
//takes user accesstoken as param for authenticating logout
DELETE https://wenziopostgres.herokuapp.com/user/logout

 Content-Type: application/json

------------------------------------------------------------------------------
?
###
//browse all videos, no authentication compulsory
GET https://wenziopostgres.herokuapp.com/video/allVideos

------------------------------------------------------------------------------
?
###
//watch a particular video, no authentication compulsory, takes videoId as params
###
//Upload a  video, by using POSTMAN

POST https://wenziopostgres.herokuapp.com/video/uploadVideo

#browse all videos, no authentication compulsory
###
GET https://wenziopostgres.herokuapp.com/video/allVideos
###
//watch a particular video, no authentication compulsory, takes videoId as params
GET https://pure-tor-19634.herokuapp.com/video/watchVideo/

videoId

///fetching all the videos to whom the user subbed to
//hence need to give the logged in user's id and his accesstoken
###
POST https://pure-tor-19634.herokuapp.com/subscribe/allSubscribedVideos/(HIS ACCESSTOKEN)
Content-Type: application/json
​
{ 
	"fromUser": ""
}

###
POST https://pure-tor-19634.herokuapp.com/subscribe/allSubscribers

Content-Type: application/json
​
{ 
	"toUser": ""
}
-

//same as above, only this return the subcount
###
POST https://pure-tor-19634.herokuapp.com/subscribe/subsCount
Content-Type: application/json
​
{ 
	"toUser": ""
}

//the route checks whether the user has subbed or not, expects user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params

###
POST https://pure-tor-19634.herokuapp.com/subscribe/subscribed

Content-Type: application/json
​
{ 
	"toUser": "",
	"fromUser": ""
}

////for subscribing we need the logged in user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params

###
POST https://pure-tor-19634.herokuapp.com/subscribe/subscribe

{ 
	"toUser": "",
	"fromUser": ""
}


//for subscribing we need the logged in user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params

{ 
	"toUser": "",
	"fromUser": ""
}

//for unsubscribing we need the logged in user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params

{

###
POST https://pure-tor-19634.herokuapp.com/subscribe/unsubscribe


{ 
	"toUser": "",
	"fromUser": ""
}

//comments
//there will be two types of comment, 1. directly to the video, 2.reply to existing comments
//"writer" is logged in user's id, "responseTo" is user's id to which the reply is done
//omit "responseTo" if the comment is not a reply to a comment
//omit "videoId" if comment is a reply to a comment
//need logged in user's accesstoken as params

###
POST https://pure-tor-19634.herokuapp.com/comment/saveComment
Content-Type: application/json
​
{ 
	"content": "some new comment response",
	"writer": "",
	"videoId": "",
	"responseTo": "" 
}

###
GET https://pure-tor-19634.herokuapp.com/comment/getComments

Content-Type: application/json
​
{ 
	"videoId": ""	
}

//getting all the likes on a video or comment
//pass "videoId" or "commentId" as accordingly
//likes
###
POST https://pure-tor-19634.herokuapp.com/like/getLikes

Content-Type: application/json
​
{ 
	"videoId": ""	
}

//liking a video or comment, "userId" and "videoId" or "commentId" as input
//give "commentId": "5e8f21d3c23c4029acba8669" in place of "videoId" if it's a like for a comment
//need logged in user access token as params
//this route will reduce dislike by one if the same user had disliked it earlier


###
POST https://pure-tor-19634.herokuapp.com/like/liked
Content-Type: application/json
​
{ 
    "userId": "",
	"videoId": ""
}



#takes user accesstoken as param for authenticating logout

 ###
 
DELETE https://wenziopostgres.herokuapp.com/user/logout

 Content-Type: application/json


