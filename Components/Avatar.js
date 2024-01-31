import Avatar from "@mui/material/Avatar";
import priyansh from "../Assets/Priyansh.jpg";

function AvatarIcon() {
  return (
    <div className="w-full transition-transform cursor-pointer flex justify-around p-4 py-6">
      <Avatar
        sx={{ width: 70, height: 70 }}
        alt="Priyansh Gupta"
        src={priyansh}
      />
      <div className="flex-col ">
        <p className="font-bold font-sans text-xl">Priyansh Gupta</p>
        <p className="font-bold font-sans text-lg text-gray-500">
          Electronics Engineering
        </p>
        <p className="font-semibold font-sans text-gray-500">
          priyanshg615@gmail.com
        </p>
      </div>
    </div>
  );
}

export default AvatarIcon;
