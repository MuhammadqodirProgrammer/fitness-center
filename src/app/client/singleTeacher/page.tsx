"use client";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import user from "../../../../public/images/User.png";
import calendar1 from "../../../../public/images/uil_calender.png";
import Edit from "../../../../public/images/edit-2.svg";
import Delete from "../../../../public/images/Icon.svg";
import { BsTelephone } from "react-icons/bs";
import Header from "@/layout/client/Header/Header";
import { useEffect, useState } from "react";
import instance, { baseUrlImg } from "@/app/api/api";
export default function Page() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const getTeacher = () => {
    instance
      .get(`/get/teacher/${id}`, {
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
      <Header title={"Mijoz"} />
      <div className="teacher_box  overflow-hidden  dark:bg-[#1F2937] mt-[40px] bg-white rounded-[20px] w-[100%] h-auto pb-6">
        <div className="bg-[#4D44B5]  dark:bg-[#191074)] h-[83px] flex items-center  ">
          <h4 className=" text-white  ml-[60px] text-[24px] font-bold   ">
            Ustozi ma’lumotlari
          </h4>
        </div>

        <div className="flex items-center justify-between  w-[100%] px-[15px] py-[40px] gap-x-[50px] md:flex-nowrap flex-wrap">
          <div className="rounded-full  h-[473px]  overflow-hidden bg-[#ECECEC] dark:bg-[#c2b4b4]  w-[483px] ">
            <Image
              src={`${baseUrlImg}/${data.image}`}
              alt="img"
              width={100}
              height={100}
              className=" w-[100%] h-[100%]  object-cover   "
            />
          </div>

          <div className="border-solid-[#F5F5F5]  border-[1px] w-full   h-[466px]  rounded-[20px] px-[15px] py-[25px]  bg-[#F5F5F5] dark:bg-[#F5F5F5]  flex flex-col  justify-between md:mt-5">
            <div className="flex justify-between  ">
              <h3 className=" text-[#303972] dark:text-[#303972] text-[40px] font-bold   ">
                {data.username + " " + data.lastName}
              </h3>

              <div>
                <p className=" text-[#303972] dark:text-[#303972] text-[20px] font-bold   ">
                  {data.birthday}
                </p>
                <p className=" text-[#303972] dark:text-[#4D44B5] text-[20px] font-bold   ">
                  ID {data.id}
                </p>
              </div>
            </div>

            <h4 className=" text-[#303972] dark:text-[#303972] text-[40px] font-bold   ">
              {new Date().getFullYear() - new Date(data.birthday).getFullYear()}
              yosh
            </h4>

            <div className="flex justify-between  ">
              <h3 className=" text-[#303972] dark:text-[#303972] text-[30px] font-bold my-[15px]  ">
                {data.gender}
              </h3>

              <p className=" text-[#303972] dark:text-[#4D44B5] text-[20px] font-bold   ">
                {data.email}
              </p>
            </div>

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
                    {data.degree == 1
                      ? "I"
                      : data.degree == 2
                      ? "II"
                      : data.degree == 3
                      ? "III"
                      : data.degree == 4
                      ? "IV"
                      : data.degree == 5
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
                  <p className="text-[#A098AE] text-[12px]  text-left ">Kuni</p>
                  <p className="text-[#303972] md:text-[12px] text-[12px] font-bold text-left ">
                    {data.day == "juft"
                      ? "Du-Chor-Ju"
                      : data.day == "juft"
                      ? "Se-Pay-Sha"
                      : ""}
                  </p>
                </div>
              </div>

              <div className=" flex   items-center gap-x-2 ">
                <div className="  w-[30px] text-white  h-[30px] md:w-[48px] md:h-[48px] grid items-center justify-center object-cover rounded-full  bg-[#ACA5B8] ">
                  <BsTelephone className=" w-[16px] h-[16px]  md:w-[24px] md:h-[24px] " />
                </div>
                <div>
                  <p className="text-[#A098AE] text-[12px]  text-left ">Tel:</p>
                  <p className="text-[#303972] md:text-[12px] text-[12px] font-bold text-left ">
                    {data.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-solid-[#F5F5F5]  border-[1px] w-100%] min-h-[400px]  mx-[15px] rounded-[20px] px-[15px] py-[15px]  bg-[#F5F5F5] dark:bg-[#F5F5F5]  flex flex-col  justify-between ">
          <p className=" text-[#A098AE] text-[22px]  font-medium  ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            repudiandae unde tempora eum deleniti vel error, numquam, sed
            facilis quia voluptate? Itaque reprehenderit minus aliquam omnis
            fugiat consectetur dicta impedit molestias tenetur id natus quis,
            nobis, praesentium maxime. Dolorum, cumque asperiores quisquam earum
            amet ducimus autem accusantium, eum esse consequatur perspiciatis
            doloribus numquam hic, nemo velit magni voluptatum quas eligendi
            harum quidem beatae! Recusandae perferendis aspernatur dicta facilis
            odit unde optio harum, voluptates et voluptas at impedit deserunt ab
            explicabo cumque ipsa, obcaecati eos. Sit aperiam ipsam assumenda
            consectetur esse delectus placeat fugit. Repudiandae esse sit
            inventore optio accusantium numquam.
          </p>
        </div>
      </div>
    </section>
  );
}
