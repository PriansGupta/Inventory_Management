import { useState } from "react";

function Menu(props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => props.action()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mt-2 cursor-pointer transition-all align-middle font-medium items-center tracking-wide text-md mx-auto flex justify-start p-4 rounded-xl ${
        hover ? "bg-green-600 text-white" : "text-gray-500"
      }`}
    >
      {props.icon}
      <p className="ml-4 text-lg">{props.option}</p>
    </div>
  );
}

export default Menu;
