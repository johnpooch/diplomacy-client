# diplomacy-client

## Setting up a development environment
- Install Docker (see https://docs.docker.com/install/)
- Clone repo and `cd` into directory
- Run `docker-compose up --build`
- Go to http://localhost:8082/
- `Note: 8082 is the port used by Docker, which points to port 8081, a proxy for a Webpack dev server on port 8080`
