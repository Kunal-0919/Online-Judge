# Docker

## Explaining Docker

- Docker is a platform that allows devs to easily create, deploy and run apps using containers. Containers package all the necessary code, libs, and dependancies into a single package.
- Containerisation involves encapsulating or packaging up software code and all its dependencies so that it can run uniformly and consistently on any infrastructure.
- Containerisation lets you bundle up your software along with all its dependencies in a self-contained package so that it can be run without going through a troublesome setup process.
- Container is a lightweight version of Virtual Machine.
- Container is an isolated environment.
- Create a Docker file listing dependencies and then create an image using that Docker file to create an image of your environment listing all the ports, libs, dependencies, packages etc. Then using that image we can create an isolated container that helps to run your app.
  | Github | Docker hub |
  | ----- | ----- |
  | A code repo | An image repo |
  Docker Hub is a container registry platform focused on hosting and sharing Docker images, while GitHub is a code hosting platform for version control and collaborative software development.

## What is Docker?

- Docker is an open source tool that allows devs to build, test, and deploy applications quickly and efficiently. It uses containerisation of apps using containers that can run virtually anywhere.

#### Docker with examples:

- Wordpress site

  > Docker can be used to create a local dev env that mimics a production server, complete with a MySQL database and all the necessary Wordpress files.

- Machine Learning Model

  > Docker can standardise machine learning models and provide a constistent environment for testing and deployment. This is important because machine learning models depend on specific versions of packaes and libraries.

- E-commerce Site

  > Docker can be used to develop and deply e-commerce website with Dockerised services like Nginx, Redis, and PostregreSQL.

- Microservices
  > Docker can be used to create and deploy micro-services based architecture that can scale independently and individually across the cloud.

## Why do we need Docker?

- Simplify Development: Docker simplifies the dev process by abstracting away most of the complexities of managing h/w and platform differences.
- Portability & Consistency : With docker, apps and code can be packaged and moved to another env, ensuring consistency throughout out the dev process.
- Flexibility: Docker enables devs to work with differenct languages, packages and libraries while ensuring compatibility across different dependencies.

## Intro to Docker Image

A Docker image is a lightweight, stand-alone, and executable pkg that includes everything needed to run a piece of s/w, including code, runtime, libraries and system tools.

## Intro to Docker Container

A docker container is an instance of a Docker image. It's a lightweight, standalone, and executable entity that includes everything needed to run a piece of s/w. You can runa. container on any machine.
