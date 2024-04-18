import Link from "next/link";
import React from "react";
import { BsEmojiDizzy } from "react-icons/bs";
const Linkexpired = () => {
  return (
    <div className="flex flex-col leading-10 max-sm:leading-8 max-sm:gap-y-0 gap-y-3 items-center pt-12 pb-14 capitalize">
      <BsEmojiDizzy className="w-[100px] h-[100px] text-[#197693] max-sm:w-[60px] max-sm:h-[60px] mb-4 block"/>
      <h1 className="text-shadow-lg max-sm:text-shadow-sm shadow-[#197693] text-[#f2f2f2] max-sm:text-xl text-5xl font-extrabold">
        Oops, this Link was Expired;
      </h1>
      <p className="text-2xl max-sm:text-base font-bold pt-2 text-[gray]">
        This URL is not Valid anymore..
      </p>
      <Link href="/Authentication/Resetpassword" className="underline text-[#197693] max-sm:text-[14px]">
        Click here to Resend reset password link
      </Link>
    </div>
  );
};

export default Linkexpired;
