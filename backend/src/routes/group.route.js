import express from 'express';
const router = express.Router();
import { createGroup, sendMessage, getGroups, addMember, removeMember } from '../controllers/group.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

// Group routes
router.post('/', protectRoute, createGroup);  // Create group
router.get('/', protectRoute, getGroups);  // Get all groups

// Group-specific routes
router.post('/:groupId/send', protectRoute, sendMessage);  // Send message to group
router.post('/:groupId/add-member', protectRoute, addMember);  // Add member to group
router.post('/:groupId/remove-member', protectRoute, removeMember);  // Remove member from group

export default router;
