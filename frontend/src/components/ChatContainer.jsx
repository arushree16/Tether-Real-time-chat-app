import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-pink-50 to-blue-50 rounded-xl shadow-lg">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="w-12 h-12 rounded-full border-2 border-primary/50 shadow-md overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-60 ml-1 text-primary-500 font-semibold">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col space-y-3 rounded-xl p-4 bg-gradient-to-r from-pink-200 to-pink-300 shadow-xl">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 transition-transform hover:scale-105"
                />
              )}
              {message.text && <p className="text-gray-700 text-lg">{message.text}</p>}
              {message.voiceNote && (
                <audio
                  controls
                  src={message.voiceNote}
                  className="mt-2 rounded-md w-full sm:max-w-[250px]"
                >
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Updated MessageInput with Emoji, Media, and Voice Note Icons */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
