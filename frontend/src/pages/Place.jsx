import { Link, useParams, useNavigate } from "react-router-dom";
import { storage } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { newPostThunk } from "../../features/posts/postSlics";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import AllPlace from "../components/AllPlace";
export default function Place() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { action } = useParams();
  const [places, setPlaces] = useState({});
  const [perks, setPerks] = useState([]);
  const [link, setLink] = useState("");
  // stores my images link
  const [links, setLinks] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  // STORING IMAGES TO FIRE BASE
  const token = userInfo.token;
  const uploadImagesToFireBase = (file) => {
    console.log("this is where is it coming from ", file);
    if (!file) return console.log("file's state is empty");
    const storageRef = ref(storage, `accommodation/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("progress ", progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("image url", downloadURL);
          setLinks((prev) => {
            return [...prev, downloadURL];
          });
        });
      }
    );
  };
  // handling link inputs when i paste them for the first time and, all tho i should not be doing this
  const handlelinkInputs = (e) => {
    e.preventDefault();
    setLink(e.target.value);
  };
  // managing state on link array
  const handleUploadImages = (e) => {
    e.preventDefault();
    const newLinks = [...links, link];
    // because this is an async function and it will take time to get the value
    setLinks(newLinks);
    setPlaces((prev) => {
      return { ...prev, photos: newLinks };
    });
    setLink("");
  };
  // handling upload from device
  function handleUploadFromDevise(e) {
    const newFile = e.target.files[0];
    // setFile(newFile);
    uploadImagesToFireBase(newFile);
  }
  // handeling for the checked inputs
  const handleCheckInputs = (e) => {
    e.preventDefault();
    const { checked, name } = e.target;
    // check is either going to be true or false
    if (checked) {
      setPerks((prev) => {
        return [...prev, { [e.target.name]: e.target.checked }];
      });
    } else {
      const index = perks.indexOf(e.target.name);
      perks.splice(index, 1);
      setPerks((prev) => {
        return [...prev];
      });
    }
  };

  const handelFinalPlaces = async (e) => {
    e.preventDefault();

    // dispatching final value
    dispatch(newPostThunk({ places, token })).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/account/places");
      } else {
        console.log("can not navigate now");
      }
    });
  };
  return (
    <>
      {action === "new" ? (
        <div className="container ">
          <form>
            <h2 className="font-bold ">Title</h2>
            <p className="text-sm text-gray-400">title of the your place</p>
            <input
              placeholder="Enter title"
              name="title"
              type="text"
              className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300 "
              onChange={(e) => {
                setPlaces((prev) => {
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
              className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300 "
              onChange={(e) => {
                setPlaces((prev) => {
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
                  handlelinkInputs(e);
                }}
                value={link}
                placeholder="Add using link ....jpg "
                className="w-full py-2 px-4 my-2 rounded-lg border-2 border-gray-300"
                ref={ref}
              />
              <button
                onClick={(e) => {
                  handleUploadImages(e);
                }}
                className="bg-primary rounded-full py-2 px-6 text-white"
              >
                Add&nbsp;Photo
              </button>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-col-4 gap-2 mt-2">
              {links.length > 0 &&
                links.map((image, i) => {
                  return (
                    <img
                      key={image}
                      src={image}
                      alt={i}
                      className="rounded-xl w-[100%] h-[100%] object-cover"
                    />
                  );
                })}
              <label className="border flex gap-2 text-gray-500 justify-center items-center bg-transparent rounded-2xl p-8 text-2xl">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
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
            <p className="text-sm text-gray-400">
              add description about the place
            </p>
            <textarea
              name="description"
              className="w-full border-2 border-gray-300 px-2 h-20"
              onChange={(e) => {
                setPlaces((prev) => {
                  return { ...prev, [e.target.name]: e.target.value };
                });
              }}
            />

            <h2 className="font-bold">Perks</h2>
            <p className="text-sm text-gray-400">
              select all the perks at your place
            </p>
            <div className="flex gap-4 my-6 flex-wrap">
              <label className="flex justify-center items-center py-4 px-2 border-b-2 border-gray-300 shadow-lg  rounded-lg">
                <input
                  type="checkbox"
                  name="wifi"
                  id=""
                  onChange={(e) => {
                    handleCheckInputs(e);
                    setPlaces((prev) => {
                      return { ...prev, perks: perks };
                    });
                  }}
                />
                <div className=" flex p-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.188 7.063a8.75 8.75 0 0 0-12.374 0 .75.75 0 0 1-1.061-1.06c4.003-4.004 10.493-4.004 14.496 0a.75.75 0 1 1-1.061 1.06Zm-2.121 2.121a5.75 5.75 0 0 0-8.132 0 .75.75 0 0 1-1.06-1.06 7.25 7.25 0 0 1 10.252 0 .75.75 0 0 1-1.06 1.06Zm-2.122 2.122a2.75 2.75 0 0 0-3.889 0 .75.75 0 1 1-1.06-1.061 4.25 4.25 0 0 1 6.01 0 .75.75 0 0 1-1.06 1.06Zm-2.828 1.06a1.25 1.25 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.355.355a.75.75 0 0 1-1.06 0l-.354-.354a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>Wifi</span>
                </div>
              </label>
              <label className="flex justify-center items-center py-4 px-2 border-b-2 border-gray-300 shadow-lg  rounded-lg">
                <input
                  type="checkbox"
                  name="free_parking"
                  id=""
                  onChange={(e) => {
                    handleCheckInputs(e);
                    setPlaces((prev) => {
                      return { ...prev, perks: perks };
                    });
                  }}
                />
                <div className=" flex p-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M2.908 2.067A.978.978 0 0 0 2 3.05V8h6V3.05a.978.978 0 0 0-.908-.983 32.481 32.481 0 0 0-4.184 0ZM12.919 4.722A.98.98 0 0 0 11.968 4H10a1 1 0 0 0-1 1v6.268A2 2 0 0 1 12 13h1a.977.977 0 0 0 .985-1 31.99 31.99 0 0 0-1.066-7.278Z" />
                    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 12V9h6v3a1 1 0 0 1-1 1 2 2 0 1 0-4 0 1 1 0 0 1-1-1Z" />
                    <path d="M6 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                  </svg>

                  <span>Free parking</span>
                </div>
              </label>
              <label className="flex justify-center items-center py-4 px-2 border-b-2 border-gray-300 shadow-lg  rounded-lg">
                <input
                  type="checkbox"
                  name="pets"
                  id=""
                  onChange={(e) => {
                    handleCheckInputs(e);
                  }}
                />
                <div className=" flex p-2 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>

                  <span>Pets</span>
                </div>
              </label>
              <label className="flex justify-center items-center py-4 px-2 border-b-2 border-gray-300 shadow-lg  rounded-lg">
                <input
                  type="checkbox"
                  name="private_entrance"
                  id=""
                  onChange={(e) => {
                    handleCheckInputs(e);
                  }}
                />
                <div className="felx p-2 justify-center items-center">
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
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>

                  <span>Private Entrance</span>
                </div>
              </label>
              <label className="flex justify-center items-center py-4 px-2 border-b-2 border-gray-300 shadow-lg  rounded-lg">
                <input
                  type="checkbox"
                  name="radio"
                  id=""
                  onChange={(e) => {
                    handleCheckInputs(e);
                  }}
                />
                <div className="felx p-2 justify-center items-center">
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
                      d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>

                  <span>Radio</span>
                </div>
              </label>
            </div>
            <div className="font-bold">Check in & Check Out times</div>
            <p className="text-sm text-gray-400">add check in and check out</p>
            <div className="grid grid-cols-2  md:grid-cols-3 gap-4 my-4">
              <div>
                <h3>Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  name="checkIn"
                  className="w-[100%]"
                  onChange={(e) => {
                    setPlaces((prev) => {
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
                  className="w-[100%]"
                  onChange={(e) => {
                    setPlaces((prev) => {
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
                  onChange={(e) => {
                    setPlaces((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                  placeholder="Max number of guests"
                  className="w-[100%]"
                />
              </div>
            </div>
          </form>
          <button
            className="w-full py-2 rounded-full text-xl bg-primary my-2 text-white hover:bg-red-600"
            onClick={(e) => {
              handelFinalPlaces(e);
            }}
          >
            SAVE
          </button>
        </div>
      ) : (
        <>
        <div className="container">
          <Link
            to="/account/places/new"
            className="inline-flex justify-center items-center gap-2 bg-primary text-center py-2 px-6 rounded-full text-white font-semibold hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                clipRule="evenodd"
              />
            </svg>
            Add New Place
          </Link>
        </div>
        <div>
          <AllPlace />
        </div>
        </>
      )}
    </>
  );
}
