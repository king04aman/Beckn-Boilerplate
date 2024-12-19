# Beckn Boilerplate Application

This is a simple Node.js boilerplate application for working with the Beckn Protocol. It includes endpoints for service discovery, ordering, and health checks. The application is designed to be modular, secure, and extendable, serving as a starting point for developers building Beckn-compliant applications.

## Features

- **Service Discovery**: Discover services based on location and category.
- **Order Management**: Create and manage orders via Beckn APIs.
- **Security**:
  - Rate limiting to prevent abuse.
  - XSS protection using `xss-clean`.
  - Request size limiting to handle large payloads securely.
- **Logging**: Structured error logging using `winston`.

## Requirements

- Node.js (>= 14.x)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/king04aman/beckn-boilerplate.git
   cd beckn-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   BECKN_DISCOVERY_URL=https://example.com/discovery
   BECKN_ORDERING_URL=https://example.com/ordering
   NODE_ENV=development
   PORT=5000
   ```

4. Start the application:
   ```bash
   npm start
   ```

   The server will be running on `http://localhost:5000`.

## Endpoints

### 1. `/discover` [GET]
- **Description**: Discover services based on location and category.
- **Query Parameters**:
  - `location`: (string) The location to search in.
  - `category`: (string) The category of services to search for.
- **Response**: JSON with the list of services.

### 2. `/order` [POST]
- **Description**: Create an order.
- **Body Parameters**:
  - `orderDetails`: (object) The details of the order.
- **Response**: JSON with order confirmation.

### 3. `/health` [GET]
- **Description**: Health check endpoint to ensure the server is running.
- **Response**: `{ "status": "OK" }`

## Scripts

- `npm start`: Start the server.
- `npm run dev`: Start the server in development mode with live reloading using `nodemon`.

## Dependencies

- `express`: Web framework for Node.js.
- `axios`: HTTP client for API requests.
- `dotenv`: Environment variable management.
- `xss-clean`: Security middleware to prevent XSS attacks.
- `express-rate-limit`: Middleware to handle rate limiting.
- `winston`: Logging library.

## DevDependencies

- `nodemon`: For development with auto-reloading.

## Project Structure

```
.
├── app.js         # Main application file
├── package.json   # Node.js package configuration
├── .env           # Environment variables
├── app.log        # Log file (auto-created by Winston)
└── README.md      # Project documentation
```

## Contribution

Contributions are welcome! Please open an issue or submit a pull request to improve this project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

