import banner1 from "../assets/banner.jpg";
import back2 from "../assets/pantwoman33.jpg";
import back3 from "../assets/pantwoman33.jpg";
import back4 from "../assets/pantwoman33.jpg";

function Background({ heroCount }) {
  // Define colors for each hero slide
  const backgroundColors = [
    "bg-gradient-to-r from-[#2c3e50] to-[#34495e]", // Dark blue-gray gradient
    "bg-gradient-to-r from-[#8e44ad] to-[#9b59b6]", // Purple gradient
    "bg-gradient-to-r from-[#e74c3c] to-[#c0392b]", // Red gradient
    "bg-gradient-to-r from-[#27ae60] to-[#2ecc71]", // Green gradient
  ];

  return (
    <div className="w-[100%] h-[100%] flex">
      {/* Left side - Color background */}
      <div className={`w-[50%] h-[100%] ${backgroundColors[heroCount]}`}></div>

      {/* Right side - Image */}
      <div className="w-[50%] h-[100%] overflow-hidden">
        <img
          src={banner1}
          alt=""
          className="w-[100%] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}

export default Background;
