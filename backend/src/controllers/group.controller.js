import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import Message from '../models/message.model.js'; 

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    // Validate the name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Group name is required" });
    }

    // Default to including the creator as the first member
    const groupMembers = members && Array.isArray(members) ? members : [];
    if (!groupMembers.includes(req.user.id)) {
      groupMembers.push(req.user.id); // Add the creator to the group
    }

    // Create the group
    const newGroup = new Group({
      name: name.trim(),
      members: groupMembers,
    });

    await newGroup.save();

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Error creating group", error });
  }
};


// Get all groups for a user
export const getGroups = async (req, res) => {
  try {
    const userGroups = await Group.find({ members: req.user.id }); // Assuming you're using a JWT-based authentication
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(400).json({ message: "Error fetching groups", error });
  }
};

// Send message to group
export const sendMessage = async (req, res) => {
  try {
    const { groupId, text } = req.body;
    const newMessage = new Message({
      sender: req.user.id,
      group: groupId,
      text
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: "Error sending message", error });
  }
};

// Add member to group
export const addMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await Group.findById(groupId);

    if (!group.members.includes(memberId)) {
      group.members.push(memberId);
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(400).json({ message: "Member already in group" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error adding member", error });
  }
};

// Remove member from group
export const removeMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await Group.findById(groupId);

    const index = group.members.indexOf(memberId);
    if (index !== -1) {
      group.members.splice(index, 1);
      await group.save();
      res.status(200).json(group);
    } else {
      res.status(400).json({ message: "Member not found in group" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error removing member", error });
  }
};
