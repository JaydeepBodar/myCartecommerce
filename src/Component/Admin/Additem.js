"use client";
import axios from "axios";
import React, { useState } from "react";
const Additem = () => {
  const [title, settitle] = useState("");
  // const [images, setSelectedImages] = useState([]);

  // const handleImageUpload = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const uploadedImages = [];
  //   for (const file of files) {
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("upload_preset", "htepld3m"); // You need to create this in your Cloudinary account
	// 		data.append(
	// 			"public_id",
	// 			"myCarteCommerce/Useprofile/" + name + "_" + new Date()
	// 		);
	// 		data.append("cloud_name", "dxlicroam");
	// 		fetch("https://api.cloudinary.com/v1_1/dxlicroam/image/upload", {
	// 			method: "post",
	// 			body: data,
	// 		}).then((res) => res.json())
  //     .then((data) => {
  //       console.log("data",data)
	// 			setSelectedImages(uploadedImages.push(data.url.tostring));
  //     })
  //   }

	// 	console.log("images",images)
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}api/admin/product`, { title,images:{...images} })
      .then((res) => console.log("ress", res))
      .catch((e) => console.log("e", e));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Enter title"
      />
      <input type="file" multiple onChange={handleImageUpload} />
      <button>submit</button>
    </form>
  );
};

export default Additem;
