# Business Management Dashboard (MERN Stack)

A role-based Business Management Dashboard built using the MERN stack.  
This application allows Admin and Staff users to manage orders, products, and view dashboard analytics with secure authentication.

---

## Features

### Authentication

- JWT-based Login & Register
- Role-based access (Admin / Staff)
- Protected routes
- Auto logout on token expiry

### Admin

- Dashboard statistics
- Monthly sales chart
- Product management (CRUD)
- Order management
- Assign orders to staff
- Update order status

### Staff

- View assigned orders only
- Update order status
- Staff-specific dashboard stats

---

## Tech Stack

### Frontend

- React.js
- Material UI
- React Router
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## Project Structure

Business_Management_Dashboard
│
├── client
│ └── src
│ ├── components
│ ├── pages
│ ├── context
│ ├── services
│ └── App.jsx
│
├── server
│ ├── controllers
│ ├── routes
│ ├── models
│ ├── middleware
│ └── server.js

## Environment Variables

Create a `.env` file inside the `server` folder:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

---

## Run the Project

### Backend

cd server
npm install
npm start

### Frontend

cd client
npm install
npm run dev

---

## Roles

- **Admin**: Full access (Products, Orders, Staff, Analytics)
- **Staff**: Assigned orders & status updates only

---

## Author

Arun Prasath B  
Junior MERN Stack Developer
