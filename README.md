### MADE BY
- Kfir Moscovich

# NodeExam Application

## Introduction
This project is a Node.js-based application that utilizes MongoDB for database management. It includes authentication, user management, and toy-related functionalities. The system follows MVC architecture and provides API endpoints for user and toy operations.

## Requirements
- Node.js (v14 or above recommended)
- MongoDB (local or cloud-based)
- Express.js
- dotenv

## Installation
Before running the application, install the required dependencies:

```sh
npm install
```

## Project Structure
The project is organized into the following directories and files:

- **`app.js`** - The main entry point of the application.
- **`package.json`** - Contains project metadata and dependencies.
- **`db/mongoConnect.js`** - Handles MongoDB connection.
- **`middlewares/auth.js`** - Middleware for authentication.
- **`models/`**
  - `toyModel.js` - Defines the Toy schema.
  - `userModel.js` - Defines the User schema.
- **`routes/`**
  - `configRoutes.js` - Configures API routes.
  - `index.js` - Main router file.
  - `toys.js` - Handles toy-related API requests.
  - `users.js` - Handles user-related API requests.
- **`public/`**
  - `index.html` - Home page.
  - `spring.html`, `summer.html`, `winter.html` - Seasonal pages.

## How to Run the Application
1. Ensure MongoDB is running.
2. Configure environment variables in a `.env` file:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_secret_key
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. The server will start on `http://localhost:3000`

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user.
- `POST /login` - Authenticate a user.

### Toy Routes (`/api/toys`)
- `GET /` - Get all toys.
- `POST /` - Add a new toy.
- `PUT /:id` - Update a toy by ID.
- `DELETE /:id` - Delete a toy by ID.

## License
This project is open-source and free to use.
