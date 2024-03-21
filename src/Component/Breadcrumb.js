"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Breadcrumb = ({ title }) => {
  const pathname = usePathname();
  const data=title.substring(0, 1) + " " + title.substring(1);
  return (
      <Link href="/" className="font-semibold text-center block pb-4">
        <span className="text-gray-400">
          Home&nbsp;
        </span>
        <span className={`${pathname === title && "text-red-600"}`}>
          {data}
        </span>
      </Link>
  );
};

export default Breadcrumb;
