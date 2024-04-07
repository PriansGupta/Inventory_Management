"use client";
import Account from "../../page";
import { useState, useEffect } from "react";
import SimpleBackdrop from "@/Components/Backdrop";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { client } from "@/utils/configSanity";

function ItemDetail() {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [messageData, setMessageData] = useState({});
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("user"))
      : "";

  const fetchData = async () => {
    const query = `*[_type=='inventory']`;
    let data = await client.fetch(query);
    data = data.filter(
      (item) => item.department === user.branch.toLowerCase().replace(/ /g, "_")
    );
    // console.log(data);
    const id = window.location.pathname.split("/").pop();
    console.log(id);
    data = data.find((item) => item._id === id);
    // console.log(data);
    setMessageData(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(messageData);

  return (
    <Account>
      <SimpleBackdrop open={isLoading}></SimpleBackdrop>
      <div className="mx-auto w-[90%] mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
        <div onClick={() => router.back()} className="px-6 pt-4 cursor-pointer">
          <ArrowBackIcon></ArrowBackIcon>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Items Details</div>
          <p className="text-gray-700 text-base">
            <span className="font-bold text-gray-800">Item</span>{" "}
            {messageData.title}
          </p>
          <p className="text-gray-700 text-base mt-2">
            <span className="font-bold text-gray-800">Department:</span>{" "}
            {messageData.department}
          </p>
          <p className="text-gray-700 text-base mt-2">
            <span className="font-bold text-gray-800">Available Quantity:</span>{" "}
            {2}
          </p>
        </div>
      </div>
    </Account>
  );
}

 
export default ItemDetail;
