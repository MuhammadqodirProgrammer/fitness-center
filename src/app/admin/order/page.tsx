"use client";

import Header from "@/layout/admin/Header/Header";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import down from "../../../../public/images/down.png";

import Delete from "../../../../public/images/Icon.svg";
import Edit from "../../../../public/images/edit-2.svg";
import Link from "../../../../node_modules/next/link";
import { Pagination } from "@/components/Pagination/Pagination";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const notify4 = () => toast.success("Successfully Deleted Teacher");
const notify6 = () => toast.error("Error While Deleting Teacher");

import instance, { baseUrlImg } from "@/app/api/api";
export default function Page() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const getTeacher = () => {
    instance
      .get(`/get/all/order`, {
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
    getTeacher();
  }, []);

  async function handleDelete(evt: any) {
    evt.preventDefault();
    const id = evt.target.id;
    console.log(id);

    let response = await instance.delete(`/delete/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      notify4();
      getTeacher();
    } else {
      notify6();
    }
  }

  const message =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nostrum.";
  const name = "Mirzaev Mirkomil ";
  return (
    <section>
      <Header title="Buyurtmalar" />

      <div className="bg-white p-[32px] my-[40px]  rounded-[15px]  dark:bg-gray-800 ">
        <h3 className="text-[#303972] text-[24px] font-bold mb-[20px]">
          Buyurtmalar
        </h3>
        {/* teacher table  */}

        <div className="relative overflow-x-auto  mt-2">
          <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
            <thead>
              <tr className="grid grid-cols-5 gap-x-2  py-2 pr-[45px]  text-[#A098AE]  dark:text-[]  mb-[15px] ">
                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <input
                    id="check1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label htmlFor="check1" className=" text-sm font-medium  ">
                    I . O . F
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check2" className=" text-sm font-medium  ">
                    Mahsulot
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check3" className=" text-sm font-medium  ">
                    Narxi
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check4" className=" text-sm font-medium  ">
                    Vaqti
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check5" className=" text-sm font-medium  ">
                    dona
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>
              </tr>
            </thead>
            <tbody className="border-none">
              {data.map((element: any) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  pr-[48px] grid grid-cols-5 items-center gap-x-2  py-2  ">
                  <td className=" flex items-center gap-x-2 relative  whitespace-nowrap text-[#303972] dark:text-white">
                    <div>
                      <input
                        id="id1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="id1"
                        className=" w-[100%] absolute h-[100%] top-0 right-0 "
                      >
                        {" "}
                      </label>
                    </div>

                    <Image
                      src={`${baseUrlImg}/${element.Client.image}`}
                      alt="img "
                      width={100}
                      height={100}
                      className=" lg:w-[48px] lg:h-[48px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                    />

                    <div>
                      <p>
                        {(
                          element.Client.username +
                          " " +
                          element.Client.lastName
                        ).slice(0, 20) + `..`}
                      </p>

                      <p>{element.Client.phoneNumber}</p>
                    </div>
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.Product.name}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.Product.price}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.createdAt.split("T")[0]}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white  text-[14px] text-center ">
                    {element.count}
                  </td>

                  <div className=" absolute   right-[15px] flex items-center gap-x-[12px] ">
                    <Image
                      src={Delete}
                      alt="img"
                      className="cursor-pointer"
                      id={element.id}
                      onClick={(evt) => handleDelete(evt)}
                    />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-[20px]">
            <p className="text-[#A098AE]  dark:text-white text-[14px]  ">
              {" "}
              1-7 dan 232 ta{" "}
            </p>

            <Pagination />
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
