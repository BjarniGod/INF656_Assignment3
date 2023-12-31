# README for Contact Manager

## Introduction

The Contact Manager is a simple web application that allows users to manage their contacts. Users can add, update, view, and delete contacts. The backend server is built with Node.js and Express, and it uses a JSON file (`contacts.json`) to store the contacts.

## Prerequisites

- Node.js
- Express.js
- `uuid` library for generating unique IDs for contacts

## Setup and Running the Project

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder-name>
   ```

2. **Install Dependencies**

   Once you're in the project directory, install the required npm packages:

   ```bash
   npm install
   ```

3. **Start the Server**

   After installing the dependencies, you can start the server:

   ```bash
   node server.js
   ```

   Once the server is running, you should see the message: `Server is running on port 3000`.

4. **Access the Application**

   Open your web browser and go to:

   ```
   http://localhost:3000
   ```

   You should see the Contact Manager web application.

## Interacting with the API

1. **View All Contacts**

   - **Endpoint:** `/contacts`
   - **Method:** `GET`
   - **Response:** A JSON array of contacts.

2. **View a Specific Contact by ID**

   - **Endpoint:** `/contacts/:id`
   - **Method:** `GET`
   - **Response:** A JSON object of the specific contact.

3. **Add a New Contact**

   - **Endpoint:** `/contacts`
   - **Method:** `POST`
   - **Body:** JSON object with `name`, `phoneNumber`, and `email`.
   - **Response:** A JSON object of the added contact with a generated unique ID.

4. **Update an Existing Contact**

   - **Endpoint:** `/contacts/:id`
   - **Method:** `PUT`
   - **Body:** JSON object with updated `name`, `phoneNumber`, and/or `email`.
   - **Response:** A JSON object of the updated contact.

5. **Delete a Contact**

   - **Endpoint:** `/contacts/:id`
   - **Method:** `DELETE`
   - **Response:** A confirmation message.

## Notes

- The contacts are stored in a file named `contacts.json` in the root directory. This means that if the server restarts, any added or modified contacts will persist, but if you delete the file, all contacts will be lost.
- The frontend communicates with the backend through the API endpoints mentioned above. You can also use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API directly.
- Always make sure that you're sending the correct data format when adding or updating contacts. The server expects a JSON object with `name`, `phoneNumber`, and `email`.