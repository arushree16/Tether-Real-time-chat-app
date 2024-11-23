import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios"; // For API calls

const CreateGroupPage = () => {
  console.log("CreateGroupPage rendered"); // Debugging log

  const [newGroupName, setNewGroupName] = useState(""); // State for group name
  const [isCreating, setIsCreating] = useState(false); // State for loading state
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error("Please enter a valid group name");
      return;
    }

    setIsCreating(true); // Set loading state

    try {
      // Make the actual API request to create the group (replace with your backend URL)
      const response = await axios.post("http://localhost:5173/api/groups/create", {
        groupName: newGroupName,
      });

      const newGroup = response.data; // Assuming the backend returns the group data

      toast.success(`Group "${newGroupName}" created successfully!`);
      setNewGroupName(""); // Reset the form

      // Navigate to the new group chat page
      navigate(`/group-chat/${newGroup.id}`);
    } catch (error) {
      toast.error("Failed to create group. Please try again.");
      console.error("Error creating group:", error);
    } finally {
      setIsCreating(false); // Reset loading state
    }
  };

  return (
    <div className="create-group-page bg-gradient-to-r from-blue-200 to-green-200 min-h-screen p-6">
      <h1 className="text-center text-4xl font-semibold text-indigo-600 mb-6">
        Create New Group
      </h1>
      <div className="create-group-form bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <button
          className="btn btn-primary w-full"
          onClick={handleCreateGroup}
          disabled={isCreating} // Disable the button when creating the group
        >
          {isCreating ? "Creating..." : "Create Group"}
        </button>
        <button
          className="btn btn-secondary w-full mt-2"
          onClick={() => navigate("/")} // Navigate to the group chat page
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;
