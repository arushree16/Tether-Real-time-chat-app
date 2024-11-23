const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-base-100">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-pink-300" />
          </div>

          {/* Header */}
          <div className="chat-header mb-1">
            <div className="bg-gradient-to-br from-pink-200 to-pink-300 h-4 w-16 rounded-lg" />
          </div>

          {/* Chat bubble */}
          <div className="chat-bubble bg-transparent p-0">
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 h-16 w-[200px] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
