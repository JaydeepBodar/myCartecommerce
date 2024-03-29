"use client";
import React, { useState,useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { checkbox } from "../product/checkbox";
import Inputdata from "../Inputdata";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Productupdate = ({ product }) => {
  const router = useRouter();
  const [Input, setInput] = useState({
    title: product?.title,
    category: product?.category,
    description: product?.description,
    price: product?.price,
    discountPercentage: product?.discountPercentage,
    rating: product?.rating,
    stock: product?.stock,
    featured: product?.featured,
  });
  const [images, setImages] = useState([
    product.images[0],
    product.images[1],
    product.images[2],
  ]);
  const [pic, setPic] = useState(product?.thumbnail);
  const {
    title,
    category,
    description,
    price,
    discountPercentage,
    rating,
    stock
  } = Input;
  const[featured,setfeatured]=useState(false)
  // console.log("producteeeeeeeeeeeee",stock)
  // console.log("title", title);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  console.log("category", description);
  // for multiple images
  const handleImageUpload = async (e, index) => {
    const files = e.target.files;
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "htepld3m"); // Set your Cloudinary upload preset
      formData.append("cloud_name", "dxlicroam");
      formData.append(
        "public_id",
        "myCarteCommerce/Product/" + title + "_" + new Date()
      );
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dxlicroam/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          // console.log("imagesindex",index)
          const data = await response.json();
          const dataimages = images.splice(index, 1, data.secure_url);
          // console.log("firstimages",images)
        }
      } catch (e) {
        console.log("error", e);
      }
    }
    setImages([...images]);  
  };
  // for single images
  const uploadImg = (pics) => {
    // console.log("picssssssssssssssssssss", pics);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "htepld3m");
    data.append(
      "public_id",
      "myCarteCommerce/Product/" + title + "_" + new Date()
    );
    data.append("cloud_name", "dxlicroam");
    fetch("https://api.cloudinary.com/v1_1/dxlicroam/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const[featredval,setfeatredval]=useState(discountPercentage)
  // useEffect(() => {
  //     if(featured === true){
  //       setfeatredval(discountPercentage+10)
  //     }else{
  //       setfeatredval(discountPercentage)
  //     }
  // }, [featured]);
  // console.log("featuredfeaturedfeatured",featredval)
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("imagesss",images )
    axios
      .put(`${process.env.API_URL}api/admin/product/${product?._id}`, {
        ...Input,
        featured,
        // discountPercentage:featredval,
        images: images,
        thumbnail: pic,
      })
      .then((res) => toast.success(res.data.message))
      .catch((e) => console.log("e", e))
      .finally(() => {
        router.refresh(), router.push("/User/Admin/Allproduct");
      });
  };
  return (
    <div className="w-[100%] max-lg:max-w-[500px] max-w-[700px] bg-[#f2f2f2] p-4 mx-[auto] rounded-lg">
      <h2 className="text-xl text-center font-semibold py-3">
        Update Product details
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-3 gap-y-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Enter Product Title..."
          className="basis-[100%]"
        />
        <select
          value={category}
          name="category"
          className="bg-white basis-[49%] max-lg:basis-[100%]"
          onChange={handleChange}
        >
          {checkbox.map((val, index) => {
            return (
              <option key={index} value={val.value}>
                {val.label}
              </option>
            );
          })}
        </select>
        <select
          value={featured}
          name="featured"
          onChange={()=>setfeatured(data=>!data)}
          className="bg-white basis-[49%] max-lg:basis-[100%]"
        >
          <option value={false}>featured false</option>
          <option value={true}>featured true</option>
        </select>
        <input
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
          placeholder="Product Price..."
          className="basis-[100%]"
        />
        <div className="w-[100%]">
          <h4 className="font-semibold pb-3">Upload Products Image</h4>
          <div className="flex justify-between">
            {images.map((image, index) => {
              return (
                <Image
                  key={index}
                  alt={title}
                  loading="lazy"
                  src={image}
                  width={90}
                  height={90}
                  className="w-[100px] h-[100px] rounded-full mx-[auto]"
                />
              );
            })}
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-y-2">
            <input type="file" onChange={(e) => handleImageUpload(e, 0)} />
            <input type="file" onChange={(e) => handleImageUpload(e, 1)} />
            <input type="file" onChange={(e) => handleImageUpload(e, 2)} />
          </div>
        </div>
        <textarea
          name="description"
          value={description}
          onChange={handleChange}
          row="4"
          className="w-[100%]"
          placeholder="Enter your Product description..."
        ></textarea>
        <input
          type="text"
          name="discountPercentage"
          value={discountPercentage}
          onChange={handleChange}
          placeholder="Product Discount..."
          className="basis-[49%] max-lg:basis-[100%]"
        />
        <input
          name="rating"
          type="text"
          value={rating}
          onChange={handleChange}
          placeholder="Product Rating..."
          className="basis-[49%] max-lg:basis-[100%]"
        />
        <div className="flex items-center justify-between w-[100%] max-lg:flex-col max-lg:gap-y-2">
          <div className="flex items-center gap-x-2 my-2 basis-[49%] max-lg:basis-[100%]">
            <Image
              src={
                !pic
                  ? "https://img.freepik.com/free-photo/wooden-product-display-podium-with-blurred-nature-leaves-background-generative-ai_91128-2268.jpg?w=826&t=st=1692270624~exp=1692271224~hmac=2931a6d30fa3f7cc79eca75f8d43dff0e7fb0c40441ea99666133dcf22836b32"
                  : pic
              }
              width={90}
              alt={title}
              height={90}
              loading="lazy"
              className="rounded-full object-fill w-[80px] h-[80px]"
            />
            <Inputdata
              // name='image'
              type="file"
              onChange={(e) => uploadImg(e.target.files[0])}
              id="formFile"
              label="Upload Title Image"
              data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
              className="flex-col"
            />
          </div>
          <select
            name="stock"
            value={stock}
            onChange={handleChange}
            className="basis-[49%] max-lg:basis-[100%] bg-white max-lg:w-[100%]"
          >
            <option name="stock" value="Out of Stock">
              Out of Stock
            </option>
            <option name="stock" value="InStock">
              Instock
            </option>
          </select>
        </div>
        <div className="text-center w-[100%]">
          <button className="mt-3 text-center py-2 w-[100%] font-semibold border-[1px] bg-red-600 text-white rounded-lg tracking-wide">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Productupdate;
