# Trek-King

My first full-stack web application. Essentially, it is a review website for Treks in India. The core features included are login and sign-up for user authentication, Maptiler Maps API for implementing a cluster map to make it more user-friendly and intuitive , and (CRUD) functionality for creating a new trek and/or reviewing treks made by other authors. The basic foundation of this project was built from the web course 'The Web Developer Bootcamp' by Colt Steele.

## Features

- Users can sign-up/login to use various features like creating, editing, and deleting treks
- Users can leave rating and reviews treks, and edit/delete their reviews
- Authors can only delete treks and reviews created by them.
- Users can use cluster map to pinpoint and view a particular trek

## Demo

##### Landing/Home page
##### Using cluster map to pinpoint a particular trek and view detailed data of that trek
![landing page](https://github.com/user-attachments/assets/04e7af55-c8aa-47a0-9899-ae093cc406e0)
##### User authentication via login page to create or comment on a trek
![login](https://github.com/user-attachments/assets/b5adbc81-76c7-455f-b071-8911271bc781)
##### Creating a new trek
![new trek](https://github.com/user-attachments/assets/abcd1e0e-ab90-4780-8cbe-418186e9c3a5)
##### Editing an already created trek
![editing](https://github.com/user-attachments/assets/a9932dee-d0f3-4ae5-899d-345cd374e587)
##### Ability to add new images and delete existing uploaded images
![deleting images](https://github.com/user-attachments/assets/9604ee30-e20a-4caa-992a-8791fba7955a)
##### Unable to delete a trek if the user is not the author (even if logged in)
![Authorization](https://github.com/user-attachments/assets/3905fdc3-d245-46d3-a03c-d1b978c510ba)
##### Ability to leave a review with rating and edit it
![review](https://github.com/user-attachments/assets/a46ff4c0-55ba-4741-874e-5f2d4114a929)

## Learnings

- First full-stack application to help me understand the integration of front-end with back-end
- Introduction to Express.js in Node.js runtime environment
- Introduction to MongoDB and the basic CRUD functionality. Basic introduction of pre and post hooks, and mongoose middleware
- Introduction to EJS to render dynamic content with HTML and javascript
- A very basic understanding of Error handling(Express error handling and handling async errors)
- Introduction to session, cookies, and flash
- Introduction to authentication and authorization using PassportJS
- Gaining exposure to Cloudinary, Maptiler maps API, and Mongo Atlas
- Optimizing app by learning about various security issues and implementing Helmet to mitigate some of those issues
- Hosting app on Render to learn about deploying and environment variables during development and production
