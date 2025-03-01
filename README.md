# Job Search App

A Node.js application that helps users find job listings and manage their job search process.

## Features of Job Search App:**

- *Filter option to get the required job.*
- *Handles the user’s data.*
- *Handles the company’s data.*
- *Handles the Job Applications*
- *Google Login The app allows users to log in using their Google account for easy and secure authentication.
- *Traditional Login (Username and Password)*
- *Email Verification with OTP* The app supports email verification using **OTP**. Users will receive a time-sensitive OTP code to their email for verifying their identity during 
     registration or password recovery. This ensures an added layer of security for user authentication.
- *Real-Time Chat Enables users to send and receive messages using **Socket.io**.
- *Basic Front-End*The front-end is kept simple to demonstrate the real-time communication feature.**Socket.io** with Node.js backend.
- *Real-Time Notifications* Pushes notifications when a new message is received.
- *CORS*The app uses **CORS** middleware to allow cross-origin requests from specific domains, ensuring secure communication between the front-end and back-end.
- *Rate limiting*is implemented to prevent abuse of the API and limit the number of requests a user can make in a specific time window.
- *Helmet*: The app uses **Helmet** middleware to secure HTTP headers, protecting the app from common web security vulnerabilities.
- *Admin Dashboard* The **Admin Dashboard** uses **GraphQL** to manage and fetch data for the admin interface. The dashboard allows the admin to perform various actions and view 
    statistics in real time.
-*GraphQL Integration* The app uses **GraphQL** for querying and mutating data efficiently. It allows admins to fetch exactly the data they need, reducing over-fetching of information 
    and improving performance.
-*Pagination* The app implements **pagination** to divide large sets of data (like job listings or user activity) into smaller, more manageable chunks. The pagination allows the front- 
   end to request specific pages of data based on parameters like `page` and `limit`. Example:
 

## Installation

Follow these steps to set up and run the project locally.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/halima354/jobSearchApp.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd jobSearchApp
    ```

3. **Install dependencies**:
    Make sure you have **Node.js** installed. Then run:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    create the `.env ` file and Then configure the variables like your **MongoDB URI** and **email credentials**.

5. **Run the application**:
    Start the app using the following command:
    ```bash
    npm run dev
    ```

    The app will be running on **http://localhost:3000**.

## Usage

- Navigate to **http://localhost:3000** in your browser to start using the app.

## Technologies Used

- **Node.js**: For the server-side logic.
- **Express**: Web framework for building the app.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, which allows us to define schemas, models, and interact with MongoDB in an easier way.
   - **Mongoose Hooks**: Used for pre and post middleware functions for various operations like saving,deleteing and updating documents.
- **JWT**: For user authentication and session management.
- **Socket.io**: A library used to enable real-time, bidirectional communication between the server and the client, allowing for features such as Real-Time Chat,real-time notifications 
    and live updates.
- **Malter**: Used for file uploading and management, allowing users to upload files easily.
- **Cloudinary**: Used for managing and optimizing images and media files, allowing for fast image delivery, automatic resizing, and format optimization.
- **GraphQL**: For querying and mutating data efficiently, used in the **Admin Dashboard** for managing and fetching data.

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.
