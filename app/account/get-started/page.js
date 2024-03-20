"use client";
import Account from "../page";
import Lottie from "react-lottie";
import started from "@/Assets/started.json";

const GetStarted = () => {
  return (
    <Account>
      <div className="text-center flex-col justify-center align-middle flex items-center h-full">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: started,
          }}
          height={300}
          width={300}
        />
        <h1 className="font-semibold text-3xl">Get Started</h1>
      </div>
    </Account>
  );
};

export default GetStarted;
