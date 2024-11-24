import React, { useState, useEffect, useContext,useRef } from "react";
import * as userService from "../../services/userService"
import {Avatar, AvatarImage, AvatarFallback} from "../components/ui/avatar"

const ImageUploadModal = ({ imageUploadOpen, handleImageUploadModalClose, user }) => {
 
  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

  const modalRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(`${BACKEND_URL}/users/${user._id}/images`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (modalRef.current) {
      if (imageUploadOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [imageUploadOpen]);





  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL
      console.log(imageUrl); // Logs the URL
      setImage(imageUrl); // Set the URL to your state
      setImageFile(file)
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault()


    const formData = new FormData();

    formData.append("image", imageFile)

   
    
      const postResponse = await userService.createUserPicture(user._id, formData);
      

    
      const getResponse = await userService.getUserPicture(user._id, postResponse.imagePath )


    
  }
  

  return (
    <>
      {imageUploadOpen && (
        <dialog
          className="image-upload-modal rounded-lg h-1/2 w-1/4 p-4 pt-0 flex flex-col items-center justify-around"
          ref={modalRef}
        >
         
          <div className="flex w-full justify-end h-4">
            <button onClick={handleImageUploadModalClose}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAN5JREFUSEvtlMENwyAMRc0mdJPkiEJ26CqdpF0i4tiM0kGS0JoGKVCMQVVUVQrHxPrP/h8jYOcjdtaHA8A6/FuLzDCcVdfdqDaNMRKWpcnVkBOgOFh7BYCH0voUQ5z4PON/CUJcKAgNeAvcnUAE2Yg3ADAqrVtqymwGq1AAqRFHKBtyDMFpXl2znfuJWAAWRhD8lLVla1cNAAPFzvEkg0/lwAJiz9fQP4L/JmTfubMlFXxunblrGoh7oRpIyaIlAw0g1raq78fqDIqeimmSlHjRHrDPJVPA3qID8P8WPQE1R4kZM35sUAAAAABJRU5ErkJggg=="
                alt="Close"
              />
            </button>
          </div>

         
          <div className="w-full h-3/4 flex flex-col justify-center items-center">
         
         <div className="w-full h-full flex justify-center items-center">
          <Avatar className="h-60 w-60"    >
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
    </div>
           
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            >
              {image ? "Choose Picture" : "Select an image"}
            </label>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

         
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-4 px-4 py-2 rounded-md ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : "Set Profile Picture"}
          </button>
        </dialog>
      )}
    </>
  );
};

export default ImageUploadModal;