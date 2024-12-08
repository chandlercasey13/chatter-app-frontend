import React, { useState, useEffect, useContext,useRef } from "react";
import * as userService from "../../services/userService"
import {Avatar, AvatarImage, AvatarFallback} from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ImageUploadModal = ({ imageUploadOpen, handleImageUploadModalClose, user, handleSignOut, image, imageFile , handleImageChange }) => {
 
  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

  const modalRef = useRef(null);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buttonMessage, setButtonMessage] = useState('Set Profile Picture');

  useEffect(() => {
    if (modalRef.current) {
      if (imageUploadOpen) {
        modalRef.current.showModal();
        // document.addEventListener("click", handleOutsideClick);
      } else {
        modalRef.current.close();
        // document.removeEventListener("click", handleOutsideClick);
      }
    }
  }, [imageUploadOpen]);





  
 

  const handleUpload = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append("image", imageFile)



    try {
      const postResponse = await userService.createUserPicture(user._id, formData);
      setLoading(true);
      if (postResponse) { 

        
        
          // Assuming successful postResponse means successful upload
          await userService.getUserPicture(user._id, postResponse.imagePath);
           // Set loading to "success" on success
          





          // Reset the message back to default after 3 seconds
          setTimeout(() => {
              setLoading(false);

          }, 1000); // 3000ms = 3 seconds
      }
  } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false); // Reset loading in case of error
  }
    
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current && modalRef.current.open && !modalRef.current.contains(event.target)) {
      
      console.log('bruh')
      handleImageUploadModalClose();
    }
  };





  return (
    <>





      {imageUploadOpen && (



        <dialog
          className={`image-upload-modal mr-2 mt-2 rounded-lg h-1/4 w-1/2 max-w-40  p-4  flex flex-col items-center justify-around transition-transform duration-300 
          ${
            imageUploadOpen ? "translate-x-0" : "translate-x-full"
          }`}
          ref={modalRef}
        >
         
          <div className="flex w-full justify-end h-6">
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
           
          </div>

          <div className="w-full flex justify-center items-center h-10 p-2  ">
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

         <div className="w-full flex justify-center items-center p-2 pb-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={` px-4 py-2 rounded-md ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading ? "Uploading..." : `${buttonMessage}`}



            
          </button>
          </div>
          <div className="w-full h-10 ">
          <button onClick={handleSignOut} className="text-red-500 border-t border-gray-300 w-full p-2 pt-3">
            Sign Out
          </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ImageUploadModal;