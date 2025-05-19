

function FeatureCard({ iconColor, title, description, image }) {
  return (
    <div className="group perspective">
      <div
        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 transition-transform duration-300 ease-in-out transform group-hover:-translate-z-10 group-hover:scale-105"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div className={`h-10 w-10 rounded-md ${iconColor} text-white flex items-center justify-center mb-3 mx-auto`}>
          {image}
        </div>
        <h3 className="text-lg font-semibold text-blue-400 mb-2 text-center">
          {title}
        </h3>
        <p className="text-gray-400 text-sm text-center">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
