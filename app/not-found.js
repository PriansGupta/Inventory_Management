import React from "react";

const ErrorPage = () => {
  return (
    <div className="bg-hard-green justify-center text-center p-16">
      <h1 className="text-7xl font-black ">404</h1>
      <span
        className="px-4 py-1 bg-[#fb923c] text-black  p-8 shadow-md 
       rounded-full  relative bottom-16 left-20"
      >
        Error
      </span>
      <h3 className="font-extrabold  text-black-400 text-2xl">OOPS!!!</h3>
      <h4 className="text-base">
        The page you are looking for could not be found.
      </h4>
      <div className="p-4">
        <button className="bg-primary-green box-border p-1 text-white px-8 rounded-lg">
          Go back to home page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
