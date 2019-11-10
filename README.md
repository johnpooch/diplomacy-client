# diplomacy-client

A client for [@johnpooch](https://github.com/johnpooch)'s Diplomacy service: https://github.com/johnpooch/diplomacy


## Setting up a development environment
- Install Docker (see https://docs.docker.com/install/)
- Clone repo and enter directory
- `docker-compose up --build`
- Go to http://localhost:8082/
- `Note: 8082 is the port used by Docker, which points to port 8081, a proxy for a Webpack dev server on port 8080`

# Running the test(s)
- `docker exec -it diplomacy-client_diplomacy.client_1 bash`
- `yarn test`
