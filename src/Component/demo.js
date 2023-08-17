// const [uploading, setUploading] = useState(false);

  // const handleImageChange = (event, setIndex) => {
  //   const files = Array.from(event.target.files).slice(0, 3); // Limit to three images
  //   setSelectedImagesSets((prevSelectedImages) => ({
  //     ...prevSelectedImages,
  //     [setIndex]: files,
  //   })); 
  // };

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
  // 		fetch("https://api.cloudinary.com/v1_1/dxlicroam/imuploadage/", {
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
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const uploadedImagesset = {};
  //   setUploading(true);

  //   for (const [setKey, imageSet] of Object.entries(selectedImagesSets)) {
  //     const uploadedImages = [];
  //     for (const image of imageSet) {
  //       console.log("image", image);
  //       const formData = new FormData();
  //       formData.append("file", image);
  //       formData.append("upload_preset", "htepld3m");
  //       formData.append("cloud_name", "dxlicroam");
  //       const response = await fetch(
  //         "https://api.cloudinary.com/v1_1/dxlicroam/image/upload",
  //         {
  //           method: "post",
  //           body: formData,
  //         }
  //       );

  //       const data = await response.json();
  //       uploadedImages.push(data.secure_url);
  //     }
  //     uploadedImagesset[setKey] = uploadedImages;
  //   }
  //   // axios
  //   //   .post(`${process.env.API_URL}api/admin/product`, { title,images:data })
  //   //   .then((res) => console.log("ress", res))
  //   //   .catch((e) => console.log("e", e));
  //   console.log("data", Object.values(uploadedImagesset));
  //   setUploading(false);
  //   setSelectedImagesSets({
  //     img1: [],
  //     img2: [],
  //     img3: [],
  //   });
  // };

//   'use client'
// import axios from 'axios';
// import React, { useState } from 'react';
// import ImageUpload from './ImageUpload';

// const UploadPage = () => {
//   const [selectedImagesArray, setSelectedImagesArray] = useState([]);
//   const uploadPrest="htepld3m"
//   const handleImagesSelected = (selectedImages) => {
//     setSelectedImagesArray(selectedImagesArray.concat(selectedImages));
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     selectedImagesArray.forEach((image) => {
//       console.log("selectedImagesArray",selectedImagesArray)
//       console.log("imagedatatataatataat",image)
//       formData.append('file', image);
//       formData.append("upload_preset",uploadPrest);
//       formData.append("cloud_name", "dxlicroam");
//     });
//     console.log("formData",formData)
//     try {
//       axios.post(`https://api.cloudinary.com/v1_1/dxlicroam/image/upload`,'POST',formData).then((res)=>console.log("res",res)).catch((e)=>console.log("weeeeee",e))
//       // const response = await fetch(, {
//       //   method: 'POST',
//       //   body: formData,
//       // });

//       // const data = await response.json();
//       // console.log('Uploaded images:', data);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Image Upload Page</h1>
//       <ImageUpload label="Upload Images 1" onImagesSelected={handleImagesSelected} />
//       <ImageUpload label="Upload Images 2" onImagesSelected={handleImagesSelected} />
//       <ImageUpload label="Upload Images 3" onImagesSelected={handleImagesSelected} />
//       <button onClick={handleUpload}>Upload to Cloudinary</button>
//     </div>
//   );
// };

// export default UploadPage;

'use client'
// import React, { useState } from 'react';

// const ImageUpload = ({ label, onImagesSelected,uploadPrest }) => {
//   const [selectedImages, setSelectedImages] = useState([]);

//   const handleImageChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setSelectedImages(selectedFiles);
//     onImagesSelected(selectedImages)
//   };

//   return (
//     <div>
//       <h3>{label}</h3>
//       <input type="file" multiple onChange={handleImageChange} />
//       <div>
//         {selectedImages.map((image, index) => (
//           <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} width="50" height="50" />
//         ))}
//       </div>
//       {/* <button onClick={() => }>Select Images</button> */}
//     </div>
//   );
// };

// export default ImageUpload;
// Display model smartwatch dummy for Apple Watch 4 40mm shows us what the real apple brand smart watch looks like.It is a dummy non-functioning smartwatch, it comes with a simulated color or black screen, 1: 1 scale, firm and durable. It has no electrical circuits and cannot be used as spare parts. You can use it to decorate shop windows, exhibitions, gifts, fairs, telephone shops, etc. Available to buy in black and white.