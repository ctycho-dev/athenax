
git restore .
git pull origin main

docker build . -t athenax

docker-compose down

docker-compose up -d