const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-12">
      <div className="max-w-md text-center">
        {/* Grid of aesthetic patterns */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-pink-200 to-pink-300 animate-pulse"
                  : "bg-gradient-to-br from-blue-200 to-blue-300"
              }`}
            />
          ))}
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-pink-600 mb-4">{title}</h2>
        
        {/* Subtitle */}
        <p className="text-blue-500 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
