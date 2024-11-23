import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
      flex flex-col bg-pink-50 transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-pink-200 w-full p-5">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-pink-400" />
          <span className="font-medium text-pink-600 hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-4 space-y-4">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full px-4 flex items-center gap-4 animate-pulse">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="bg-gradient-to-br from-pink-200 to-pink-300 h-4 w-32 mb-2 rounded-lg" />
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 h-3 w-16 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
