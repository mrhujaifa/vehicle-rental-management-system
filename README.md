# Vehicle Rental System

## Project Overview

A backend API system for managing a complete vehicle rental workflow. It includes modules for Vehicles, Users, Bookings, Authentication, and Role-Based Access Control.

---

## Live URL

Add your deployed link here.

## GitHub Repository

Add your GitHub repo link here.

---

## Features

* Manage vehicle inventory (CRUD operations)
* Manage user accounts (Admin & Customers)
* Booking system with rent/return/cancel flow
* Price calculation based on rental duration
* JWT authentication and secure role-based access
* Admin-only advanced operations

---

## Technology Stack

* Node.js + TypeScript
* Express.js
* PostgreSQL
* bcrypt (password hashing)
* jsonwebtoken (JWT authentication)

---

## Folder Structure

```
src/
 ├── app.ts
 ├── config/
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    ├── vehicles/
 │    └── bookings/
 ├── middlewares/
 ├── utils/
 └── server.ts
```

---

## Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd project-folder
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Server

```
npm run dev
```

---

## Usage Instructions

* Register or Login to get a JWT token
* Browse vehicles
* Create a booking
* Customers can view/manage their own bookings
* Admin can manage all vehicles, users, and bookings

---

## Important Notes

* Follow the API reference exactly
* All endpoints, request bodies, and response formats must match the specification
* Plagiarism is not allowed
