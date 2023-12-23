# URL Shortener Web App
Welcome to the README file for the URL Shortener Web App! This document provides an overview of the application, its features, and instructions for setting it up.

# Overview
    * The URL Shortener Web App allows users to create shortened URLs for long, unwieldy links. After registering and logging in, users 
      can submit a long URL and receive a shortened version. When someone accesses the shortened URL, they are redirected to the original 
      long URL.

## Technologies Used
Backend: Node.js, Express.js, MongoDB

Authentication: JWT (JSON Web Tokens)

Password Hashing: bcrypt

Frontend : EJS
# Features
User Authentication: Secure registration and login system using JWT. Passwords are securely stored in the database using bcrypt.
URL Shortening: Users can submit long URLs and get a shortened version.
Redirection: When accessing a shortened URL, users are redirected to the original long URL.
# Setup Instructions
## Prerequisites
Node.js and npm installed on your machine.

MongoDB instance (local or cloud-based).
# Steps to Run the App
## Clone the Repository

git clone <repository-url>
## Navigate to the Project Directory
cd url-shortener-web-app
## Install Dependencies
npm install
## Set Environment Variables

Create a .env file in the root directory and set the following environment variables:

JWT_SECRET=<your-jwt-secret-key>

MONGODB_URI=<your-mongodb-uri>

## Start the Server
npm start

This will start the server on http://localhost:8000.

## Access the App

Open a web browser and navigate to http://localhost:3000 to access the web app.

# API Endpoints
POST [/register:](http://localhost:8080/api/v1/user/register) Register a new user.

POST [/login](http://localhost:8080/api/v1/user/login): Login and generate JWT token.

POST [/shorten](http://localhost:8080/api/v1/url/shorten): Shorten a long URL.

GET [/:shortId](http://localhost:8080/url/:shortUrl): Redirect to the original URL using the shortened ID.
# Contributing
If you'd like to contribute to this project, please fork the repository and submit a pull request. We welcome contributions and feedback!

# License
This project is licensed under the MIT License. See the LICENSE file for more details.

Thank you for using the URL Shortener Web App! If you have any questions or issues, please contact us at vaidyahimanshu502@email.com.
