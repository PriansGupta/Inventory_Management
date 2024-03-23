import { useState } from "react";

function Menu({ option, icon, action }) {
  const [hover, setHover] = useState(false);
  const pathname = window.location.pathname;
  const lastPath = pathname.split("/").pop();
  const isActive = lastPath.toLowerCase() === option.toLowerCase();
  if (isActive) console.log(lastPath, option);
  let hoverClass = "";
  if (hover || isActive)
    hoverClass =
      "mt-2 cursor-pointer transition-all align-middle font-medium items-center tracking-wide text-md mx-auto flex justify-start p-4 rounded-xl bg-green-600 text-white";
  else
    hoverClass =
      "mt-2 cursor-pointer transition-all align-middle font-medium items-center tracking-wide text-md mx-auto flex justify-start p-4 rounded-xl text-gray-500";

  return (
    <div
      onClick={action}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={hoverClass}
    >
      {icon}
      <p className="ml-4 text-lg">{option}</p>
    </div>
  );
}

export default Menu;
