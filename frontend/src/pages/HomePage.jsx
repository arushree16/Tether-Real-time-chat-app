import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        {/* Card container */}
        <div className="card w-full max-w-6xl bg-base-100 shadow-lg h-[calc(100vh-8rem)]">
          {/* Inner layout */}
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Conditional rendering */}
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
