"use client";

import Header from "@/layout/client/Header/Header";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import user from "../../../../public/images/User.png";
import calendar1 from "../../../../public/images/uil_calender.png";
import Edit from "../../../../public/images/edit-2.svg";
import Jihoz from "../../../../public/images/jihoz.png";
import Product from "../../../../public/images/gener.png";
import Delete from "../../../../public/images/Icon.svg";
import Link from "../../../../node_modules/next/link";
import { Pagination } from "@/components/Pagination/Pagination";
import instance, { baseUrlImg } from "@/app/api/api";
import { useEffect, useState } from "react";

export default function Page() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const getEquipment = () => {
    instance
      .get(`/get/equipment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getEquipment();
  }, []);
  return (
    <section>
      <Header title="Jihozlar" />

      <div className="flex justify-between items-center my-[35px]">
        <form>
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="py-3 text-sm text-white bg-white rounded-[20px] pl-[40px] focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Izlash..."
              autoComplete="off"
            />
          </div>
        </form>
      </div>

      <div className="  bg-white rounded-[20px] px-[20px] py-[30px] ">
        <div className=" gird  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  ">
          {data.length
            ? data.map((element: any) => (
                <Link
                  href="/client/singleEquipment"
                  className="teacher_card dark:bg-[#1F2937]    min-h-[352px] text-center rounded-[20px] bg-[#C1BBEB]  pt-[15px] pb-[23px] px-[15px] "
                  onClick={() => {
                    window.localStorage.setItem("id", element.id);
                  }}
                >
                  <div className="rounded-[15px] bg-white relative  w-auto h-[255px] overflow-hidden ">
                    <Image
                      src={`${baseUrlImg}/${element.image}`}
                      alt="img "
                      width={100}
                      height={100}
                      className="  w-[100%] h-[100%] object-contain   "
                    />
                  </div>

                  <div className="flex   items-center justify-between mt-[10px] ">
                    <h4 className=" text-[#303972]  text-[18px]  font-bold ">
                      {element.name}
                    </h4>

                    <p className="text-[#C11030] text-[18px]  font-bold text-left ">
                      {element.brand}
                    </p>
                  </div>

                  <div className="flex   items-center justify-between mt-[10px] ">
                    <h4 className=" text-[#5C63A3]  text-[18px]  font-bold ">
                      {element.type}
                    </h4>

                    <p className="text-[#1128FA] text-[18px] font-bold text-left ">
                      {element.price}$
                    </p>
                  </div>
                </Link>
              ))
            : "Not found"}
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <p className="text-[#A098AE] text-[14px]  "> 1-7 dan 232 ta </p>

          <Pagination />
        </div>
      </div>
    </section>
  );
}
