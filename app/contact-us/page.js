"use client";
import Image from "next/image";
import HBTU_BG from "@/Assets/BG-HBTU.jpg";
import { useEffect, useState } from "react";
import SimpleBackdrop from "@/Components/Backdrop";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Contact() {
  const branchArray = [
    { name: "Electronics Engineering", email: "200106077@hbtu.ac.in" },
    { name: "Computer Science Engineering", email: "200106052@hbtu.ac.in" },
    { name: "Information Technology", email: "200106052@hbtu.ac.in" },
    { name: "Mechanical Engineering", email: "200106052@hbtu.ac.in" },
    { name: "Electrical Engineering", email: "200106077@hbtu.ac.in" },
    { name: "Civil Engineering", email: "200106077@hbtu.ac.in" },
    { name: "Paint Technology", email: "200106077@hbtu.ac.in" },
    { name: "Chemical Engineering", email: "200106077@hbtu.ac.in" },
    { name: "Bio Chemical Engineering", email: "200106077@hbtu.ac.in" },
    { name: "Oil Technology", email: "200106077@hbtu.ac.in" },
    { name: "Leather Technology", email: "200106077@hbtu.ac.in" },
    { name: "Food Technology", email: "200106077@hbtu.ac.in" },
  ];
  const [branch, setbranch] = useState("");
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [ToEmail, setToEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setLoading] = useState(true);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@hbtu\.ac\.in$/i;
    return emailRegex.test(input);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const MessageHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact-us",
        {
          fromEmail,
          ToEmail,
          name,
          message,
          id: uuidv4(),
        }
      );

      console.log(response.data.message);
      try {
        const response = await axios.post("http://localhost:5000/api/alerts", {
          fromEmail,
          ToEmail,
          name,
          message,
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }

      setResponseMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  if (isLoading) return <SimpleBackdrop open={isLoading}></SimpleBackdrop>;
  else
    return (
      <main className="select-none">
        <Image
          src={HBTU_BG}
          alt="HBTU Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-black text-5xl font-bold mb-6">CONTACT US</h1>
          {responseMessage && (
            <p className="font-semibold text-green-500 mb-6">
              {responseMessage}
            </p>
          )}
          <div>
            <div className="flex space-x-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                required
                type="email"
                placeholder="Your email address"
                className={`w-full px-4 py-2 border rounded-lg ${
                  !isValidEmail ? "border-2 border-red-500 bg-red-300" : ""
                }`}
                value={fromEmail}
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setFromEmail(newEmail);
                  setIsValidEmail(validateEmail(newEmail));
                }}
              />
            </div>
            {!isValidEmail ? (
              <p className="text-red-500 tracking-wide font-bold font-mono">
                Enter a valid email
              </p>
            ) : (
              ""
            )}
            <div className="mb-4 bg-white rounded-lg">
              <select
                required
                id="branch"
                style={{
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
                className="dropdown cursor-pointer w-full"
                value={branch}
                onChange={(e) => {
                  setbranch(e.target.value);
                  const selectedOption = branchArray.find(
                    (item) => item.name === e.target.value
                  );
                  setToEmail(selectedOption.email);
                }}
              >
                <option value="" disabled>
                  Department you are concerned with
                </option>
                {branchArray?.map((item, idx) => {
                  return (
                    <option
                      key={item.name}
                      value={item.name}
                      email={item.email}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="m-0 p-0">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="h-[96px] p-2 w-full bg-white rounded-lg"
                placeholder="Write your message"
              />
            </div>

            <button
              onClick={MessageHandler}
              className="bg-yellow-400 w-full text-white px-4 font-semibold tracking-wide hover:bg-yellow-500 py-3 rounded-lg"
            >
              Send Message
            </button>
          </div>
        </div>
      </main>
    );
}
