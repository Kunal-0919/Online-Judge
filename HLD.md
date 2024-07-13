## High-Level Design (HLD) Document

# Algo Chef

## 1. Introduction

The Online Judge (OJ) system is a web-based platform designed to allow users to submit solutions to programming problems and receive automated feedback. The system will be built using the MERN stack: MongoDB, Express.js, React, and Node.js. JWT tokens will be used for authentication.

## 2. Architecture Overview

The system will be divided into three main components:

1. **Frontend**: A React application for user interaction.
2. **Backend**: An Express.js server handling API requests.
3. **Database**: MongoDB for data storage.

## 3. Functional Requirements

1. User Registration and Authentication:

   - Users can register and log in using their email and password.
   - JWT tokens will be used for session management.

2. Problem Management:

   - Admins can add, update, and delete programming problems.
   - Problems will have details like title, description, input/output format, constraints, and example cases.

3. Submission and Evaluation:

   - Users can submit their code for a problem.
   - The system will compile and run the code against predefined test cases.
   - Feedback will be provided based on the output (e.g., correct, wrong answer, time limit exceeded).

4. User Profiles and Progress Tracking:
   - Users can view their submission history and problem-solving statistics.

## 4. Non-Functional Requirements

1. **Scalability**: The system should handle a growing number of users and submissions.
2. **Performance**: The evaluation of submissions should be efficient.
3. **Network Isolation**: User data and code submissions should be securely stored and transmitted.

## 5. System Components

# 5.1 Frontend

- **React**: The main framework for building the user interface.
- **Redux**: For state management.
- **React Router**: For navigation between different pages.

# 5.2 Backend

- **Express.js**: The web framework for building the API.
- **JWT**: For handling authentication.
- **Bcrypt**: For password hashing.

# 5.3 Database

- **MongoDB**: For storing user data, problem details, and submission records.
- **Mongoose**: For Object Data Model(ODM).

## 6. API Endpoints

# User Authentication

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in an existing user.
- `GET /api/profile`: Get the logged-in user's profile.

# Problem Management

- `GET /api/problems`: Retrieve a list of problems.
- `GET /api/problems/:id`: Retrieve details of a specific problem.
- `POST /api/problems`: Add a new problem (admin only).
- `PUT /api/problems/:id`: Update a problem (admin only).
- `DELETE /api/problems/:id`: Delete a problem (admin only).

# Submissions

- `POST /api/submissions`: Submit a solution for a problem.
- `GET /api/submissions`: Retrieve submission history of the logged-in user.

## 7. Database Schema

# User

- **\_id**: ObjectId
- **name**: String
- **email**: String
- **password**: String (hashed)
- **role**: String (user/admin/moderator)
- **created_at**: Date

# Problem

- **\_id**: ObjectId
- **title**: String
- **description**: String
- **input_format**: String
- **output_format**: String
- **constraints**: String
- **example_cases**: Array
- **created_at**: Date

# Submission

- **\_id**: ObjectId
- **user_id**: ObjectId (reference to User)
- **problem_id**: ObjectId (reference to Problem)
- **code**: String
- **language**: String
- **status**: String (e.g., correct, wrong answer)
- **created_at**: Date

## 8. Authentication Flow

1. User registers with email and password.
2. On successful registration, a JWT token is issued.
3. User logs in with email and password, and receives a JWT token.
4. The token is used for subsequent authenticated requests.

## 9. Code Evaluation

- A separate service (or worker) will be responsible for compiling and running user submissions against test cases.
- The service will return the result (pass/fail) and any relevant messages.

## 10. Deployment and Monitoring

- The application will be deployed on a cloud service (e.g., AWS, Heroku).
- Monitoring tools (e.g., Prometheus, Grafana) will be used to track performance and usage metrics.

# Conclusion

This HLD document outlines the architecture and key components of the Online Judge system. The next steps involve creating detailed design documents for each component, setting up the development environment, and beginning implementation.
