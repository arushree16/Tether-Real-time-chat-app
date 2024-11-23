import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5173"); // Replace with your backend URL

const GroupChat = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Join the group
    socket.emit("joinGroup", groupId);

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      if (data.groupId === groupId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [groupId]);

  // Fetch previous messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/groups/${groupId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Emit the message to the server
    socket.emit("sendMessage", {
      groupId,
      sender: "currentUser", // Replace with the logged-in user's ID or name
      text: message
    });

    setMessage("");
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <h2>Group Chat</h2>
      <div className="messages" style={{ height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GroupChat;
