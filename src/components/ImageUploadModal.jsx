import React, { useState, useEffect, useContext,useRef } from "react";
import * as userService from "../../services/userService"


const ImageUploadModal = ({ imageUploadOpen, handleImageUploadModalClose, user }) => {
  const modalRef = useRef(null);

  const [image, setImage] = useState(null);
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
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Call the userService method to handle the upload
      const response = await userService.createUserPicture(user._id, formData);

      if (response && response.status === 200) {
        console.log("Upload successful:", response.data);
        // Optionally update UI or notify the user
      } else {
        throw new Error("Error uploading image");
      }
    } catch (error) {
      setError("Error uploading image.");
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
           <img className=" w-full h-full" src="data:image/png;base64,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"/>
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
              {image ? image.name : "Select an image"}
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
            {loading ? "Uploading..." : "Upload"}
          </button>
        </dialog>
      )}
    </>
  );
};

export default ImageUploadModal;