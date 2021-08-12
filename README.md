# Youtube-clone
Project done by Yngesh Raman

# Heroku links--
(MongoDb) -->  https://pure-tor-19634.herokuapp.com/
(Postgres) -->  not available yet

# git repo url--
(Mongo version) --> https://github.com/attainu/Wenzio/tree/dev



# API DOCUMENTAION

# Sample inputs with existing data in database.
# Each route has brief explaination of what it does and expects as input
# sample inputs route links are already filled with an access token of some user which will get expired after 24h, kindly register a new user or login the existing one to get a fresh token to use in the urls as params
# inclosed in request.rest file for the execution of these reoutes.

###
//access token expires in 24h, so make a new user, or login to get a working token
POST https://pure-tor-19634.herokuapp.com/user/register
Content-Type: application/json

{
    "name": "user6",
    "email": "user6@email.com",
    "password": "user6"
}

###
//access token expires in 24h, so make a new user, or login to get a working token
POST https://pure-tor-19634.herokuapp.com/user/login
Content-Type: application/json

{
    "email": "user1@email.com",
    "password": "user1"
}

###
//sample route to see the registered users
GET https://pure-tor-19634.herokuapp.com/user/all

###
//takes user accesstoken as param for authenticating logout
DELETE https://pure-tor-19634.herokuapp.com/user/logout/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGQzN2IwMDE4Mjg4MTdmY2M4M2E0YSIsImlhdCI6MTU4NjQzMDI3MywiZXhwIjoxNTg2NTE2NjczfQ.p6LTTUSKYR_ULjbQS04u8A0MnJjc8h239F3HuBFKKyg

###
//browse all videos, no authentication compulsory
GET https://pure-tor-19634.herokuapp.com/video/allVideos

###
//watch a particular video, no authentication compulsory, takes videoId as params
GET https://pure-tor-19634.herokuapp.com/video/watchVideo/5e8f0a57ea79490734b740db

###
//uploading the video file, 
//**change filename="yourvideofile.mp4"(line-48)
//**change line-53 with your path to that video
POST https://pure-tor-19634.herokuapp.com/video/uploadFile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNmYwZmJjMTFjMDAxNzFmNTc4NSIsImlhdCI6MTU4NjUwMTM2MCwiZXhwIjoxNTg2NTg3NzYwfQ.Q4BznwF7_aqGpeOtbu4kviljDPZMckcY2kQ6fHBn-JI
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="Otter.mp4"
Content-Type: video/mp4

< C:\Users\Mucy\Desktop\Otter.mp4
------WebKitFormBoundary7MA4YWxkTrZu0gW--

###
//saving the video in mongodb atlas
//file path will be obtained from the previous route's response
POST https://pure-tor-19634.herokuapp.com/video/uploadVideo/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNmYwZmJjMTFjMDAxNzFmNTc4NSIsImlhdCI6MTU4NjUwMTM2MCwiZXhwIjoxNTg2NTg3NzYwfQ.Q4BznwF7_aqGpeOtbu4kviljDPZMckcY2kQ6fHBn-JI
Content-Type: application/json

{
	"owner": "5e9016f0fbc11c00171f5785",
	"filePath": "uploads/Otter.mp4_1586514149591",
    "title": "cute otter",
    "description": "cute otter description"
}

###
//fetching all the videos to whom the user subbed to
//hence need to give the logged in user's id and his accesstoken
POST https://pure-tor-19634.herokuapp.com/subscribe/allSubscribedVideos/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"fromUser": "5e8d390401828817fcc83a4b"
}

###
//fetching all the subscribers the user have
//hence need to give the logged in user's id as toUser and his accesstoken
POST https://pure-tor-19634.herokuapp.com/subscribe/allSubscribers/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"toUser": "5e8d37b001828817fcc83a4a"
}

###
//same as above, only this return the subcount
POST https://pure-tor-19634.herokuapp.com/subscribe/subsCount/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"toUser": "5e8d37b001828817fcc83a4a"
}

###
//the route checks whether the user has subbed or not, expects user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params
POST https://pure-tor-19634.herokuapp.com/subscribe/subscribed/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"toUser": "5e901431fbc11c00171f5783",
	"fromUser": "5e9016f0fbc11c00171f5785"
}

###
//for subscribing we need the logged in user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params
POST https://pure-tor-19634.herokuapp.com/subscribe/subscribe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"toUser": "5e901431fbc11c00171f5783",
	"fromUser": "5e9016f0fbc11c00171f5785"
}

###
//for unsubscribing we need the logged in user's id(fromUser) and video owner's id(toUser)
//and access token of logged in user as params
POST https://pure-tor-19634.herokuapp.com/subscribe/unsubscribe/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTAxNDMxZmJjMTFjMDAxNzFmNTc4MyIsImlhdCI6MTU4NjUwMDY1OSwiZXhwIjoxNTg2NTg3MDU5fQ.rHmSjyYFtXpGdAv18NDGyyxjA5NaCAjnXPFsvcIBU6A
Content-Type: application/json

{ 
	"toUser": "5e901431fbc11c00171f5783",
	"fromUser": "5e9016f0fbc11c00171f5785"
}

###
//getting all the comments on a video(videoId)
POST https://pure-tor-19634.herokuapp.com/comment/getComments
Content-Type: application/json

{ 
	"videoId": "5e8f0a57ea79490734b740db"	
}

###
//there will be two types of comment, 1. directly to the video, 2.reply to existing comments
//"writer" is logged in user's id, "responseTo" is user's id to which the reply is done
//omit "responseTo" if the comment is not a reply to a comment
//omit "videoId" if comment is a reply to a comment
//need logged in user's accesstoken as params
POST https://pure-tor-19634.herokuapp.com/comment/saveComment/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGYzNmRiZjQ5ZjMwMjMwMDY1YTQ1NiIsImlhdCI6MTU4NjUwOTk2MywiZXhwIjoxNTg2NTk2MzYzfQ.LYozLdLH_wT-RidMEFyXL-AwMOeu23DL5SGAbt7T0rY
Content-Type: application/json

{ 
	"content": "some new comment response",
	"writer": "5e8d390401828817fcc83a4b",
	"videoId": "5e8f0a57ea79490734b740db",
	"responseTo": "5e8f24abb882112790a106e4" 
}

###
//getting all the likes on a video or comment
//pass "videoId" or "commentId" as accordingly
POST https://pure-tor-19634.herokuapp.com/like/getLikes
Content-Type: application/json

{ 
	"videoId": "5e8f0a57ea79490734b740db"	
}

###
//getting all the dislikes on a video or comment
//pass "videoId" or "commentId" as accordingly
POST https://pure-tor-19634.herokuapp.com/like/getDislikes
Content-Type: application/json

{ 
	"videoId": "5e8f0a57ea79490734b740db"	
}


###
//liking a video or comment, "userId" and "videoId" or "commentId" as input
//give "commentId": "5e8f21d3c23c4029acba8669" in place of "videoId" if it's a like for a comment
//need logged in user access token as params
//this route will reduce dislike by one if the same user had disliked it earlier
POST https://pure-tor-19634.herokuapp.com/like/liked/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGYzNmRiZjQ5ZjMwMjMwMDY1YTQ1NiIsImlhdCI6MTU4NjUwOTk2MywiZXhwIjoxNTg2NTk2MzYzfQ.LYozLdLH_wT-RidMEFyXL-AwMOeu23DL5SGAbt7T0rY
Content-Type: application/json

{ 
    "userId": "5e8d390401828817fcc83a4b",
	"videoId": "5e8f0a57ea79490734b740db"
}

###
//disliking a video or comment, "userId" and "videoId" or "commentId" as input
//give "commentId": "5e8f21d3c23c4029acba8669" in place of "videoId" if it's a dislike for a comment
//need logged in user access token as params
//this route will reduce dislike by one if the same user had disliked it earlier
POST https://pure-tor-19634.herokuapp.com/like/disliked/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGYzNmRiZjQ5ZjMwMjMwMDY1YTQ1NiIsImlhdCI6MTU4NjUwOTk2MywiZXhwIjoxNTg2NTk2MzYzfQ.LYozLdLH_wT-RidMEFyXL-AwMOeu23DL5SGAbt7T0rY
Content-Type: application/json

{ 
    "userId": "5e8d390401828817fcc83a4b",
	"videoId": "5e8f0a57ea79490734b740db"
}

###
//unliking a video or comment, "userId" and "videoId" or "commentId" as input
//give "commentId": "5e8f21d3c23c4029acba8669" in place of "videoId" if it's a dislike for a comment
//need logged in user access token as params
//this route is for when liked already then clicked again to unlike
POST https://pure-tor-19634.herokuapp.com/like/unLiked/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGYzNmRiZjQ5ZjMwMjMwMDY1YTQ1NiIsImlhdCI6MTU4NjUwOTk2MywiZXhwIjoxNTg2NTk2MzYzfQ.LYozLdLH_wT-RidMEFyXL-AwMOeu23DL5SGAbt7T0rY
Content-Type: application/json

{ 
    "userId": "5e8d390401828817fcc83a4b",
	"videoId": "5e8f0a57ea79490734b740db"
}

###
//undisliking a video or comment, "userId" and "videoId" or "commentId" as input
//give "commentId": "5e8f21d3c23c4029acba8669" in place of "videoId" if it's a dislike for a comment
//need logged in user access token as params
//this route will reduce dislike by one if the same user had disliked it earlier
POST https://pure-tor-19634.herokuapp.com/like/unDisliked/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGYzNmRiZjQ5ZjMwMjMwMDY1YTQ1NiIsImlhdCI6MTU4NjUwOTk2MywiZXhwIjoxNTg2NTk2MzYzfQ.LYozLdLH_wT-RidMEFyXL-AwMOeu23DL5SGAbt7T0rY
Content-Type: application/json

{ 
    "userId": "5e8d390401828817fcc83a4b",
	"videoId": "5e8f0a57ea79490734b740db"
}

###




