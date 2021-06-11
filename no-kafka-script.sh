#!/bin/bash
echo "Adding patents to blockchain"
for i in {1..5}
do
   echo "Adding patent $i"
   curl -H "Content-Type: application/json" --request POST --data '{"description":"Patent '$i'", "sender":"'$1'"}' http://localhost:8000/patent
done