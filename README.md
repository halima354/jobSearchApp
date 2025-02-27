# Job Search App

A Node.js application that helps users find job listings and manage their job search process.

## Features of Job Search App:**

- *Filter option to get the required job.*
- *Handles the user’s data.*
- *Handles the company’s data.*
- *Handles the Job Applications*
- *Real-Time Chat Enables users to send and receive messages using **Socket.io**.
- *Real-Time Notifications* Pushes notifications when a new message is received.


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
   - - **Mongoose Hooks**: Used for pre and post middleware functions for various operations like saving,deleteing and updating documents.
- **JWT**: For user authentication and session management.
- **Socket.io**: A library used to enable real-time, bidirectional communication between the server and the client, allowing for features such as Real-Time Chat,real-time notifications and live updates.
- **Malter**: Used for file uploading and management, allowing users to upload files easily.
- **Cloudinary**: Used for managing and optimizing images and media files, allowing for fast image delivery, automatic resizing, and format optimization.

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.
