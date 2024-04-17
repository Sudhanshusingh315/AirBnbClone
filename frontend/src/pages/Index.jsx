import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
export default function Index() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    let data;
    async function fetchData() {
      const { data } = await axios.get(`/api/post/getAllPost`);
      setPlaces(data);
    }
    fetchData();
  }, []);
  console.log(places);
  return (
    <>
      <hr className="my-6" />
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 container">
        {places?.length > 0 &&
          places?.map((place) => {
            // this is outter card
            return (
              <Link to={`/places/${place._id}`} key={place._id}>
                {/* this is image card */}
                <div className="aspect-square bg-red-900 overflow-hidden rounded-2xl mb-4">
                  <img
                    src={place?.photos[0]}
                    alt="/"
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
                <div className="flex flex-col items-start gap-1 justify-center">
                  <h1 className="truncate text-pretty leading-tight font-bold ">
                    {place.address}
                  </h1>
                  <h2 className="text-sm text-gray-700">{place.title}</h2>
                  <p className="text-xs  my-2">
                    <span className="font-bold">₹{place.price}</span> Per Night
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
