import Lottie from "react-lottie";
import NoMessages from "@/Assets/NoMessages.json";

function Messages({ messages }) {
//   console.log(messages);
  if (messages.length === 0)
    return (
      <div className="text-center mt-6">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: NoMessages,
          }}
          height={300}
          width={300}
        />
      </div>
    );
  else
    return (
      <div>
        <ul>
          {messages
            .slice()
            .reverse()
            .map(({ from, timestamp, message }, index) => (
              <li
                key={index}
                className="border-b mb-1 bg-white w-[90%] mx-auto p-4 shadow-md cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">From : {from}</h3>
                  <h3 className="text-md font-bold">{timestamp}</h3>
                </div>
                <p>Message : {message}</p>
              </li>
            ))}
        </ul>
      </div>
    );
}

export default Messages;
