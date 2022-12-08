#!/bin/bash
#variables 

IMAGES_URL="https://i0.wp.com/nosnerds.com.br/wp-content/uploads/2020/05/robocop.png"
BACKGROUND_URL="https://images.hdqwalls.com/wallpapers/apocalypse-art-4k-ma.jpg"

# Exec

curl "http://localhost:3000/join-images?img=$IMAGES_URL&background=$BACKGROUND_URL"

autocannon --readerStatusCodes -c 500 "http://localhost:3000/join-images?img=$IMAGES_URL&background=$BACKGROUND_URL"
