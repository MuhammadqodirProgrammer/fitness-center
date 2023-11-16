"use client";

import Header from "@/layout/client/Header/Header";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import user from "../../../../public/images/User.png";
import calendar1 from "../../../../public/images/uil_calender.png";
import PriceIcon from "../../../../public/images/finance.svg";
import SIcon from "../../../../public/images/sIcon.png";
import Edit from "../../../../public/images/edit-2.svg";
import Delete from "../../../../public/images/Icon.svg";
import { BsTelephone } from "react-icons/bs";
import Jihoz from "../../../../public/images/jihoz.png";
import { useEffect, useState } from "react";
import instance, { baseUrlImg } from "@/app/api/api";
export default function Page() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const getEquipment = () => {
    instance
      .get(`/get/equipment/${id}`, {
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
      <Header title="Ustoz" />

      <div className="teacher_box  overflow-hidden  dark:bg-[#1F2937] mt-[40px] bg-white rounded-[20px] w-[100%] h-auto ">
        <div className="bg-[#4D44B5]  dark:bg-[#191074)] h-[83px] flex items-center  ">
          <h4 className=" text-white  ml-[60px] text-[24px] font-bold   ">
            Jihoz ma’lumotlari
          </h4>
        </div>

        <div className="flex items-center md:justify-between  md:flex-nowrap md:gap-3 gap-[25px] flex-wrap  justify-center w-[100%] px-[15px] py-[40px] gap-x-[50px] ">
          <div className=" h-[473px]  rounded-[20px] overflow-hidden bg-[#ECECEC] dark:bg-[#c2b4b4] w-[100%]   md:w-[483px] ">
            <Image
              src={`${baseUrlImg}/${data.image}`}
              alt="img"
              width={100}
              height={100}
              className=" w-[100%] h-[100%]  object-contain   "
            />
          </div>

          <div className="border-solid-[#F5F5F5]  border-[1px] md:w-[60%] w-[100%] h-[466px]  rounded-[20px] px-[15px] py-[25px]  bg-[#F5F5F5] dark:bg-[#F5F5F5]  flex flex-col  justify-between ">
            <div className="flex justify-between  ">
              <h3 className=" text-[#303972] dark:text-[#303972] text-[40px] font-bold   ">
                {data.name}
              </h3>

              <div></div>
            </div>

            <h4 className=" text-[#303972] dark:text-[#303972] text-[40px] font-bold   ">
              {data.type}
            </h4>

            <p className=" text-[#C41F28] dark:text-[#4D44B5] text-[30px] font-bold   ">
              {data.brand}
            </p>

            <div className="flex   items-center justify-between mt-[33px] ">
              <div className=" flex   items-center gap-x-2 ">
                <div className="  w-[30px] h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#ACA5B8] ">
                  <Image
                    src={SIcon}
                    className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] "
                    alt="img"
                  />
                </div>
                <div>
                  <p className="text-[#A098AE] text-[12px]  text-left ">Soni</p>
                  <p className="text-[#303972] md:text-[18px] text-[12px] font-bold text-left ">
                    {data.count}
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
                  <p className="text-[#A098AE] text-[12px]  text-left ">Kuni</p>
                  <p className="text-[#303972] md:text-[12px] text-[12px] font-bold text-left ">
                    ...
                  </p>
                </div>
              </div>

              <div className=" flex   items-center gap-x-2 ">
                <div className="  w-[30px] text-white  h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#ACA5B8] ">
                  <Image
                    src={PriceIcon}
                    className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] "
                    alt="img"
                  />
                </div>
                <div>
                  <p className="text-[#A098AE] text-[12px]  text-left ">
                    Narxi
                  </p>
                  <p className="text-[#FCC43E] md:text-[12px] text-[12px] font-bold text-left ">
                    {data.price}$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-solid-[#F5F5F5]  border-[1px] w-100%] min-h-[400px]  mx-[15px] rounded-[20px] px-[15px] py-[15px]  bg-[#F5F5F5] dark:bg-[#F5F5F5]  flex flex-col  justify-between ">
          <p className=" text-[#A098AE] text-[22px]  font-medium  ">
            {data.description}
          </p>
        </div>

        <div className=" text-right  py-[35px] ">
          <button className="text-[14px] md:text-[18px] font-bold text-[#4D44B5] border-[1px] border-[#4D44B5]  bg-transparent md:py-2 py-[10px] px-[28px]  rounded-[40px]   ">
            Savatga qo’shish
          </button>

          <button className="text-[14px] md:text-[18px] font-bold text-white  mx-[25px]  bg-[#4CBC9A] md:py-2 py-[10px] px-[28px]  rounded-[40px]   ">
            Sotib olish
          </button>
        </div>
      </div>
    </section>
  );
}
