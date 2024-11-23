import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-r from-pink-50 via-teal-50 to-yellow-50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center
               justify-center animate-bounce p-3 shadow-lg"
            >
              <MessageSquare className="w-10 h-10 text-teal-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-teal-600">Welcome to Tether! 🎉</h2>
        <p className="text-lg text-gray-500/70">
          Select a conversation from the sidebar to start chatting 💬
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
