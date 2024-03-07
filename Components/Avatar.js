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
        <div className="absolute-container">
          <p className="upload-message">Upload Photo</p>
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
