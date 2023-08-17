"use client";
import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
const CloudinaryUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "htepld3m"); // Set your Cloudinary upload preset
      formData.append("cloud_name", "dxlicroam");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dxlicroam/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          uploadedImages.push(data.secure_url);
        }
      } catch (e) {
        console.log("error", e);
      }
    }

    setImages([...images, ...uploadedImages]);
  };
  console.log("imagesssssssss", images);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <input type="file" onChange={handleImageUpload} />
      <input type="file" onChange={handleImageUpload} />

      <CloudinaryContext cloudName="dxlicroam">
        {images.map((image, index) => (
          <Image
            key={index}
            publicId={image}
            width="150"
            height="150"
            crop="scale"
          />
        ))}
      </CloudinaryContext>
    </div>
  );
};

export default CloudinaryUploader;
