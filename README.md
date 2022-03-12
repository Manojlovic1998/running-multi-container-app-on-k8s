# :whale: Integration of React App using Docker

This is Docker example project of multi-container application. A topic of the project is a very basic implementation of fib function to calculate the fib value.

## :office: Local Development Container Diagram

- Simple diagram of intercommunication between different container application instances.
  ![Diagram preview of intercommunication between applications](/assets/diagrams/docker-fib-calc.drawio.png)

## :pencil: Applications Writeup

### **Client React App**

Client is a frontend Fibonacci index number value calculator application. It is built with the help of React technology. It's main purpose is to facilitate user input action where the data from the input is sent to the server (api). It also is fetching the data from the api on page load with the help of axios library.

- Low Fidelity Wireframe:

  - ![Diagram preview of app functionality and sections data origin](/assets/diagrams/client-low-fid.drawio.png)

- High Fidelity Wireframes:

  - Bootstrap: Extra large > 1200px
    ![Desktop preview of client application UI](/assets/wireframes/bootstrap-extra-large-1200px.png)

  - Bootstrap: Extra small < 576px
    <br>
    ![Mobile preview of client application UI](/assets/wireframes/bootstrap-extra-small-576px.png)

- **Features:**
  - [x] Home page
  - [x] Form for index input
  - [ ] Navigation bar with custom logo
  - [x] Section containing seen indexes and calculated index values
  - [ ] Responsive design
  - [x] Api calls to ExpressJS api app.

### **Server/API ExpressJS App**

The Express server serves as api layer that communicates with Redis and Postgres and passes information to the React app from them.

- Express api diagram:

  - ![Diagram preview of express app functionality and services it fetches data from to server back to react app](/assets/diagrams/express-diagram.drawio.png)

**Express Routes Description:**

- `domain/` is a test route that was used to test connection to the app during early development.
- `domain/values/all` queries and sends back all of the data from Postgres db instance. GET
- `domain/values/current` queries and sends back all of the values from Redis instance. GET
- `domain/values` receives users submitted data, checks if index is within worker limit to prevent bottleneck, sets a placeholder data in Redis instance, and creates a channel over which it sends the index value that worker picks up to do the calculation. POST

## :bulb: Technologies

- Technologies used:
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
