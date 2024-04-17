import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MoreImages from "./MoreImages";
export default function SinglePage() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/post/places/?id=${id}`);
      setInfo(data);
    }
    fetchData();
  }, [id]);
  return (
    <div className="container">
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="text-2xl font-semibold font-serif ">{info.title}</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
      {/* images */}
      <div className="relative">
        <div className="my-4 grid grid-rows-3 grid-cols-3 grid-flow-col gap-2 w-[full] h-80 rounded-2xl overflow-hidden">
          <div className="col-span-2 row-span-3 ">
            <img
              src={info?.photos?.[0]}
              alt="/"
              className="w-[100%] h-[100%] object-cover hover:opacity-80"
            />
          </div>
          <div className="row-span-2 ">
            <img
              src={info?.photos?.[1]}
              alt="/"
              className="w-[100%] h-[100%] object-cover hover:opacity-80"
            />
          </div>
          <div className="">
            <img
              src={info?.photos?.[2]}
              alt="/"
              className="w-[100%] h-[100%] object-cover hover:opacity-80"
            />
          </div>
        </div>
        <Link
          to={`/places/Images/${id}`}
          className="absolute right-2 bottom-2 px-2 py-2 bg-white text-black rounded-xl border-2 border-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>{" "}
          show more
        </Link>
      </div>
      <div className="text-xl font-semibold hover:underline">
        {info.address}
      </div>
      <div className="flex mb-4 gap-4 w-[40%] items-center ">
        <span className="text-gray-500">
          per night:
          <span className="text-black"> ₹{info.price}</span>
        </span>
        <span className="text-gray-500">
          Max Guests: <span className="text-black">{info.maxGuests}</span>
        </span>
      </div>
      <h1 className="font-bold text-xl hover:underline my-2">Description</h1>
      <div className="text-pretty ">{info.description}</div>
      <div className="my-6 grid gap-4 grid-col-1 md:grid-cols-2">
        <ul className="bg-gray-100 shadow-lg list-decimal w-40 p-4 h-44 flex flex-col gap-2 rounded-lg">
          <li>
            Check In: <span className="text-black">{info.checkIn}</span>{" "}
          </li>
          <li>Check Out: {info.checkOut}</li>
          <li>Max GuestsL: {info.maxGuests}</li>
        </ul>
        <div className="bg-gray-100 shadow-lg h-64 d p-4 rounded-lg">
          <h1 className="text-center font-semibold">
            Price: ₹{info.price} / per night
          </h1>
          <div className=" m-8">
            <div className="flex justify-center items-center gap-2">
              <div className=" ">
                <label>Check In:</label>
                <input type="date" name="" id="" />
              </div>

              <div className="">
                <label>Check Out:</label>
                <input type="date" name="" id="" />
              </div>
            </div>
            <div className="border my-2 rounded-md text-center">
              <label>Max Guests</label>
              <input type="number" name="" id="" />
            </div>
          </div>
            <button className="bg-primary text-white rounded-lg w-[100%] h-8 mx-auto">Book Place</button>
        </div>
      </div>
    </div>
  );
}
