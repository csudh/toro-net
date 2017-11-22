#!/bin/sh

	

	#		#
	# CRUD - Users	#
	#		#

# Create User
# curl -d "displayName=<dn>&email=<em>&username=<un>&password=<Abb#?>&question1=<Answer>&question2=<Answer>&question3=<Answer>" -X POST http://localhost:3000/users/register
curl -d "displayName=Team Backend&email=backend@aol.com&username=teamBackend&password=Password1$&question1=New York&question2=Beef&question3=School" -X POST http://localhost:3000/users/register

# Users - List all Users
curl  http://localhost:3000/users/list/all



	#		#
	# CRUD - Posts	#
	#		#

# Posts - Creat a Post
# curl -d "user=test4@aol.com&title=Exam01&body=FirstExamination" -X POST http://localhost:3000/posts/create/
curl -d "user=test4@aol.com&title=Exam01&body=FirstExamination" -X POST http://localhost:3000/posts/create/

# Posts - Update a Post
# curl -d "title=back-end team&body=Hey, backend team" -X PUT http://localhost:3000/posts/update/post=<post_id>
	# Example: updating a post with id = 5a1230f3363cb00e8a2d97ec 
	curl -d "title=back-end team&body=Hey, backend team" -X PUT http://localhost:3000/posts/update/5a1230f3363cb00e8a2d97ec

# Posts - List Single Post
Curl http://localhost:3000/posts/<Post_Id>
	# Example 
	curl http://localhost:3000/posts/5a1230f3363cb00e8a2d97ec

# Posts - List All Posts Based on keyword 
# curl  http://localhost:3000/posts/list/<keyword>
curl  http://localhost:3000/posts/list/test

# Posts - Delete Single Post
# curl http://127.0.0.1:3000/posts/delete/<Post_Id>
curl http://127.0.0.1:3000/posts/delete/5a0fad944c658e1e0ec4ad2f

# Posts - Delete Multiple Post
# curl -d '{  "deleteIds" : ["<Post_Id-1>","<Post_Id-2>",...] }' -H "Content-Type: application/json" -X POST http://127.0.0.1:3000/posts/deleteMany
curl -d '{  "deleteIds" : ["5a157e113902060f1a2e5368","5a157e123902060f1a2e5369"] }' -H "Content-Type: application/json" -X POST http://127.0.0.1:3000/posts/deleteMany









