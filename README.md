# Tether Chat App  

Tether is a real-time chat application enabling seamless communication through features like group chats, image sharing, and voice note functionality. It's the perfect platform for instant and engaging conversations.  

https://tether-real-time-chat-app-2.onrender.com

---

## Features  

- **Real-Time Messaging**  
  Communicate instantly with WebSocket-based messaging.  

- **Group Chats**  
  Connect with multiple users in dynamic group conversations.  

- **Media Sharing**  
  Upload and share images to enhance your chats.  

- **Voice Note Support**  
  Record and send voice messages directly in the chat.  

- **Responsive UI**  
  Enjoy a sleek and user-friendly interface optimized for all devices.  

---

## Getting Started  

### Prerequisites  

- **Node.js** (v16 or higher)  
- **Vite** for the frontend development server.  
- A backend server for managing WebSocket connections and chat data.  

---

### Installation  

#### 1. Clone the Repository  
   ```bash  
   git clone https://github.com/arushree16/Tether-Real-time-chat-app.git  
   ```  

#### 2. Navigate to the Project Directory  
   ```bash  
   cd Tether-Real-time-chat-app  
   ```  

#### 3. Install Dependencies  
  ```bash  
   npm install  
   ``` 

For the **frontend**:  
   ```bash  
   cd frontend  
   npm install  
   ```  

For the **backend**:  
   ```bash  
   cd backend  
   npm install  
   ```  

#### 4. Configure the Environment  

- Create a `.env` file in the `backend` directory with the following variables:  
   ```env  
   PORT=3001  
   DATABASE_URL=mongodb://localhost:27017/tether  
   JWT_SECRET=your_jwt_secret  
   ```  

- In the `frontend` directory, ensure the `VITE_BACKEND_URL` points to your backend:  
   ```env  
   VITE_BACKEND_URL=http://localhost:3001  
   ```  

#### 5. Run the Application  

- **Start the backend server**:  
   ```bash  
   cd backend  
   npm start  
   ```  

- **Start the frontend server**:  
   ```bash  
   cd frontend  
   npm run dev  
   ```  

- Open your browser and navigate to:  
   [http://localhost:5173](http://localhost:5173)  

---

## Technologies Used  

- **Frontend**: React.js with Vite  
- **Backend**: Node.js with Express.js  
- **Real-Time Communication**: Socket.IO  
- **Database**: MongoDB  
- **Media Handling**: Multer for file uploads  

---
