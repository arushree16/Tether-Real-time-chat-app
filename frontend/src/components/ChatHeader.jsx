import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Heart } from "lucide-react"; // Importing a heart icon for online status
import { useEffect, useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [userProfilePic, setUserProfilePic] = useState(selectedUser?.profilePic);

  // Conditional rendering to avoid issues if selectedUser is null or undefined
  if (!selectedUser) return null;

  // Check if selectedUser._id exists in onlineUsers
  const isUserOnline = onlineUsers?.includes(selectedUser._id);

  // Handle profile pic update dynamically
  useEffect(() => {
    if (selectedUser?.profilePic) {
      setUserProfilePic(selectedUser.profilePic);
    }
  }, [selectedUser?.profilePic]);

  return (
    <div className="p-4 bg-pink-100 rounded-lg shadow-lg border-b border-base-300">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-400">
              <img
                src={userProfilePic || "/avatar.png"} // Default avatar if profilePic is unavailable
                alt={selectedUser.fullName}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="text-lg font-semibold text-pink-700">{selectedUser.fullName}</h3>
            <p className="text-sm text-pink-600 flex items-center gap-1">
              {isUserOnline ? (
                <>
                  <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                  Online
                </>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-pink-600 hover:text-pink-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
