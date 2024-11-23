import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, PlusCircle } from "lucide-react"; // Import PlusCircle for Create Group icon

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-pastelPink border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/20 p-2 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-teal-400" />
              </div>
              <h1 className="text-lg font-semibold text-teal-600">Tether 💌</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Create Group Button */}
            {authUser && (
              <Link
                to={"/group-chat/create"}
                className="btn btn-sm gap-2 transition-colors rounded-full p-2 bg-teal-100 text-teal-500 hover:bg-teal-200"
                aria-label="Create Group"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Create Group</span>
              </Link>
            )}

            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors rounded-full p-2 bg-pink-100 text-pink-500 hover:bg-pink-200"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser ? (
              <>
                <Link
                  to={"/profile"}
                  className="btn btn-sm gap-2 rounded-full p-2 bg-yellow-100 text-yellow-500 hover:bg-yellow-200"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center rounded-full p-2 bg-lime-100 text-lime-500 hover:bg-lime-200"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-sm gap-2 rounded-full p-2 bg-purple-100 text-purple-500 hover:bg-purple-200"
              >
                <span className="inline">👋 Log In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
