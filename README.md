# Marcel Expenses API

A RESTful API for tracking expenses built with Node.js, Express, and MongoDB.

## Overview

Marcel Expenses API is a backend service that allows users to register, login, and track their expenses. The application provides a secure authentication system and a robust API for managing expense data.

## Technologies Used

-  _Node.js_ - JavaScript runtime
-  _Express_ - Web application framework
-  _MongoDB_ - NoSQL database
-  _Mongoose_ - MongoDB object modeling
-  _bcryptjs_ - Password hashing library

## Getting Started

### Prerequisites

-  Node.js (v14 or higher)
-  MongoDB account (or local MongoDB installation)
-  npm or yarn package manager

### Installation

1. Clone the repository

git clone https://github.com/your-username/marcel-expenses-app.git
cd marcel-expenses-app

2. Install dependencies

npm install

3. Create a .env file in the root directory with the following variables:

PORT=4000
DB_URL=your_mongodb_connection_string

4. Start the server

npm start

## API Endpoints

### User Authentication

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/v1/users/register | Register a new user |
| POST   | /api/v1/users/login    | Login existing user |

### User Routes

#### Register User

-  URL: /api/v1/users/register
-  Method: POST
-  Body:
   json
   {
   "name": "John Doe",
   "email": "john@example.com",
   "password": "password123"
   }
-  Success Response: 201 Created
   json
   {
   "status": "success",
   "message": "User registered successfully",
   "data": {
   "\_id": "user_id",
   "name": "John Doe",
   "email": "john@example.com",
   "role": "sales_rep"
   }
   }

#### Login User

-  URL: /api/v1/users/login
-  Method: POST
-  Body:
   json
   {
   "email": "john@example.com",
   "password": "password123"
   }
-  Success Response: 200 OK
   json
   {
   "status": "success",
   "message": "Login successful",
   "data": {
   "\_id": "user_id",
   "name": "John Doe",
   "email": "john@example.com",
   "role": "sales_rep",
   "createdAt": "timestamp"
   }
   }

## Project Structure

marcel-expenses-app/
├── controllers/ # Route controllers
│ └── userController.js
├── models/ # Mongoose models
│ └── User.js
├── routes/ # API routes
│ └── userRoutes.js
├── utils/ # Utility functions
│ └── dbConnect.js
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project dependencies
├── package-lock.json # Dependency lock file
├── README.md # Project documentation
└── server.js # Main application file

## Future Improvements

-  Add expense management endpoints
-  Implement JWT authentication
-  Add user profile management
-  Create categories for expenses
-  Generate expense reports
-  Add admin dashboard
-  Implement role-based access control

## License

MIT

## Author

Marcel Hess
