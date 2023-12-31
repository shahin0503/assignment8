# Assignment 8

This NodeJS project serves as a backend for a modern blogging platform, using Firebase services for seamless authentication, data storage, and real-time interaction. The application provides the following key features:

## Features

### Authentication
User authentication is handled through Firebase authentication using email and password. The system supports user signup and login functionalities.

### Blog Post Management
The application allows users to create and retrieve blog posts. Posts are stored in Firestore and contain information such as title, content, author details, unique post identifiers (UID), and timestamps for tracking post creation and modification.

### Comments System
Users can engage with blog posts by leaving comments. The comment system utilizes Firebase Realtime Database, storing comments with associated post IDs, content, author information, and timestamps.

### Image Upload and Management
The platform enables users to upload images related to their blog posts. Firebase Storage and Multer are utilized to manage image storage. Images are stored against post IDs. If an image with a specific post ID already exists, the system updates the existing image. If there is no associated image, a new entry is created.

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
| URL                     | HTTP Method | Description                         |
|-------------------------|-------------|-------------------------------------|
| /signup                 | POST        | User signup endpoint                |
| /login                  | POST        | User login endpoint                 |
| /blog                   | POST        | Create a new blog post              |
| /blog                   | GET         | Get the list of blog post           |
| /blog/:blogId           | GET         | Get blog data, comments and image   |
| /blog/:blogId/comments  | POST        | Add a comment to a blog post        |
| /upload/:blogId         | POST        | Add a image to a blog post          |

## Technologies Used
| Tool/Technology    | Description                                                          |
|--------------------|----------------------------------------------------------------------|
| Node.js            | Backend JavaScript runtime environment                               |
| Firebase           | Cloud-based platform providing authentication                        |
| Firestore database | Realtime Database, and Storage services                              |
| Multer             | Middleware for handling multipart/form-data (used for image uploads) |

## Screenshots

### Signup User
![image](https://github.com/shahin0503/assignment8/assets/144336102/e8e3249b-5a67-4e6a-a041-3374692c9c2a)
![image](https://github.com/shahin0503/assignment8/assets/144336102/4fa3eeb0-bae8-4139-82c5-47a6f0548d26)

### Login User
![image](https://github.com/shahin0503/assignment8/assets/144336102/f494922d-8f54-4742-b4d6-8483798adae4)

### Create blog
![image](https://github.com/shahin0503/assignment8/assets/144336102/6cd3c9e8-3664-447e-9a00-70715faded9e)
![image](https://github.com/shahin0503/assignment8/assets/144336102/965d71e8-06f9-4625-a5b0-c161c5f1cc26)

### Retrieve blogs
![image](https://github.com/shahin0503/assignment8/assets/144336102/900d1be6-6abc-4c6b-ae50-7200a97e3303)
![image](https://github.com/shahin0503/assignment8/assets/144336102/9c627c3f-e5a4-4c31-8962-82966965a8d0)

### Add comments
![image](https://github.com/shahin0503/assignment8/assets/144336102/ffb9dde5-2c7c-42c8-9837-50548cbc110d)
![image](https://github.com/shahin0503/assignment8/assets/144336102/ce3ec670-ccca-4ffc-b578-9c16e3fd583a)


### Add or Update image
![image](https://github.com/shahin0503/assignment8/assets/144336102/8499905c-4473-4034-a597-35003965cf7f)
![image](https://github.com/shahin0503/assignment8/assets/144336102/33085314-213b-44a8-a290-3124c2c8ea31)
