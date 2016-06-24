#!/bin/sh
set -e

function parse {

    # area=$(echo $line | cut -d',' -f 1)
    # shopName=$(echo $line | cut -d',' -f 2)
    # lat=$(echo $line | cut -d',' -f 3)
    # long=$(echo $line | cut -d',' -f 4) 
    # shopAddress=$(echo $line | cut -d',' -f 5)
    # discount=$(echo $line | cut -d',' -f 6)
    # discountBanner=$(echo $line | cut -d',' -f 7)

    area=${ADDR[0]}
    shopName=${ADDR[1]}
    lat=${ADDR[2]}
    long=${ADDR[3]} 
    shopAddress=${ADDR[4]}
    discount=${ADDR[5]}
    discountBanner=${ADDR[6]}
    likes=7
    JSON="{\"latitude\": $lat, \"longitude\": $long, \"info\": {\"shopName\": \"$shopName\", \"shopAddress\": \"$shopAddress\", \"discount\": \"$discount\", \"discountBanner\": \"$discountBanner\", \"likes\": $likes}}"
    # echo $JSON
    echo $lat
    echo $long
    # sleep 5
    # curl -H "Content-Type: application/json" -H "token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3NmNlZWIxZjg3YWEzYWYxNzllMjM0MyIsImVtYWlsIjoiQVZhcmFkZUB3aGl0ZWhlZGdlLmNvbSIsIm5hbWUiOiJhZG1pbiIsImFkbWluIjp0cnVlLCJpYXQiOjE0NjY3NTc1ODQsImV4cCI6MTQ2Njc4NjM4NH0.k6trgq5aKN6IxSTbThyH1uD6N4puFDF0JLzLxO8NTcM" -X POST http://localhost:3000/tags/add -d "$JSON"
}
filename="$1"
while read -r line
do
    # echo "$line"
    IFS=',' read -ra ADDR <<< "$line"
    # for i in "${ADDR[@]}"; do
    #    echo $i
    # done
    area="${ADDR[0]}"
    shopName="${ADDR[1]}"
    lat=${ADDR[2]}
    long=${ADDR[3]} 
    shopAddress=${ADDR[4]}
    discount=${ADDR[5]}
    # db=${ADDR[6]}
    db="Great Offer"
    likes=7
    JSON="{\"latitude\": $lat, \"longitude\": $long, \"info\": {\"shopName\": \"$shopName\", \"shopAddress\": \"$shopAddress\", \"discount\": \"$discount\", \"discountBanner\": \"$db\", \"likes\": $likes}}"
    echo $JSON
    sleep 5
    curl -H "Content-Type: application/json" -H "token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3NmNlZWIxZjg3YWEzYWYxNzllMjM0MyIsImVtYWlsIjoiQVZhcmFkZUB3aGl0ZWhlZGdlLmNvbSIsIm5hbWUiOiJhZG1pbiIsImFkbWluIjp0cnVlLCJpYXQiOjE0NjY3OTAzOTAsImV4cCI6MTQ2NjgxOTE5MH0.HUdpsK8HjNf9QOnIb36kzBps7RhBgcNETWPYVvF3dc0" -X POST http://localhost:3000/tags/add -d "$JSON"
    # parse $line
done < "$filename"