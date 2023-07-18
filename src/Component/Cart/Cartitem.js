import React from "react";

const Cartitem = () => {
  return (
    <div className="flex justify-between items-center max-sm:flex-col basis-[65%]">
      <div className="flex gap-x-4 basis-[50%]">
        <div>
          <Image
            src={thumbnail}
            alt="title"
            width={150}
            height={200}
            style={{ borderRadius: "50%", objectFill: "fill" }}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold max-sm:text-xl">
            Product name:-{title}
          </h3>
          <h4 className="text-lg font-medium">Category:-{category}</h4>
        </div>
      </div>
      <div className="flex justify-between basis-[50%]">
        <div className="flex items-center gap-x-2">
          <button
            className="px-3 py-1 bg-slate-200"
            onClick={() => removeitem(value)}
          >
            -
          </button>
          <h5 className="text-lg font-semibold">{quantity}</h5>
          <button
            className="px-3 py-1 bg-slate-200"
            onClick={() => additem(value)}
          >
            +
          </button>
        </div>
        <button
          onClick={() => deleteProduct(_id)}
          className="w-[100%] max-w-[100px] border-[1px] border-red-600 text-red-600 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Cartitem;
