# 🔗 URL Shortener Backend

An authenticated URL shortener built using **Node.js, Express, TypeScript, and Clean Architecture**.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure Password Hashing (bcrypt)
- Create Short URLs (Authenticated)
- Redirect using Short URL
- Get all URLs created by a user
- Clean Architecture (Domain, Application, Infrastructure, Presentation)

---

## 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Zod (Validation)

---

## 📁 Project Structure
src/
├── presentation/
├── application/
├── domain/
├── infrastructure/
├── shared/


---

## 🔐 Authentication Flow

1. User registers with email & password  
2. Password is hashed using bcrypt  
3. User logs in → receives JWT token  
4. Protected routes require token  

---

## 🔗 URL Shortening Flow

1. Authenticated user sends long URL  
2. System generates short code  
3. URL is stored in database  
4. Visiting short URL redirects to original  

---

## 📦 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### URL

- `POST /api/url` (Protected)
- `GET /api/url` (Protected)
- `GET /:shortCode` (Public)

---

## ⚙️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/your-username/url-shortener-backend.git


### 2. Install dependencies


npm install


### 3. Setup environment variables

Create `.env` file:


PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret


### 4. Run the server


npm run dev


---

## 🧠 Architecture

This project follows **Clean Architecture**:

- **Presentation** → Handles HTTP & validation  
- **Application** → Business logic & use cases  
- **Domain** → Core entities & rules  
- **Infrastructure** → Database & external services  

---

## 🤖 AI Usage

This project used AI tools (like ChatGPT) to:
- Improve architecture design
- Speed up development
- Ensure best practices

---

## 📌 Author

