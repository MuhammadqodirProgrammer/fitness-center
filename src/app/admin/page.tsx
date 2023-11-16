"use client";

import Image from "next/image";
import gantel from "../../../public/images/adminhome1.png";
import teacher from "../../../public/images/admin.jpg";
import user from "../../../public/images/User.png";
import dots from "../../../public/images/Dots.png";
import adminImg2 from "../../../public/images/adminhome2.png";
import adminImg3 from "../../../public/images/adminhome3.png";
import adminImg4 from "../../../public/images/adminhome4.png";
import { Pagination } from "@/components/Pagination/Pagination";
import Bell from "../../../public/images/bell.png";
import gear from "../../../public/images/gear.png";
import admin from "../../../public/images/admin.jpg";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import instance, { baseUrlImg } from "../api/api";

export default function Admin() {
  const { setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const [active, setActive] = useState<string>("light");
  const [display, setDisplay] = useState<string>();
  const [productLength, setproductLength] = useState(0);
  const [clientLength, setclientLength] = useState(0);
  const [teacherLength, setteacherLength] = useState(0);
  const [equipmentLength, setequipmentLength] = useState(0);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const token = localStorage.getItem("token");
  const getTeacher = () => {
    instance
      .get(`/get/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setData(res.data);
        setteacherLength(res.data.length);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getProducts = () => {
    instance
      .get(`/get/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setproductLength(res.data.length);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getEquipments = () => {
    instance
      .get(`/get/equipment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setequipmentLength(res.data.length);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getClient = () => {
    instance
      .get(`/get/client`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setData2(res.data);
        setclientLength(res.data.length);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (active) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    getTeacher();
    getProducts();
    getEquipments();
    getClient();
  }, [active]);

  const handlechange = () => {
    if (active == "light") {
      setActive("dark");
      setTheme("dark");
    } else if (active == "dark") {
      setActive("light");
      setTheme("light");
    }
  };

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!isOffcanvasOpen);
  };

  const [Language, setLanguage] = useState("English");

  const handleLanguageChange = (event: any) => {
    const selectedLanguage = event.target.id;
    const selectedLanguageValue = event.target.textContent;

    setLanguage(selectedLanguageValue);
    localStorage.setItem("lang", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nostrum.";
  const name = "Eshmat Toshmatov";
  // console.log(message.slice(0, 3));

  return (
    <>
      <div className="home_box flex items-stretch justify-between lg:flex-nowrap flex-wrap w-[100%] gap-x-[10px] ">
        <div className="home_main lg:w-[78%] w-[100%]">
          <div className="flex justify-between">
            <h3 className=" font-semibold text-[24px] text-[#303972] dark:text-white  ">
              Dashboard
            </h3>

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
                  className="py-2 text-sm text-white bg-white rounded-xl pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Izlash..."
                  autoComplete="off"
                />
              </div>
            </form>
          </div>

          {/* home information */}
          <div className="flex justify-between lg:gap-0 gap-3 items-center  lg:flex-nowrap flex-wrap rounded-[15px] dark:bg-gray-800 bg-white px-6 mt-[40px] py-6">
            <div className="flex  items-center  gap-x-[50px] lg:gap-x-2">
              <Image src={gantel} className="" alt="img" />

              <div>
                <h3 className=" font-semibold text-[18px] text-[#A098AE] dark:text-white  ">
                  Maxsulotlar
                </h3>

                <p className=" font-semibold text-[36px] text-[#303972] dark:text-white  ">
                  {productLength}
                </p>
              </div>
            </div>

            <div className="flex  items-center gap-x-[50px] lg:gap-x-2">
              <Image src={adminImg2} className="" alt="img" />

              <div>
                <h3 className=" font-semibold text-[18px] text-[#A098AE] dark:text-white  ">
                  Mijozlar
                </h3>

                <p className=" font-semibold text-[36px] text-[#303972] dark:text-white  ">
                  {clientLength}
                </p>
              </div>
            </div>
            <div className="flex  items-center gap-x-[50px] lg:gap-x-2">
              <Image src={adminImg3} className="" alt="img" />

              <div>
                <h3 className=" font-semibold text-[18px] text-[#A098AE] dark:text-white  ">
                  Ustozlar
                </h3>

                <p className=" font-semibold text-[36px] text-[#303972] dark:text-white  ">
                  {" "}
                  {teacherLength}
                </p>
              </div>
            </div>
            <div className="flex  items-center gap-x-[50px] lg:gap-x-2">
              <Image src={adminImg4} className="" alt="img" />

              <div>
                <h3 className=" font-semibold text-[18px] text-[#A098AE] dark:text-white  ">
                  Jihozlar
                </h3>

                <p className=" font-semibold text-[36px] text-[#303972] dark:text-white  ">
                  {" "}
                  {equipmentLength}
                </p>
              </div>
            </div>
          </div>

          {/* home taechers  information */}

          <div className="bg-white p-[28px] my-[40px]  rounded-[15px]  dark:bg-gray-800 ">
            <h3 className="text-[#303972] text-[24px] font-bold ">Ustozlar</h3>
            {/* teacher table  */}

            <div className="relative overflow-x-auto  mt-2">
              <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
                <tbody className="border-none">
                  {data.map((element: any) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between gap-x-2  py-2  ">
                      <td className=" flex items-center gap-x-1 text-[#303972] whitespace-nowrap dark:text-white">
                        <Image
                          src={`${baseUrlImg}/${element.image}`}
                          alt="img "
                          width={100}
                          height={100}
                          className=" lg:w-[44px] lg:h-[44px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                        />

                        <span>{name.slice(0, 12) + `..`}</span>
                      </td>
                      <td className=" text-[#4D44B5] lg:text-[18px] md:text-[16px] text-[14px] ml-[15px] ">
                        ID{element.id}
                      </td>
                      <td className=" flex   items-center gap-x-2 ">
                        <div className="  w-[30px] h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#FB7D5B] ">
                          <Image
                            src={user}
                            className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] "
                            alt="img"
                          />
                        </div>
                        <div>
                          <p className="text-[#A098AE] text-[14px]  "> Toifa</p>
                          <p className="text-[#303972] md:text-[18px] text-[16px] font-bold ">
                            {" "}
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
                      </td>
                      <td>
                        <button className="text-[14px] md:text-[18px] text-[#FCC43E]  bg-[#5D5FEF] md:py-2 py-[8px] md:px-[30px] px-[16px] rounded-[40px]  shadow-[ 0px 20px 50px 0px rgba(191, 21, 108, 0.05)] ">
                          {" "}
                          {element.day}
                        </button>
                      </td>

                      <td className="  ">
                        <Image
                          src={dots}
                          className=" cursor-pointer  "
                          alt="img"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-[20px]">
                <p className="text-[#A098AE] text-[14px]  "> 1-7 dan 232 ta </p>

                <Pagination />
              </div>
            </div>
          </div>
          {/* home teacher information end */}
          {/* clients information startted */}

          <div className="bg-white p-[32px] my-[40px]  rounded-[15px]  dark:bg-gray-800 ">
            <h3 className="text-[#303972] text-[24px] font-bold mb-[20px]">
              Mijozlar
            </h3>
            {/* teacher table  */}

            <div className="relative overflow-x-auto  mt-2">
              <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
                <thead>
                  <tr className="grid grid-cols-4 gap-x-2  py-2   text-[#A098AE] mb-[15px] ">
                    <th className="text-center ">Mijoz</th>
                    <th className="text-center  ">Ustoz</th>
                    <th className="text-center ">Xizmat</th>
                    <th className="text-center  ">Kuni</th>
                  </tr>
                </thead>
                <tbody className="border-none">
                  {data2.map((element: any) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 grid grid-cols-4 items-center gap-x-2  py-2  ">
                      <td className=" flex items-center gap-x-2 text-[#303972] whitespace-nowrap dark:text-white">
                        <Image
                          src={`${baseUrlImg}/${element.image}`}
                          alt="img "
                          width={100}
                          height={100}
                          className=" lg:w-[48px] lg:h-[48px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                        />

                        <span>
                          {(element.username + " " + element.lastName).slice(
                            0,
                            20
                          ) + `..`}
                        </span>
                      </td>

                      <td className=" text-[#A098AE] text-[14px] text-center ">
                        {name.slice(0, 12) + `..`}
                      </td>

                      <td className=" text-[#303972]  md:text-[18px] text-[16px] text-center">
                        300
                      </td>
                      <td className=" text-[#303972]  md:text-[18px] text-[16px] text-center">
                        {element.day == "toq" ? "Du-Chor-Ju" : "Se-Pay-Sha"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-[20px]">
                <p className="text-[#A098AE] text-[14px]  "> 1-7 dan 232 ta </p>

                <Pagination />
              </div>
            </div>
          </div>
          {/* clients information end */}
        </div>
        <div className="right_box lg:w-[22%] w-[100%] bg-white dark:bg-gray-800 py-2 px-2 rounded-[10px] min-h-screen ">
          <div className=" flex items-center justify-between ">
            <div className="flex items-center  gap-x-1">
              <button
                type="button"
                className="menu header_icons_box   "
                onClick={toggleOffcanvas}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="chakra-icon css-13otjrl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Menu_Fries">
                    <path d="M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z" />
                    <path d="M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z" />
                    <path d="M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z" />
                  </g>
                </svg>
              </button>

              <button className=" w-[35px] h-[35px]  md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] flex items-center justify-center rounded-full bg-[#C1BBEB] dark:bg-gray-600  ">
                <Image
                  src={Bell}
                  width={15}
                  height={15}
                  alt="pic"
                  className=" w-[15px] h-[15px]  md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px]"
                />
              </button>

              <div className="dropdown">
                <button className=" w-[35px] h-[35px]  md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] flex items-center justify-center rounded-full bg-[#C1BBEB] dark:bg-gray-600  ">
                  <Image
                    src={gear}
                    width={15}
                    height={15}
                    className=" w-[15px] h-[15px]  md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px]"
                    alt="img"
                  />
                </button>
                <div className="dropdown-content">
                  <button
                    className="w-full   text-white "
                    onClick={handleLanguageChange}
                    id="en"
                  >
                    English
                  </button>
                  <button
                    className="w-full   text-white "
                    onClick={handleLanguageChange}
                    id="uz"
                  >
                    O'zbekcha
                  </button>
                  <button
                    className="w-full   text-white "
                    onClick={handleLanguageChange}
                    id="ru"
                  >
                    Русский
                  </button>

                  <button
                    className="w-full   text-white  "
                    onClick={handlechange}
                  >
                    <ModeToggle />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center  gap-x-1">
              <p className="text-[12px]  text-right text-[#303972] dark:text-white ">
                Komilov M.
                <br />{" "}
                <span className="text-[12px] text-[#A098AE] ">Admin</span>{" "}
              </p>
              <button
                onClick={() => setDisplay("hidden")}
                type="button"
                className=" w-[35px] h-[35px]  md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] flex items-center justify-center rounded-full bg-white dark:bg-gray-600 "
              >
                <Image
                  src={admin}
                  alt="admin img"
                  className="w-[100%] h-[100%] object-cover rounded-full"
                />
              </button>
            </div>
          </div>

          {/* messages start */}
          <h3 className="text-[#303972] text-[24px] font-bold my-[15px] ">
            Xabarlar
          </h3>

          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
              <tbody className="border-none">
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex items-start justify-between gap-x-2  py-2  ">
                  <td className=" flex items-center gap-x-2 ">
                    <Image
                      src={teacher}
                      className=" lg:w-[40px] lg:h-[40px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                      alt="img"
                    />

                    <div>
                      <p className="text-[#303972]  dark:text-white  md:text-[14px] text-[14px] ">
                        {name.slice(0, 9) + `..`}
                      </p>
                      <p className="text-gray-400  dark:text-white md:text-[14px] text-[14px] ">
                        {message.slice(0, 10) + `...`}
                      </p>
                    </div>
                  </td>
                  <td className=" text-gray-300  md:text-[13px] text-[13px]  ">
                    12:59 PM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* messages end */}
        </div>
      </div>
    </>
  );
}
