"use client";
import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { checkbox } from "../product/checkbox";
import Inputdata from "../Inputdata";
import axios from "axios";
import { useRouter } from "next/navigation";
import Tostify from "../Tostify";
import { toast } from "react-toastify";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import { CiSquarePlus } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const Additem = () => {
  const [Input, setInput] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    discountPercentage: "",
    subcategory: "",
    rating: "",
    featured: false,
    stock: true,
  });
  const { theme } = Globalthemeprovider();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [pic, setPic] = useState();
  const {
    title,
    category,
    description,
    price,
    discountPercentage,
    rating,
    featured,
    subcategory,
 
  } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  // size-color-selection -start
  const [filterarray, settfilterarray] = useState([]);
  const [disable, setdisable] = useState(false);
  const [selection, setselection] = useState({
    size: "",
    color: "",
    quantity: "",
  });
  const { size, color, quantity } = selection;
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setselection({ ...selection, [name]: value });
  };
  const allFilterdata = () => {
    if (color !== "" && quantity !== "") {
      // Add the current selection to the selectionsArray
      settfilterarray([...filterarray, { ...selection }]);
      // Reset the selection state for the next input
      setselection({ size: "", color: "", quantity: "" });
      setdisable(false);
    }

  };
  const handleEditItem = (index) => {
    setselection({ size: size, color: color, quantity: quantity });
    const editedItems = [...filterarray];
    const selectedItem = editedItems[index];
    setselection(selectedItem);
    editedItems.splice(index, 1);
    settfilterarray(editedItems);
  };
  // size-color-selection - end
  // for multiple images
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

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
          const data = await response.json();
          uploadedImages.push(data.secure_url);
        }
      } catch (e) {
        console.log("error", e);
      }
    }

    setImages([...images, ...uploadedImages]);
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
        // console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Input || !images || !pic) {
      toast.error("All field Required");
    } else {
      axios
        .post(`${process.env.API_URL}api/admin/product`, {
          ...Input,
          sizes: filterarray,
          images: images,
          thumbnail: pic,
        })
        .then((res) => console.log("ress", res))
        .catch((e) => console.log("e", e))
        .finally(() => router.push("/"));
    }
  };
  return (
    <React.Fragment>
      <Tostify />
      <div
        className={`${
          theme === true
            ? "bg-[#f2f2f2] text-[#000]"
            : "bg-[#000] text-[#f2f2f2]"
        } w-[100%] border-[1px] border-[#f2f2f2] max-lg:max-w-[500px] max-w-[700px] text-[#000] p-4 mx-[auto] rounded-lg`}
      >
        <h2 className="text-xl text-center font-semibold py-3">
          Add New Products...
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-x-3 gap-y-4 text-[#000]"
        >
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter Product Title..."
            className="basis-[100%]"
          />
          <input
            type="text"
            value={category}
            placeholder="Enter Product Category..."
            name="category"
            className="bg-white basis-[49%] max-lg:basis-[100%]"
            onChange={handleChange}
          />
          <select
            value={featured}
            name="featured"
            onChange={handleChange}
            className="bg-white text-[#000] basis-[49%] max-lg:basis-[100%]"
          >
            <option value={false}>featured false</option>
            <option value={true}>featured true</option>
          </select>
          <input
            type="text"
            name="subcategory"
            value={subcategory}
            onChange={handleChange}
            placeholder="Enter Sub Category..."
            className="basis-[49%]"
          />
          <input
            type="Number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Product Price..."
            className="basis-[100%]"
          />
          <div className="w-[100%]">
            <h4 className="font-semibold pb-3">Upload Products Image</h4>
            <div className="flex justify-start">
              {images.map((image, index) => {
                return (
                  <div className="basis-[33%] mx-[auto]" key={index}>
                    <Image
                      src={image}
                      loading="lazy"
                      alt={title}
                      width={90}
                      height={90}
                      className="w-[100px] h-[100px] rounded-full"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between max-sm:flex-col max-sm:gap-y-2">
              <input type="file" onChange={handleImageUpload} />
              <input type="file" onChange={handleImageUpload} />
              <input type="file" onChange={handleImageUpload} />
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
          <div className="text-left basis-[100%] flex flex-col gap-y-2">
            <h4>For Size,Color,Quantity filter</h4>
            <div className="flex gap-x-4 gap-y-2 flex-wrap">
              <input
                className="flex-1 max-sm:basis-[100%]"
                type="text"
                value={size}
                name="size"
                onChange={(e) => handleFilter(e)}
              />
              <input
                className="flex-1 max-sm:basis-[100%]"
                type="number"
                value={quantity}
                name="quantity"
                onChange={(e) => handleFilter(e)}
              />
              <input
                className="bg-[#fff] h-[43px] flex-1 max-sm:basis-[100%]  "
                type="color"
                value={color}
                name="color"
                onChange={(e) => handleFilter(e)}
              />
            </div>
            <div>
              <CiSquarePlus
                className="fill-[#197693] text-[24px] font-bold"
                onClick={allFilterdata}
              />
            </div>
          </div>
          {filterarray?.length > 0 && (
            <table className="w-[100%] text-center max-sm:text-[13px]">
              <tr>
                <th>sr</th>
                <th>size</th>
                <th>color</th>
                <th>quantity</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {filterarray?.map((val, index) => {
                const { quantity, size, color } = val;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{size}</td>
                    <td>
                      <span
                        style={{ backgroundColor: color }}
                        className="block mx-[auto] w-[15px] h-[15px] rounded-full"
                      ></span>
                    </td>
                    <td>{quantity}</td>
                    <td onClick={() => handleEditItem(index)}>
                      <button
                        type="button"
                        disabled={disable === true}
                        onClick={() => setdisable(true)}
                      >
                        <FaEdit
                          className={`${
                            disable === true && "opacity-50"
                          } fill-[#197693] text-xl font-bold mx-[auto] opacity-100`}
                        />
                      </button>
                    </td>
                    <td>
                      <button type="button">
                        <MdDeleteOutline className="fill-[#197693] text-xl font-bold mx-[auto]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
          <input
            type="number"
            name="discountPercentage"
            value={discountPercentage}
            onChange={handleChange}
            placeholder="Product Discount..."
            className="basis-[49%] max-lg:basis-[100%]"
          />
          <input
            name="rating"
            type="number"
            value={rating}
            onChange={handleChange}
            placeholder="Product Rating..."
            className="basis-[49%] max-lg:basis-[100%]"
          />
          <div className="flex items-center gap-x-2 my-2">
            <Image
              src={
                !pic
                  ? "https://img.freepik.com/free-photo/wooden-product-display-podium-with-blurred-nature-leaves-background-generative-ai_91128-2268.jpg?w=826&t=st=1692270624~exp=1692271224~hmac=2931a6d30fa3f7cc79eca75f8d43dff0e7fb0c40441ea99666133dcf22836b32"
                  : pic
              }
              width={90}
              height={90}
              alt={title}
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
          <div className="text-center w-[100%]">
            <button className="mt-3 text-center py-2 w-[100%] font-semibold border-[1px] bg-[#197693] text-white rounded-lg tracking-wide">
              submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Additem;
