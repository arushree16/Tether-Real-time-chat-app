import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import GroupList from "../components/GroupList"; // List of groups component
import GroupChat from "../components/GroupChat"; // Chat display component
import { toast } from "react-hot-toast"; // Optional: For notifications
import { FaPlusCircle } from "react-icons/fa"; // Cute icon for creating group
import { AiOutlineArrowRight } from "react-icons/ai"; // Arrow icon for navigating

const GroupChatPage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]); // Will hold the list of groups
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState(""); // To hold new group name

  // Fetch groups data (mock for now, replace with API call)
  useEffect(() => {
    if (!authUser) {
      navigate("/login"); // Redirect to login if user is not authenticated
      return;
    }

    // Mock group data (replace with an API call to your backend)
    const fetchedGroups = [
      { id: 1, name: "Study Group", members: 10 },
      { id: 2, name: "Sports Club", members: 15 },
      { id: 3, name: "Music Lovers", members: 8 },
    ];
    setGroups(fetchedGroups);
  }, [authUser, navigate]);

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId); // Update selected group
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error("Please enter a valid group name.");
      return;
    }

    // Mock creating group - you'd replace this with an actual API call
    const newGroup = {
      id: groups.length + 1, // Assuming the new group gets the next available ID
      name: newGroupName,
      members: 1, // assuming only the creator for now
    };

    setGroups([...groups, newGroup]); // Add the new group to the list
    setNewGroupName(""); // Reset the input field
    setShowCreateGroupForm(false); // Hide the create group form
    toast.success("Group created successfully!");

    // Redirect to the newly created group's chat page
    navigate(`/group-chat/${newGroup.id}`);
  };

  return (
    <div className="group-chat-page bg-gradient-to-r from-pink-200 to-yellow-200 min-h-screen p-6">
      <h1 className="text-center text-4xl font-semibold text-indigo-600 mb-6">Group Chats</h1>

      {/* Create Group Button */}
      <div className="text-center mb-6">
        <button
          className="btn btn-primary rounded-full flex items-center justify-center gap-2 py-3 px-6 shadow-md transition duration-300 hover:bg-pink-500"
          onClick={() => setShowCreateGroupForm(!showCreateGroupForm)}
        >
          <FaPlusCircle className="text-xl" />
          {showCreateGroupForm ? "Cancel" : "Create New Group"}
        </button>
      </div>

      {/* Create Group Form */}
      {showCreateGroupForm && (
        <div className="create-group-form bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto mb-6">
          <input
            type="text"
            placeholder="Enter group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <button
            className="btn btn-success w-full"
            onClick={handleCreateGroup}
          >
            <FaPlusCircle className="text-xl" />
            Create New Group
          </button>
        </div>
      )}

      {/* List of Groups */}
      <div className="group-list mb-6">
        <GroupList groups={groups} onGroupSelect={handleGroupSelect} />
      </div>

      {/* Display Group Chat if a group is selected */}
      {selectedGroup && (
        <div className="group-chat-container">
          <GroupChat groupId={selectedGroup} />
        </div>
      )}

      {/* Optional: Arrow to navigate to group chat */}
      {selectedGroup && (
        <div className="text-center mt-6">
          <button
            className="btn btn-secondary flex items-center justify-center gap-2 py-2 px-6 rounded-full shadow-md transition duration-300"
            onClick={() => navigate(`/group-chat/${selectedGroup}`)}
          >
            <AiOutlineArrowRight className="text-xl" />
            Go to Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupChatPage;
