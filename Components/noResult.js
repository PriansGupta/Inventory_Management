import Lottie from "react-lottie";
import NoResultAni from "@/Assets/NoResult.json";

function NoResult() {
  return (
    <div className="text-center mt-6">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: NoResultAni,
        }}
        height={300}
        width={300}
      />
      <h1 className="text-2xl font-semibold">No Items Found</h1>
    </div>
  );
}

export default NoResult;
