# :whale: Integration of Multi Container App using Kubernetes

This is Kubernetes example project of multi-container images running on local Kubernetes Cluster. A topic of the project is orchestrating a fib. number calculator with the use of Kubernetes.

The images used for this project are derived from a previous project that I have done. These images have been pushed to my docker hub profile.

_Previous Project Repo_: [Docker Fib Calculator](https://github.com/Manojlovic1998/docker-fib-calculator)  
_My Docker Hub Profile_: [DockerHub](https://hub.docker.com/u/manojlovic1998)

## :office: General Kubernetes Architecture Diagram of The App

- Simple diagram of intercommunication between different clusters of application instances.
  ![Diagram preview of intercommunication between applications](/assets/diagrams/general-architecture-k8s.png)

## :house: How to Run Project Locally

### Linux Ubuntu

_The following explanation is meant for linux systems_

_**Note:**_
_There are two ways in which you can run the application. First way makes use of kubectl and minikube. Any changes made to the app directories such as client, worker or server won't be reflected on the deployed pod versions of the same application. The second way which is an optional setup, allows for you to make changes to the source code. This is allowed by the use of skaffold that tracks the root directories and everything within them._

To run the project locally you will need to:

#### Viewing Setup

1. Clone the repository  
   `git clone https://github.com/Manojlovic1998/running-multi-container-app-on-k8s`
2. Make sure you have Docker & Docker Compose installed on your system. If not you can use the following links [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) to set it up.
3. Make sure you have [kubernetes](https://ubuntu.com/kubernetes/install), [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) and [minikube](https://minikube.sigs.k8s.io/docs/start/) installed.
4. After you have cloned the repo, go into projects' root directory.  
   `cd running-multi-container-app-on-k8s `
5. Start your minikube.  
   `minikube start`
6. Once your minikube is up an running you can apply projects' configuration.  
   `kubectl apply -f k8s`
7. View the build live from minikube dashboard or run get commands followed by the object type you want to view status of.  
   `minikube dashboard`  
   _or_  
   `kubectl get <object_type>`
8. Once everything is up and running you can visit the client application by going to minikubes ip address. To get the address run.  
   `minikube ip`
9. Type in your browser search bar the ip address.  
   `http://<minikube_ip>/`

#### Additional Optional Setup

1. Clone the repository  
   `git clone https://github.com/Manojlovic1998/running-multi-container-app-on-k8s`
2. Make sure you have Docker & Docker Compose installed on your system. If not you can use the following links [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) to set it up.
3. Make sure you have [kubernetes](https://ubuntu.com/kubernetes/install), [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) and [minikube](https://minikube.sigs.k8s.io/docs/start/) installed.
4. Make sure you have [skaffold](https://skaffold.dev/) installed.
5. After you have cloned the repo, go into projects' root directory.  
   `cd running-multi-container-app-on-k8s `
6. Start your minikube.  
   `minikube start`
7. Run skaffold command.  
   `skaffold dev`
8. View the build live from minikube dashboard or run get commands followed by the object type you want to view status of.
   `minikube dashboard.`
9. Once everything is up and running you can visit the client application by going to minikubes ip address. To get the address run.  
   `minikube ip`
10. Type in your browser search bar the ip address.  
    `http://<minikube_ip>/`
11. Try making changes to client app source code and view the app again in the browser to see if the changes have taken place. In case of a reload bug try reloading the app page.

## :pencil: Applications Writeup

### **Client React App**

Client is a frontend Fibonacci index number value calculator application. It is built with the help of React technology. It's main purpose is to facilitate user input action where the data from the input is sent to the server (api). It also is fetching the data from the api on page load with the help of axios library.

- ![Diagram preview of app functionality and sections data origin](/assets/diagrams/client-low-fid.drawio.png)

### **Server/API ExpressJS App**

The Express server serves as api layer that communicates with Redis and Postgres and passes information to the React app from them.

**Express api diagram:**

- ![Diagram preview of express app functionality and services it fetches data from to server back to react app](/assets/diagrams/express-diagram.drawio.png)

**Express Routes Description:**

- `domain/` is a test route that was used to test connection to the app during early development.
- `domain/values/all` queries and sends back all of the data from Postgres db instance. GET
- `domain/values/current` queries and sends back all of the values from Redis instance. GET
- `domain/values` receives users submitted data, checks if index is within worker limit to prevent bottleneck, sets a placeholder data in Redis instance, and creates a channel over which it sends the index value that worker picks up to do the calculation. POST

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

## :bulb: Technologies

**Technologies used:**
<br>
![Nginx Icon](/assets/technologies/nginx.png)
![Docker Icon](/assets/technologies/docker.png)
![Kubernetes Icon](/assets/technologies/kubernetes.png)
![React Icon](/assets/technologies/react.png)
![Redis Icon](/assets/technologies/redis.png)
![Express Icon](/assets/technologies/expressjs.png)
![Postgresql Icon](/assets/technologies/postgresql.png)
![Nodemon Icon](/assets/technologies/nodemon.png)
![Axios Icon](/assets/technologies/axios.png)
![Bootstrap Icon](/assets/technologies/bootstrap.png)
![Figma Icon](/assets/technologies/figma.png)
