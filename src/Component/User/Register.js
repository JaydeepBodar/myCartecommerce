"use client";
import React from "react";
import Container from "@/Component/Container";
import { useFormik } from "formik";
import Inputdata from "@/Component/Inputdata";
import { env } from "@/config/env";
import Link from "next/link";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Tostify from "@/Component/Tostify";
import { usePathname, useRouter } from "next/navigation";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Register = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {theme}=Globalthemeprovider()
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        role: pathname === "/User/Admin/Register" ? "Admin" : "user",
      },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .max(30, "Name should be maximum 30 character")
          .min(7, "Name should be maximum 7 character")
          .required("Name must be required"),
        email: yup.string().required("Email must be Required"),
        password: yup
          .string()
          .required("Password must Required")
          .min(8, "password length min 8 character"),
      }),
      onSubmit: (values, actions) => {
        axios
          .post(`${env.APIURL}api/auth/Register`, values)
          .then((res) => {
            router.push("/Authentication/login"), actions.resetForm();
          })
          .catch((e) => {
            if (e.response.status === 400) {
              toast.warn(e.response.data.message);
            }
          });
        // console.log("value", values);
      },
    });
  return (
    <React.Fragment>
      <Tostify />
      <Container>
        <div
          className={`${
            errors.name || errors.email || errors.password
              ? "h-[auto]"
              : "h-[90vh]"
          } md:mb-[4px] py-5 flex flex-col justify-center items-center`}
        >
          <div className={`${theme === true ? "bg-[#f2f2f2] text-[#000]" : "bg-[#000] text-[#f2f2f2]"} w-[500px] border-[1px] max-sm:max-w-[100%] mx-[auto] max-sm:px-10 max-sm:py-12 rounded-lg px-16 py-14`}>
            <h4 className="text-center font-semibold text-3xl mb-4 tracking-normal">
              {pathname === "/User/Admin/Register" ? (
                <span>Admin</span>
              ) : (
                <span>User</span>
              )}{" "}
              Sign up...
            </h4>
            <form onSubmit={handleSubmit}>
              <Inputdata
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
                placeholder="Enter your Name..."
                label="Name"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] text-[#000] rounded-lg outline-none"
                className="flex-col"
              />
              {errors.name && touched.name ? (
                <p className="text-[red]">{errors.name}</p>
              ) : (
                ""
              )}
              <Inputdata
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                placeholder="Enter your Email..."
                label="Email"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
              {errors.email && touched.email ? (
                <p className="text-[red]">{errors.email}</p>
              ) : (
                ""
              )}
              <Inputdata
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                name="password"
                placeholder="Enter Your password..."
                label="password"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
              {errors.password && touched.password ? (
                <p className="text-[red]">{errors.password}</p>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#dc2626] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
              >
                Sign up
              </button>
            </form>
            <Link
              href="/Authentication/login"
              className="pt-2 flex justify-center hover:text-red-600 transition-all duration-500"
            >
              Alreday an Account...
            </Link>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Register;
