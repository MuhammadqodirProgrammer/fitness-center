"use client";
import { useRef, useState } from "react";
import instance from "../api/api";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useTranslation } from "react-i18next";
import logo from "../../../public/images/logo1.png";
import hand from "../../../public/images/hand.png";
import eye from "../../../public/images/eye-invisible.png";
import info from "../../../public/images/information.png";
import dots from "../../../public/images/Caurusel (1).png";
import phone from "../../../public/images/phone-icon.png";
import Image from "../../../node_modules/next/image";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log(router);
  // const router = useRouter();
  const { t } = useTranslation();

  const [error, seterror] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const verifyRef = useRef<any>();
  const HendleSubmit = async (e: any) => {
    e.preventDefault();

    const verifyCode = verifyRef.current?.value;
    const data = {
      verifyCode,
    };
    console.log(data);

    let response = await instance.post("/auth/verify", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    console.log(response.data);

    if (response.status === 200) {
      let token = response?.data?.token;
      let role = response?.data?.role;
      let id = response?.data?.id;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

      if (role == "admin") {
        router.replace("/admin");
      } else if (role == "client") {
        router.replace("/client");
      }
    } else {
      console.log(response.data);
      seterror(true);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <section className=" flex w-[100%] md:flex-nowrap flex-wrap h-[100vh] bg-[teal] ">
      <div className="left py-[30px] md:w-[50%] w-[100%] bg-[#E2F0FF]  flex items-center justify-center  ">
        <div className="left_box text-center ">
          <Image
            src={logo}
            alt="img"
            className=" w-[380px] h-[300px] objetct-cover   "
          />

          <h3 className=" text-[#292731] text-[26px]  my-[20px] "> Verify </h3>

          <p className="  text-[#292731] text-[26px]  my-[20px]  ">
            qiaqacha ta’rif
          </p>

          <Image src={dots} alt="img" className=" mx-auto " />
        </div>
      </div>

      <div className="right py-[30px] md:w-[50%] w-[100%] bg-[#FFFFFF]   flex items-center justify-center  ">
        <div className=" md:w-[60%]  w-[80%] mx-auto ">
          <h4 className=" text-[#292731] text-[30px]  text-center font-bold my-[20px]  ">
            Second Step Verification
          </h4>

          <Image
            src={phone}
            alt="img"
            className="objetct-cover mb-2  mx-auto "
          />

          <p className=" text-[#292731] text-[16px] text-center  font-normal my-[20px]  ">
            Enter the verification code we sent to <br />
            <span className=" text-[#66BCE8] text-[16px] font-medium  my-[18px] ">
              demo@gmail.com{" "}
            </span>
          </p>

          <form className="" onSubmit={HendleSubmit}>
            <div className="mb-4  md:w-full">
              <input
                className="w-full
        px-4
        py-2
        my-[20px]
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                type="number"
                placeholder="Type code here"
                ref={verifyRef}
              />
            </div>

            <button
              className="bg-[#4C70FF] hover:bg-[#254dee] text-white uppercase text-sm font-semibold px-4 py-2 rounded-[8px]   w-[100%]  "
              type="submit"
            >
              Submit
            </button>

            <p className=" text-[#292731] text-[16px] text-center  font-normal my-[20px]  ">
              Didn’t gate the code?
              <a
                href="#"
                className="   text-[#66BCE8] text-[16px] font-medium "
              >
                {" "}
                Resend{" "}
              </a>
            </p>

            <a
              href="#"
              className="  block  text-[#66BCE8] text-[16px] font-medium  my-[18px] text-center "
            >
              {" "}
              Call me{" "}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
