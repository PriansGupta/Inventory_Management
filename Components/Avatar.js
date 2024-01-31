import Avatar from "@mui/material/Avatar";
import priyansh from "../Assets/Priyansh.jpg";

function AvatarIcon(props) {
  return (
    <div className="w-full transition-transform cursor-pointer flex justify-around p-4 py-6">
      <Avatar
        sx={{ width: 70, height: 70 }}
        alt={props.name}
        src={priyansh}
      />
      <div className="flex-col w-[60%]">
        <p className="font-bold font-sans text-xl">{props.name}</p>
        <p className="font-bold font-sans text-lg text-gray-500">
          {props.branch}
        </p>
        <p className="font-semibold font-sans text-gray-500">{props.email}</p>
      </div>
    </div>
  );
}

export default AvatarIcon;
