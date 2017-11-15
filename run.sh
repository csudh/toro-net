#!/bin/sh

curl -d "displayName=test4&email=test4@aol.com&username=test4user&password=Password1$&question1=New York&question2=Beef&question3=school" -X POST http://localhost:3000/users/register

curl -d "@data.json" -H "Content-Type:application/json" -X POST http://localhost:3000/posts/create

curl  http://localhost:3000/users/list/all

# Replace test with any keyword
curl  http://localhost:3000/users/list/test

