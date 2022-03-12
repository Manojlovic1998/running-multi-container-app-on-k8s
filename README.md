# :whale: Integration of Multi Container React App using Docker

This is Docker example project of multi-container application. A topic of the project is a very basic implementation of fib function to calculate the fib value.

## :office: Local Development Container Diagram

- Simple diagram of intercommunication between different container application instances.
  ![Diagram preview of intercommunication between applications](/assets/diagrams/docker-fib-calc.drawio.png)

## :pencil: Applications Writeup

### **Client React App**

Client is a frontend Fibonacci index number value calculator application. It is built with the help of React technology. It's main purpose is to facilitate user input action where the data from the input is sent to the server (api). It also is fetching the data from the api on page load with the help of axios library.

**Low Fidelity Wireframe:**

- ![Diagram preview of app functionality and sections data origin](/assets/diagrams/client-low-fid.drawio.png)

**High Fidelity Wireframes:**

- Bootstrap: Extra large > 1200px
  ![Desktop preview of client application UI](/assets/wireframes/bootstrap-extra-large-1200px.png)

- Bootstrap: Extra small < 576px
  <br>
  ![Mobile preview of client application UI](/assets/wireframes/bootstrap-extra-small-576px.png)

**Features:**

- [x] Home page
- [x] Form for index input
- [ ] Navigation bar with custom logo
- [x] Section containing seen indexes and calculated index values
- [ ] Responsive design
- [x] Api calls to ExpressJS api app.

### **Server/API ExpressJS App**

The Express server serves as api layer that communicates with Redis and Postgres and passes information to the React app from them.

**Express api diagram:**

- ![Diagram preview of express app functionality and services it fetches data from to server back to react app](/assets/diagrams/express-diagram.drawio.png)

**Express Routes Description:**

- `domain/` is a test route that was used to test connection to the app during early development.
- `domain/values/all` queries and sends back all of the data from Postgres db instance. GET
- `domain/values/current` queries and sends back all of the values from Redis instance. GET
- `domain/values` receives users submitted data, checks if index is within worker limit to prevent bottleneck, sets a placeholder data in Redis instance, and creates a channel over which it sends the index value that worker picks up to do the calculation. POST

**Features:**

- [x] Test route.
- [x] Route to query and send back data from Postgres.
- [x] Route to query and send back data from Redis.
- [x] Route to receive, validate and record user submitted data.

### **Worker app**

Worker instance listens to Redis **_instance_** channel. **\*Instance** channel is established by Express `domain/values` route. There the publisher sends index via channel message. Worker picks up the message (index) and uses the following algorithm to find the number at the given index in Fibonacci Sequence.

**Simple Algorithm**

```javascript
// Basic solution to fib number
// Takes index and returns its value
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}
```

### **Nginx**

Nginx is used to enforce routing. It routes the incoming request traffic to the appropriate application. The `/api/` prefix to request url is used as a way to distinguish between request for Express and the request for the React server.

**Nginx Default Config**

```
upstream client {
    server client:3000;
}

upstream api {
    server api:5000;
}

server {
    listen 80;

    location / {
        proxy_pass http://client;
    }

    location /ws {
        proxy_pass http://client;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api {
        rewrite /api/(.*) /$1 break;
        proxy_pass http://api;
    }
}
```

**Nginx proxy diagram**
![Nginx diagram preview showcasing request routes](/assets/diagrams/nginx-proxy-diagram.png)

## :bulb: Technologies

**Technologies used:**
<br>
![Nginx Icon](/assets/technologies/nginx.png)
![Docker Icon](/assets/technologies/docker.png)
![React Icon](/assets/technologies/react.png)
![Redis Icon](/assets/technologies/redis.png)
![Express Icon](/assets/technologies/expressjs.png)
![Postgresql Icon](/assets/technologies/postgresql.png)
![Nodemon Icon](/assets/technologies/nodemon.png)
![Axios Icon](/assets/technologies/axios.png)
![Bootstrap Icon](/assets/technologies/bootstrap.png)
![Figma Icon](/assets/technologies/figma.png)
