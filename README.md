# E-Commerce Project with GraphQL and NestJS

This project is an e-commerce application built with GraphQL and TypeScript using the NestJS framework. It provides various functionalities for managing products, categories, and user authentication. The project includes features such as user registration, login, authentication, logout, product management (including creation, editing, deletion, searching, sorting, pagination), category management (including creation, editing, deletion), and role-based access control.

## Prerequisites

Before running the application, ensure that the following prerequisites are met:

- Node.js (version >= 12) is installed on your machine.
- NPM (Node Package Manager) or Yarn is installed.
- MongoDB or any other compatible database is set up and running.

## Installation

Clone the repository:
  ```bash
  git clone https://github.com/BaseMax/ProductsGraphQLTS.git
  ```

Install the dependencies:

  ```bash
  cd ProductsGraphQLTS
  npm install
  ```

## Configuration

Rename the `.env.example` file to `.env` and update the following configuration variables as per your environment:
```makefile
# Database configuration
DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_NAME=<your-database-name>

# JWT secret key for token generation
JWT_SECRET=<your-secret-key>

# Admin email and password for initial setup
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
```

Adjust any other necessary configuration settings based on your requirements.

## Usage
To start the application, run the following command:

```
npm run start
```

This will start the server on the specified port (default is 3000). You can access the GraphQL playground by navigating to http://localhost:3000/graphql in your browser.

## API Endpoints

The API endpoints are defined using GraphQL and can be accessed through the GraphQL playground. Below are the available queries and mutations:

### Authentication

- `register`: Create a new user account.
- `login`: Authenticate a user and generate an access token.
- `logout`: Invalidate the access token and log out the user.

### Products

- `getProducts`: Retrieve a list of products.
- `createProduct`: Create a new product.
- `editProduct`: Update an existing product.
- `deleteProduct`: Delete a product.
- `searchProduct`: Search for products based on a keyword.
- `filterProducts`: Filter products based on specific criteria (e.g., category, price range, etc.).
- `paginateProducts`: Retrieve paginated products based on specified page and limit values.

### Categories

- `createCategory`: Create a new category.
- `editCategory`: Update an existing category.
- `deleteCategory`: Delete a category.
- `getProductsByCategory`: Retrieve all products within a specific category.

### Admin-specific

- `getInactiveProducts`: Retrieve all products that are not yet active.
- `activateProduct`: Activate a product.
- `deactivateProduct`: Deactivate a product.

Note: Certain mutations and queries may require the user to be authenticated and have the appropriate role (e.g., admin) to access them.

## Authentication and Authorization

User authentication is handled using JWT (JSON Web Tokens). When a user successfully logs in, an access token is generated and returned in the response. This access token should be included in the Authorization header for subsequent requests requiring authentication.

The application implements role-based access control, differentiating between admin and normal users. Admins have additional privileges, such as viewing inactive products.

Copyright 2023, Max Base
