To start working :

git clone of the project

npm install separately in frontend and backend folders

Make sure there's an .env file in the backend folder and .env and .env.sample files in the project root. Set the variables (drive)

To start the project :

Open the Docker Desktop application

docker compose -f docker-compose.yml up --build

Backend start on port 5000 and frontend on port 3000

To kill the project :

Open a new terminal tab and run: docker ps

Run the command followed by the id of all docker images: docker kill 16548484 684848 8448485
