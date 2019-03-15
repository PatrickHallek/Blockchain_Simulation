# Simple Blockchain Simulation

This is a simplified simulation of how a blockchain works. The Dashboard was made with the [Akveo ngx-admin template](https://github.com/akveo/ngx-admin).

## Installation with Docker (recommended)

Clone the repository:

```cmd
git clone https://github.com/PatrickHallek/Blockchain_Simulation
```

Run project with [docker](https://www.docker.com/) to not need to install all dependencies.

```cmd
docker-compose up --build
```

## Installation on your local machine

Clone the repository:

```cmd
git clone https://github.com/PatrickHallek/Blockchain_Simulation
```

Install all [node](https://nodejs.org/en/) packages for the Angular frontend:

```cmd
npm install
```

Install all [node](https://nodejs.org/en/) packages for the Node.js backend:

```cmd
npm install ./backend
```

Start the frontend (running on port 4200):

```cmd
npm start
```

Start the backend (running on port 3000):

```cmd
npm start ./backend
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
