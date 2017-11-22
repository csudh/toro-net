#!/bin/sh

curl -d "displayName=test4&email=test4@aol.com&username=test4user&password=Password1$&question1=New York&question2=Beef&question3=school" -X POST http://localhost:3000/users/register

curl -d "@data.json" -H "Content-Type:application/json" -X POST http://localhost:3000/posts/create

curl  http://localhost:3000/users/list/all

# Replace test with any keyword
curl  http://localhost:3000/users/list/test

# Add/Creat Posts for Testing
curl -d "user=test4@aol.com&title=Exam01&body=FirstExamination" -X POST http://localhost:3000/posts/create/

curl -d "user=test4@aol.com&title=Exam02&body=SecondMidtermExam" -X POST http://localhost:3000/posts/create/

curl -d "user=test4@aol.com&title=Exam03&body=ThirdQuizCSC583" -X POST http://localhost:3000/posts/create/

curl -d "user=test4@aol.com&title=Exam04&body=FourthExamcsc501finalexam" -X POST http://localhost:3000/posts/create/

curl -d "user=test4@aol.com&title=Post005&body=FifthExamcsc501finalexam" -X POST http://localhost:3000/posts/create/

curl -d "user=test4@aol.com&title=Post006&body=sixthexamcsc501finalexam" -X POST http://localhost:3000/posts/create/

# List all Posts Based on Keyword Search Example #
curl http://localhost:3000/posts/list/exam
#delete a user

curl http://localhost:3000/users/delete/5a126c7393770c43532a476d

# read a user #
curl http://localhost:3000/users/5a126bd993770c43532a476c




