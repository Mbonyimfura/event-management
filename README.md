# Event Management

This project is an event management platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Users can browse events on the homepage.
- Clicking on an event redirects the user to the login page. If the user already has an account, they can log in; otherwise, they must register. After logging in, the user can book the event by entering the necessary information.
- Users can view and cancel their bookings in their account.
- Admins can add, update, and delete events, and view all bookings. Admins can update an event by clicking on it, which brings up a form similar to the 'add event' form.

## Usage

1. Clone the repo: `git clone git@github.com:Mbonyimfura/event-management.git`
2. Navigate to the project directory: `cd event-management`

### Front-end

3. Navigate to the client directory: `cd client`
4. Install packages: `npm install`
5. Start the development server: `npm run dev`
6. Visit the link provided in your terminal to view the app.

### Back-end

7. Navigate to the API directory: `cd api`
8. Install packages: `npm install`
9. Start the development server: `npm run dev`

Both the client and API should be running to access the events.

### Admin Dashboard

Access the admin dashboard by visiting `localhost/admin`. Log in with the following credentials:

- Email: tresor@gmail.com
- Password: tresor123

Refer to the `config.example.env` file for environment variable setup.
     
