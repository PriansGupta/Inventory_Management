import Avatar from "@mui/material/Avatar";
import { useState } from "react";

function AvatarIcon(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="w-full transition-transform cursor-pointer flex justify-around p-4 py-6">
      <label className="relative cursor-pointer">
        <Avatar
          sx={{ width: 70, height: 70 }}
          alt={props.name}
          src={selectedFile ? URL.createObjectURL(selectedFile) : "/"}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <p className="text-white font-bold text-sm bg-black p-2 rounded-md">
            Upload Photo
          </p>
        </div>
      </label>
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
