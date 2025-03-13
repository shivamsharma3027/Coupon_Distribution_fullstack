# MERN Stack Coupon Distribution - Setup Guide & Abuse Prevention Strategies

## 📌 Project Overview
This MERN(React Js, Node Js,Express JS, MongoDB) stack project implements a coupon distribution system where users can claim a coupon, but with certain abuse prevention measures in place. The system ensures fairness and prevents users from claiming multiple coupons unfairly.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/your-repo-link.git
cd your-repo-folder
`

### 2️⃣ Install Dependencies
Run the following command in the root folder to install dependencies for both frontend and backend:

npm run install-all

(If `install-all` script isn't present, manually run the following:)

cd backend && npm install
cd ../frontend && npm install


### 3️⃣ Set Up Environment Variables
Create a `.env` file in the `backend` folder and add your MongoDB connection string and other necessary secrets:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/couponDB?retryWrites=true&w=majority
PORT=5000
```

### 4️⃣ Start the Project
To run both backend and frontend together, use:

--> npm run start
```
If needed, you can start them individually:

 -->cd backend &&  npm start
 -->cd ../frontend &&  npm run dev


### 5️⃣ Access the Application
Once the servers are running:
- **Frontend** will be available at: `http://localhost:5173/` (Vite default port)
- **Backend API** will be running at: `http://localhost:5000/`

---

## 🛡️ Abuse Prevention Strategies Implemented
To ensure fairness and prevent coupon misuse, the system implements the following measures:

### ✅ 1. **IP-Based Restrictions**
- A user cannot claim multiple coupons from the same IP within a given time frame.
- If a user tries again before the cooldown period, they will receive a message: **"You have to wait X minutes before claiming another coupon."**

### ✅ 2. **Cookie-Based Restrictions**
- Each user is assigned a unique cookie to track their claim history.
- If the same user (even with a different IP) tries to claim another coupon, they will be blocked.

### ✅ 3. **Limited Coupon Supply (20 Coupons)**
- Only **20 coupons** are pre-inserted into the database.
- Once all coupons are claimed, users will see: **"No more coupons available."**

### ✅ 4. **Time-Based Restriction for Re-Claiming**
- If a user has already claimed a coupon, they must wait before claiming another one.

---

## 🔄 Possible Cases & Expected Outputs



 First-time user claims a coupon ==> ✅ Coupon assigned successfully 
 User tries to claim again within cooldown time ==> ❌ "You have to wait X minutes before claiming another coupon." 
 User with same cookie but different IP tries to claim ==> ❌ "You have already claimed a coupon." 
 User with different cookie but same IP tries to claim ==> ❌ "You have to wait X minutes before claiming another coupon." 
 All 20 coupons have been claimed ==> ❌ "No more coupons available." 
 

----------------------------------------------------------------

## 🎯 Conclusion
This project ensures fair coupon distribution by implementing smart abuse prevention measures while keeping it user-friendly. 🚀

Let me know if you need any modifications or additional explanations! 😊

