import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaKey } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as htmlToImage from "html-to-image";

function App() {
  const [value, setValue] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    position: "",
    email: "",
    dob: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [filePreview, setFilePreview] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue((prevValue) => ({
            ...prevValue,
            profilePicture: file,
          }));
          setFilePreview(reader.result); // Update file preview
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { name, value } = e.target;
      setValue((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  const checkFileUpload = () => {
    if (!value.profilePicture) {
      toast.error("Invalid Image", { toastId: "upload-error" });
      setShowForm(true);
      setShowCard(false);
      return false;
    }
    return true;
  };

  const setEditable = () => {
    setShowForm(true);
    setShowCard(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkFileUpload()) return;
    setShowForm(false);
    toast.success("Generated Successfully");
    setShowCard(true);
  };

  const handleDownload = () => {
    const cardContainer = document.getElementById("id-card-container");
    if (!cardContainer) return console.log("Error");

    htmlToImage
      .toPng(cardContainer)
      .then(function (dataUrl) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "id_card.png";
        a.click();
      })
      .catch(function (error) {
        console.error("Error generating image", error);
      });
  };

  return (
    <>
      <div className="min-h-screen p-11 h-full w-full bg-purple-100">
        <h1 className="italic text-2xl md:text-5xl font-black text-center font-poppins   mb-9 md:mb-18">
          ID Card Generator
        </h1>
        <div className=" flex items-center justify-center ">
          <ToastContainer position="top-right" newestOnTop={true} />
          {showForm && (
            <form
              className="w-80 md:w-96 bg-white p-8 border border-purple-400 shadow-md rounded"
              onSubmit={handleSubmit}
            >
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  id="profilePicture"
                  onChange={handleChange}
                  className="font-poppins block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  required
                />
                <label
                  htmlFor="profilePicture"
                  className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Upload Profile Picture
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    value={value.firstName}
                    onChange={handleChange}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="firstName"
                    className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    value={value.lastName}
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="lastName"
                    className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    value={value.phone}
                    onChange={handleChange}
                    type="number"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    value={value.position}
                    onChange={handleChange}
                    type="text"
                    name="position"
                    id="position"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="position"
                    className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Your Position
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={value.company}
                  onChange={handleChange}
                  type="text"
                  name="company"
                  id="company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="company"
                  className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Company
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={value.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={value.dob}
                  onChange={handleChange}
                  type="date"
                  name="dob"
                  id="dob"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="dob"
                  className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  D.O.B.
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={value.address}
                  onChange={handleChange}
                  type="text"
                  name="address"
                  id="address"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="address"
                  className="font-poppins peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Address
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Generate
              </button>
            </form>
          )}

          {showCard && (
            <>
              <div className="flex flex-col items-center ">
                <div id="id-card-container">
                  <div className="max-w-xs mx-auto bg-white p-6 border border-purple-500 shadow-md rounded-lg relative overflow-hidden">
                    <div className="flex flex-col items-center absolute top-0 left-0 w-full h-20 bg-purple-600 ">
                      <h2 className="font-consolas mt-2 text-3xl text-white font-semibold">
                        {value.company}
                      </h2>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 mb-5 mt-8">
                        <img
                          className="w-full h-full object-cover object-center rounded-full"
                          src={filePreview}
                          alt="Profile"
                        />
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: `0 0 19px 1px black`,
                          }}
                        ></div>
                      </div>

                      <h2 className="font-poppins text-2xl font-semibold">
                        {value.firstName} {value.lastName}
                      </h2>
                      <p className="text-gray-600 font-poppins">
                        {value.position}
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <FaKey className="mr-2 text-purple-600" />
                        <span className="font-poppins">
                          {Math.floor(Math.random() * 10000000)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaPhone className="mr-2 text-purple-600" />
                        <span className="font-poppins">{value.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="mr-2 text-purple-600" />
                        <span className="font-poppins">{value.email}</span>
                      </div>

                      <FaMapLocationDot className="absolute mr-2 text-purple-600" />
                      <div className="flex items-center text-gray-600">
                        <span className="font-poppins ml-6">
                          {value.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" p-10 overflow-hidden grid md:grid-cols-2 grid-cols-2 gap-4 md:gap-6">
                  <button
                    type="button"
                    className="w-32 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="w-32 text-purple-700 bg-white hover:bg-purple-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-purple-600"
                    onClick={setEditable}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
