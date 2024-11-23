import { Server } from "socket.io";
import http from "http";
import express from "express";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";

// MongoDB connection (optional for metadata storage)
import { MongoClient, GridFSBucket } from "mongodb";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Adjust to your client’s URL
  },
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dvhv6ktrf", 
  api_key: "745854811975752", 
  api_secret: "YPwOn3c0MHSKNUaPyzcKA11gIng", 
});

// Used to store online users
const userSocketMap = {}; // { userId: socketId }

// Function to get the receiver's socket ID
const getReceiverSocketId = (receiverId) => userSocketMap[receiverId] || null;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users list to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  /**
   * Group chat events
   */
  // Handle user joining a group
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId); // Join the group room
    console.log(`User ${socket.id} joined group ${groupId}`);
    io.to(groupId).emit("userJoined", { userId, groupId });
  });

  // Handle sending a group message
  socket.on("sendGroupMessage", (groupId, message) => {
    const { senderId, text, image, voiceNote } = message;

    // Broadcast the message to everyone in the group except the sender
    io.to(groupId).emit("newGroupMessage", {
      senderId,
      groupId,
      text,
      image,
      voiceNote,
      timestamp: new Date(),
    });
  });

  /**
   * Voice notes
   */
  socket.on("sendVoiceNote", (data) => {
    const { groupId, senderId, fileUrl, fileName } = data;

    if (groupId) {
      // Broadcast voice note to the group
      io.to(groupId).emit("receiveVoiceNote", {
        senderId,
        fileUrl,
        fileName,
        groupId,
        timestamp: new Date(),
      });
    } else {
      console.error("Group ID not specified for voice note.");
    }
  });

  /**
   * Individual chat events
   */
  socket.on("sendPrivateMessage", (messageData) => {
    const { receiverId, senderId, text, image, voiceNote } = messageData;

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newPrivateMessage", {
        senderId,
        text,
        image,
        voiceNote,
        timestamp: new Date(),
      });
    }
  });

  /**
   * Cleanup on disconnect
   */
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

/**
 * Endpoint for uploading voice notes to Cloudinary
 */
app.post("/uploadVoiceNote", express.raw({ limit: "10mb", type: "audio/*" }), (req, res) => {
  if (!req.body) {
    return res.status(400).send("No audio file received.");
  }

  try {
    const filePath = path.join(__dirname, "temp_audio_file");
    fs.writeFileSync(filePath, req.body); // Save the raw file temporarily

    cloudinary.v2.uploader.upload(filePath, { resource_type: "auto" }, (error, result) => {
      fs.unlinkSync(filePath); // Delete the temporary file

      if (error) {
        console.error("Error uploading voice note to Cloudinary", error);
        return res.status(500).send("Error uploading voice note to Cloudinary.");
      }

      res.json({ fileUrl: result.secure_url, fileName: result.public_id });
    });
  } catch (error) {
    console.error("Error processing voice note upload", error);
    res.status(500).send("Error processing voice note upload.");
  }
});

/**
 * Endpoint to stream the voice note from Cloudinary (if needed)
 */
app.get("/voiceNote/:fileName", (req, res) => {
  const { fileName } = req.params;
  const fileUrl = cloudinary.url(fileName, { resource_type: "audio" });
  res.redirect(fileUrl); // Redirect to Cloudinary URL
});

export { io, app, server, getReceiverSocketId };
