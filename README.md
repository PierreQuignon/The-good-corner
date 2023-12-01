to start working :

The first time, copy the variables of.env.sample to a .env file and set it

commands on dev :

docker compose -f docker-compose.yml up --build

command to run the docker-compose.prod.yml for production:

docker compose -f docker-compose.prod.yml up --build
