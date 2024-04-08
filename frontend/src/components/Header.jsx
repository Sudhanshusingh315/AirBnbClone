import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
export default function Header() {
  const {userInfo} = useSelector(state => state.user)
  return (
    <>
      <div className="container">
        <div className=" flex justify-between items-center border-2 border-gray-300 rounded-full my-4 md:border-none">
          {/* outter div or container */}
          <div className="p-2 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          {/* air bnb logo on the medium size screens */}
          <div className="hidden md:flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>{" "}
            Airbnb
          </div>
          {/* middle search box */}
          <div className="flex flex-col md:shadow-md md:shadow-gray-300 flex-1 px-4 md:flex-row md:flex-none md:justify-center md:items-center md:gap-4  md:py-2 md:px-4 md:border-2 md:border-gray-300 md:rounded-full">
            <div className="w-[100%]  md:block md:font-semibold md:text-xl">
              Anywhere
            </div>
            <div className="flex gap-1 text-sm flex-1 w-full md:flex-row  md:justify-center md:items-center">
              <div className="md:w-20 md:font-semibold md:text-xs">
                Any week
              </div>
              <div className="md:w-20">Add guests</div>
              {/* serach box inside the center div */}
              <div className="hidden md:block bg-primary p-1 rounded-full text-white hover:bg-secondary">
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* login/logout */}
          <div className=" md:flex md:bg-primary md:justify-center md:items-center">
            <div className="p-2 m-1 border-2 border-gray-300 rounded-full hover:bg-gray-400">
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            <Link to={userInfo? "/account":'/login'}>
              <div className="hidden md:block">
                {userInfo ? (
                  <p>{userInfo.name}</p>
                ):(

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
