# Assignment 8

This NodeJS project serves as a robust backend for a modern blogging platform, leveraging Firebase services for seamless authentication, data storage, and real-time interaction. The application provides the following key features:

## Features

### Authentication
User authentication is handled through Firebase authentication using email and password. The system supports user signup and login functionalities, ensuring secure access to the platform.

### Blog Post Management
The application allows users to create and retrieve blog posts. Posts are stored in Firestore and contain essential information such as title, content, author details, unique post identifiers (UID), and timestamps for tracking post creation and modification.

### Comments System
Users can engage with blog posts by leaving comments. The comment system utilizes Firebase Realtime Database, storing comments with associated post IDs, content, author information, and timestamps. This feature fosters interactive discussions around the blog content.

### Image Upload and Management
The platform enables users to upload images related to their blog posts. Firebase Storage and Multer are utilized to manage image storage. Images are stored against post IDs. If an image with a specific post ID already exists, the system updates the existing image. If there is no associated image, a new entry is created, enhancing the visual appeal of the blog posts.

## Getting Started
To set up and run the project locally, follow these steps:

### Clone the Repository:
git clone <https://github.com/shahin0503/assignment8>

### Install Dependencies:
npm install

### Run the Application:
npm start

The server will start, and you can access the API endpoints locally at http://localhost:8080.

## API Endpoints

POST /api/signup: User signup endpoint.
POST /api/login: User login endpoint.
POST /api/posts: Create a new blog post.
GET /api/posts: Retrieve all blog posts.
POST /api/posts/:postId/comments: Add a comment to a specific post.
POST /api/posts/:postId/image: Upload an image for a specific post.

## Technologies Used
Node.js: Backend JavaScript runtime environment.
Firebase: Cloud-based platform providing authentication, Firestore database, Realtime Database, and Storage services.
Multer: Middleware for handling multipart/form-data (used for image uploads).

## Screenshots