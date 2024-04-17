import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const initialState = {
  address: "",
  checkIn: "",
  checkOut: "",
  description: "",
  maxGuests: "",
  owner: {},
  perks: [],
  photos: [],
  title: "",
  _id: "",
  price: "",
};
export default function EditPage() {
  const [info, setInfo] = useState(initialState);
  const [updateLink, setUpdateLink] = useState("");
  const [updateLinks, setUpateLinks] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/post/places/?id=${id}`);
      setInfo(data);
    }
    fetchData();
  }, [id]);
  console.log("changed value in state after the api call is ", info);
  const handleUpdatelinkInputs = (e) => {
    e.preventDefault();
    setUpdateLink(e.target.value);
  };

  const handleUploadUpateImages = (e) => {
    e.preventDefault();
    const newLinks = [...updateLinks, updateLink];
    setInfo((prev) => {
      return { ...prev, photos: [...info.photos, ...newLinks] };
    });
  };

  const handleImageDelete = (image, i) => {
    console.log(`image is ${image} and index is ${i}`);
    setInfo((prev) => {
      return { ...prev, photos: info.photos.filter((index) => index != image) };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // make an axios call here only
    console.log("sending saved data", info);
    try {
      const data = await axios.put("/api/post/places", info);
      navigate("/account/");
    } catch (err) {}
  };

  return (
    <div className="container ">
      <form>
        <h2 className="font-bold ">Title</h2>
        <p className="text-sm text-gray-400">title of the your place</p>
        <input
          placeholder="Enter title"
          name="title"
          type="text"
          value={info.title}
          className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300 "
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <h2 className="font-bold ">Address</h2>
        <p className="text-sm text-gray-400">full address to your place</p>
        <input
          placeholder="address"
          name="address"
          type="text"
          value={info.address}
          className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300 "
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <h2 className="font-bold ">Photos</h2>
        <p className="text-sm text-gray-400">more=better</p>
        <div className="flex gap-1 justify-center items-center">
          <input
            type="text"
            name="link"
            onChange={(e) => {
              handleUpdatelinkInputs(e);
            }}
            // value={link}
            placeholder="Add using link ....jpg "
            className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300"
            // ref={ref}
          />
          <button
            onClick={(e) => {
              handleUploadUpateImages(e);
            }}
            className="bg-primary rounded-full py-2 px-6 text-white"
          >
            Add&nbsp;Photo
          </button>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-col-4 gap-2 mt-2">
          {info?.photos?.length > 0 &&
            info?.photos.map((image, i) => {
              return (
                <div key={image} className="relative ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 absolute right-2 bottom-1 p-1 bg-slate-300 hover:text-white rounded-full hover:bg-black"
                    onClick={() => {
                      handleImageDelete(image, i);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <img
                    src={image}
                    alt={i}
                    className="rounded-xl w-[100%] h-[100%] object-cover"
                  />
                </div>
              );
            })}
          <label className="border flex gap-2 text-gray-500 justify-center items-center bg-transparent rounded-2xl p-8 text-2xl">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                // upload fron devise functionality need to be added
                handleUploadFromDevise(e);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Upload
          </label>
        </div>
        <h2 className="font-bold">Description</h2>
        <p className="text-sm text-gray-400">add description about the place</p>
        <textarea
          name="description"
          className="w-full border-2 border-gray-300 px-2 h-20"
          value={info.description}
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <div className="font-bold">Check in & Check Out times</div>
        <p className="text-sm text-gray-400">add check in and check out</p>
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 my-4">
          <div>
            <h3>Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              name="checkIn"
              value={info.checkIn}
              className="w-[100%]"
              onChange={(e) => {
                setInfo((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              type="text"
              name="checkOut"
              placeholder="18:00"
              value={info.checkOut}
              className="w-[100%]"
              onChange={(e) => {
                setInfo((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <h3>Max number of people</h3>
            <input
              type="number"
              name="maxGuests"
              value={info.maxGuests}
              onChange={(e) => {
                setInfo((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
              placeholder="Max number of guests"
              className="w-[100%]"
            />
          </div>
          <div>
            <h3>Per Night price</h3>
            <input
              type="text"
              name="checkOut"
              placeholder="1000₹"
              className="w-[100%]"
              onChange={(e) => {
                setInfo((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />
          </div>
        </div>
      </form>
      <button
        onClick={(e) => {
          handleUpdate(e);
        }}
        className="inline-flex justify-center items-center gap-2 bg-primary text-center py-2 px-6 rounded-full text-white font-semibold hover:bg-red-600"
      >
        Save
      </button>
    </div>
  );
}
