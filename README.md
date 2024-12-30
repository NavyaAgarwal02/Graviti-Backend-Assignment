# Backend Assignment

## Objective
Develop a scalable backend system to track the live location (GPS) of users in real-time. The system should handle location pings sent every 4 seconds and include endpoints for optional user registration, login, and an admin interface to monitor and manage user data.

## Core Requirements

### User Features
1. **Registration & Login**: Users can register and log in to the system.
2. **Location Tracking**: After logging in, the user's GPS location is tracked and sent to the server every 4 seconds.
3. **Scalability**: The backend is designed to handle at least 500 live users tracking their locations simultaneously.

### Admin Features
1. **User Monitoring**: Admins can view all registered users through an admin interface.
2. **Location Logs**: Admins can view detailed location logs for individual users.

## Technical Stack
- **Backend**: Node.js with Express framework.
- **Database**: 
  - MongoDB for storing user profiles and location data.
- **Caching**: Redis can be used for caching frequently queried data and optimizing real-time data handling.
- **Frontend**: Minimal UI built using JavaScript (or Postman for testing API endpoints).

## Important Notes
- This assignment focuses on backend design, scalability, and efficient data handling.
- A minimal UI is acceptable; emphasis should be on backend functionality.
- Bonus tasks are optional and showcase additional skills.

## Bonus (Optional)
1. **Redis Integration**: Use Redis for caching frequently queried data or optimizing real-time data handling.
2. **Relational Database Optimization**: Implement advanced features of relational databases (e.g., indexing, partitions) for better performance.
3. **Code Architecture**: Use clean, modular, and scalable code architecture with clear separation of concerns.
4. **Enhanced Admin Panel**: Build a more advanced admin panel with filters, user search, and exportable logs.
5. **React JS App**: Create a web app for users to register, log in, and share their location.

## Evaluation Criteria
- **Core Features**: Completion of user and admin functionality.
- **Scalability**: Ability to handle >=500 live/concurrent users.
- **Database Design**: Efficient use of relational and/or NoSQL databases.
- **Code Quality**: Clean, maintainable, and well-documented code.
- **Creativity**: Unique approaches or optimizations beyond the basic requirements.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB server running (locally or remotely).
- Redis server running (if using Redis).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Backend-Assignment

2. Install dependencies:
   ```bash               
   npm install

3. Create a .env file in the root directory and add the following variables:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/assignment
   
4. Start the backend server:
   ```bash             
   npm start

5. Start the frontend (optional):   
   ```bash             
   open index.html with live server in your browser         

## Testing the API

### Authentication

- **User Registration:**
  - Endpoint: `POST /auth/register`
  - Description: Adds a user to the system with details such as name, email, password and role.
  - Request Body: JSON with user details.
  - Response: JSON with user details.

- **User Login:**
  - Endpoint: `POST /auth/login`
  - Description: Logs in a user and returns a JWT token. The token can be used for subsequent requests.
  - Request Body: JSON with user credentials (email and password).
  - Response: JSON with user details and JWT token.

### Admin Interface

- **Location Tracking:**
  - Endpoint: `GET /admin/track/:userId`
  - Description: Sends a location ping to the system every 4 seconds. The ping contains the user's GPS coordinates and timestamp.   
  - Request Body: JSON with GPS coordinates and timestamp.
  - Response: JSON with success message.

- **Admin Interface:**
  - Endpoint: `GET /admin/users`
  - Description: Retrieves a list of all registered users.
  - Response: JSON with a list of user details.

## Data Models

### User Model
```json
{
  "name": "John Doe",
  "email": "LZGZK@example.com",
  "password": "password123",
  "role": "user"
}
```

### Location Model
```json
{
  "userId": "user123",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "timestamp": "2023-01-01T12:34:56Z"  
}
```

## Conclusions
This project implements a scalable backend system for real-time GPS location tracking. Key features include user registration, login, and location tracking with pings every 4 seconds.

Built with Node.js and Express, the API efficiently manages user data, while MongoDB serves as the database, supporting over 500 concurrent users. Admin functionalities allow for effective user monitoring and access to location logs, exemplifying best practices in backend development.



