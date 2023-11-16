"use client";
import Header from "@/layout/admin/Header/Header";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import user from "../../../../public/images/User.png";
import calendar1 from "../../../../public/images/uil_calender.png";
import Edit from "../../../../public/images/edit-2.svg";
import Delete from "../../../../public/images/Icon.svg";
import Link from "../../../../node_modules/next/link";
import { useEffect, useState } from "react";
import instance, { baseUrlImg } from "@/app/api/api";
export default function Page() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const getTeacher = () => {
    instance
      .get(`/get/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTeacher();
  }, []);
  return (
    <section>
      <Header title={"Ustozlar"} />

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

      <div className="teachers_box gird  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  ">
        {data.map((element: any) => (
          <div className="relative teacher_card dark:bg-[#1F2937] h-[352px] text-center rounded-[20px] bg-white  pt-[16px] pb-[23px] px-[19px]">
            <Link
              href="/client/singleTeacher"
              className="  "
              onClick={() => {
                window.localStorage.setItem("id", element.id);
              }}
            >
              <Image
                src={`${baseUrlImg}/${element.image}`}
                alt="img "
                width={100}
                height={100}
                className=" rounded-full w-[160px] h-[160px] object-cover  mx-auto "
              />

              <h4 className=" text-[#303972]  text-[18px]  font-bold ">
                {element.username + " " + element.lastName}
              </h4>

              <p className=" text-[18px] text-[#4D44B5] font-bold ">
                ID {element.id}
              </p>

              <div className="flex   items-center justify-between mt-[33px] ">
                <div className=" flex   items-center gap-x-2 ">
                  <div className="  w-[30px] h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#ACA5B8] ">
                    <Image
                      src={user}
                      className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] "
                      alt="img"
                    />
                  </div>
                  <div>
                    <p className="text-[#A098AE] text-[12px]  text-left ">
                      Toifa
                    </p>
                    <p className="text-[#303972] md:text-[18px] text-[12px] font-bold text-left ">
                      {element.degree == 1
                        ? "I"
                        : element.degree == 2
                        ? "II"
                        : element.degree == 3
                        ? "III"
                        : element.degree == 4
                        ? "IV"
                        : element.degree == 5
                        ? "V"
                        : undefined}
                    </p>
                  </div>
                </div>

                <div className=" flex   items-center gap-x-2 ">
                  <div className="  w-[30px] text-white  h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#ACA5B8] ">
                    <Image
                      src={calendar1}
                      className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] "
                      alt="img"
                    />
                  </div>
                  <div>
                    <p className="text-[#A098AE] text-[12px]  text-left ">
                      Kuni
                    </p>
                    <p className="text-[#303972] md:text-[12px] text-[12px] font-bold text-left ">
                      {element.day}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
