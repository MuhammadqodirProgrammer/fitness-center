"use client";

import Header from "@/layout/admin/Header/Header";
import Image from "../../../../node_modules/next/image";
import teacher from "../../../../public/images/admin.jpg";
import user from "../../../../public/images/User.png";
import calendar1 from "../../../../public/images/uil_calender.png";
import Edit from "../../../../public/images/edit-2.svg";
import Delete from "../../../../public/images/Icon.svg";
import Link from "../../../../node_modules/next/link";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import instance, { baseUrlImg } from "@/app/api/api";
import { Modal } from "@/components/Modal/Modal";
const notify = () => toast.success("Successfully Created Teacher");
const notify2 = () => toast.error("Error While Creating Teacher");
const notify3 = () => toast.success("Successfully Edited Teacher");
const notify4 = () => toast.success("Successfully Deleted Teacher");
const notify5 = () => toast.error("Error While Editing Teacher");
const notify6 = () => toast.error("Error While Deleting Teacher");

export default function Page() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [singledata, setSingleData] = useState<any>([]);
  const [Id, setID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editshowModal, setEditShowModal] = useState(false);
  const getTeacher = () => {
    instance
      .get(`/get/teacher`, {
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

  const handleOneGet = () => {
    instance
      .get(`/get/teacher/${Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setSingleData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTeacher();
    handleOneGet();
  }, []);

  const nameRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const typeRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const dayRef = useRef<any>(null);
  const birhtdayRef = useRef<any>(null);
  const jinsRef = useRef<any>(null);

  // edit

  const editnameRef = useRef<any>(null);
  const editsurnameRef = useRef<any>(null);
  const editphoneRef = useRef<any>(null);
  const editinfoRef = useRef<any>(null);
  const edittypeRef = useRef<any>(null);
  const editimageRef = useRef<any>(null);
  const editemailRef = useRef<any>(null);
  const editdayRef = useRef<any>(null);
  const editbirhtdayRef = useRef<any>(null);
  const editjinsRef = useRef<any>(null);

  async function handleCreate(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("username", nameRef?.current.value);
    data.append("lastName", surnameRef?.current.value);
    data.append("phoneNumber", phoneRef?.current.value);
    data.append("degree", typeRef?.current.value);
    data.append("description", infoRef?.current.value);
    data.append("image", imageRef?.current.files[0]);
    data.append("email", emailRef?.current.value);
    data.append("day", dayRef?.current.value);
    data.append("birthday", birhtdayRef?.current.value);
    data.append("gender", jinsRef?.current.value);

    let response = await instance.post("/post/teacher", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      notify();
      setShowModal(false);
      getTeacher();
    } else {
      notify2();
    }
  }

  async function handleDelete(evt: any) {
    evt.preventDefault();
    const id = evt.target.id;
    console.log(id);

    let response = await instance.delete(`/delete/teacher/${id}`, {
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

  async function handleEditSubmit(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("username", editnameRef?.current.value);
    data.append("lastName", editsurnameRef?.current.value);
    data.append("phoneNumber", editphoneRef?.current.value);
    data.append("degree", edittypeRef?.current.value);
    data.append("description", editinfoRef?.current.value);
    data.append("image", editimageRef?.current.files[0]);
    data.append("email", editemailRef?.current.value);
    data.append("day", editdayRef?.current.value);
    data.append("birthday", editbirhtdayRef?.current.value);
    data.append("gender", editjinsRef?.current.value);

    let response = await instance.put(`/put/teacher/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      notify3();
      setEditShowModal(false);
      getTeacher();
    } else {
      notify5();
    }
  }

  return (
    <section>
      <Header title={showModal ? "Yangi ustoz qo’shish" : "Ustozlar"} />

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

        <button
          className="text-[14px] md:text-[18px] font-bold text-white  bg-[#5D5FEF] md:py-2 py-[8px] md:px-[45px] px-[16px] rounded-[40px]  shadow-[ 0px 20px 50px 0px rgba(191, 21, 108, 0.05)] "
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        {showModal ? (
          <Modal
            setModal={setShowModal}
            modal={showModal}
            title="Create Teacher"
            width="5px"
          >
            <form className={`modal-content w-full`} onSubmit={handleCreate}>
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#name"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Ism *
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Maria"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={nameRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#surname"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Sharifi *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    placeholder="Historia"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={surnameRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#phone"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Telefon raqami *
                  </label>
                  <input
                    type="number"
                    id="phone"
                    placeholder="+998941234567"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={phoneRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Toifa *
                  </label>
                  <select
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={typeRef}
                  >
                    <option className="text-inputColor" value="1">
                      Birinchi toifa
                    </option>
                    <option className="text-inputColor" value="2">
                      Ikkinchi toifa
                    </option>
                    <option className="text-inputColor" value="3">
                      Uchinchi toifa
                    </option>
                    <option className="text-inputColor" value="4">
                      To'rtinchi toifa
                    </option>
                    <option className="text-inputColor" value="5">
                      Beshinchi toifa
                    </option>
                  </select>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#info"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Ma’lumot *
                  </label>
                  <textarea
                    ref={infoRef}
                    id="info"
                    rows={5}
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ></textarea>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label className="text-labelColor text-[18px] font-bold">
                    Rasmi *
                  </label>
                  <input
                    type="file"
                    ref={imageRef}
                    id="file"
                    placeholder="+998941234567"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] hidden "
                  />
                  <label
                    htmlFor="file"
                    className="w-[175px] border border-inputBorder border-dashed h-[145px] text-inputColor flex items-center justify-center text-[14px] px-2 cursor-pointer"
                  >
                    Drag and drop or click here to select file
                  </label>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#email"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Gmail *
                  </label>
                  <input
                    type="email"
                    ref={emailRef}
                    id="email"
                    placeholder="demo@gmail.com"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  />
                </div>

                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Kuni *
                  </label>
                  <select
                    id="type"
                    ref={dayRef}
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  >
                    <option className="text-inputColor" value="toq">
                      Du-Chor-Ju
                    </option>
                    <option className="text-inputColor" value="juft">
                      Se-Pay-Sha
                    </option>
                  </select>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#birthday"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Tug’ilgan sanasi *
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    ref={birhtdayRef}
                    placeholder="Historia"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Jinsi *
                  </label>
                  <select
                    ref={jinsRef}
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  >
                    <option className="text-inputColor" value="male">
                      Erkak
                    </option>
                    <option className="text-inputColor" value="female">
                      Ayol
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-[100%] flex justify-end gap-6 mt-2 mb-3">
                <button
                  className="border-[2px] rounded-[40px] p-[14px] border-btnBg text-btnBg hover:bg-btnBg hover:text-white transition-all"
                  type="submit"
                >
                  Saqalsh
                </button>
                <button
                  className="border-[2px] rounded-[40px] p-[14px]  bg-btnBg text-white hover:border-btnBg hover:text-btnBg hover:bg-white transition-all"
                  type="submit"
                >
                  Qo’shish
                </button>
              </div>
            </form>
          </Modal>
        ) : (
          ""
        )}
        {editshowModal ? (
          <Modal
            setModal={setEditShowModal}
            modal={editshowModal}
            title="Edit Teacher"
            width="5px"
          >
            <form
              className={`modal-content w-full`}
              onSubmit={handleEditSubmit}
            >
              <div className="grid grid-cols-2 gap-6 w-full">
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#name"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Ism *
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={singledata[0]?.username}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={editnameRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#surname"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Sharifi *
                  </label>
                  <input
                    type="text"
                    id="surname"
                    defaultValue={singledata[0]?.lastName}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={editsurnameRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#phone"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Telefon raqami *
                  </label>
                  <input
                    type="number"
                    id="phone"
                    value={singledata[0]?.phoneNumber}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={editphoneRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Toifa *
                  </label>
                  <select
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={edittypeRef}
                  >
                    <option value={singledata[0]?.degree} selected hidden>
                      {singledata[0]?.degree == 1
                        ? "Birinchi toifa"
                        : singledata[0]?.degree == 2
                        ? "Ikkinchi toifa"
                        : singledata[0]?.degree == 3
                        ? "Uchinchi toifa"
                        : singledata[0]?.degree == 4
                        ? "To'rtinchi toifa"
                        : singledata[0]?.degree == 5
                        ? "Beshinchi toifa"
                        : undefined}
                    </option>
                    <option className="text-inputColor" value="1">
                      Birinchi toifa
                    </option>
                    <option className="text-inputColor" value="2">
                      Ikkinchi toifa
                    </option>
                    <option className="text-inputColor" value="3">
                      Uchinchi toifa
                    </option>
                    <option className="text-inputColor" value="4">
                      To'rtinchi toifa
                    </option>
                    <option className="text-inputColor" value="5">
                      Beshinchi toifa
                    </option>
                  </select>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#info"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Ma’lumot *
                  </label>
                  <textarea
                    ref={editinfoRef}
                    id="info"
                    rows={5}
                    defaultValue={
                      singledata[0]?.info ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                    }
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ></textarea>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label className="text-labelColor text-[18px] font-bold">
                    Rasmi *
                  </label>
                  <input
                    type="file"
                    ref={editimageRef}
                    id="file"
                    placeholder="+998941234567"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] hidden "
                  />
                  <label
                    htmlFor="file"
                    className="w-[175px] border border-inputBorder border-dashed h-[145px] text-inputColor flex items-center justify-center text-[14px] px-2 cursor-pointer"
                  >
                    Drag and drop or click here to select file
                  </label>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#email"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Gmail *
                  </label>
                  <input
                    type="email"
                    ref={editemailRef}
                    id="email"
                    defaultValue={singledata[0]?.email}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  />
                </div>

                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Kuni *
                  </label>
                  <select
                    id="type"
                    ref={editdayRef}
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  >
                    <option value={singledata[0]?.day} selected hidden>
                      {singledata[0]?.day == "toq"
                        ? "Du-Chor-Ju"
                        : singledata[0]?.day == "juft"
                        ? "Se-Pay-Sha"
                        : undefined}
                    </option>
                    <option className="text-inputColor" value="toq">
                      Du-Chor-Ju
                    </option>
                    <option className="text-inputColor" value="juft">
                      Se-Pay-Sha
                    </option>
                  </select>
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#birthday"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Tug’ilgan sanasi *
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    ref={editbirhtdayRef}
                    defaultValue={singledata[0]?.birthday}
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Jinsi *
                  </label>
                  <select
                    ref={editjinsRef}
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  >
                    <option value={singledata[0]?.gender} selected hidden>
                      {singledata[0]?.gender == "male"
                        ? "Erkak"
                        : singledata[0]?.gender == "female"
                        ? "Ayol"
                        : undefined}
                    </option>
                    <option className="text-inputColor" value="male">
                      Erkak
                    </option>
                    <option className="text-inputColor" value="female">
                      Ayol
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-[100%] flex justify-end gap-6 mt-2 mb-3">
                <button
                  className="border-[2px] rounded-[40px] p-[14px] border-btnBg text-btnBg hover:bg-btnBg hover:text-white transition-all"
                  type="submit"
                >
                  Saqalsh
                </button>
                <button
                  className="border-[2px] rounded-[40px] p-[14px]  bg-btnBg text-white hover:border-btnBg hover:text-btnBg hover:bg-white transition-all"
                  type="submit"
                >
                  Qo’shish
                </button>
              </div>
            </form>
          </Modal>
        ) : (
          ""
        )}
      </div>

      <div className="teachers_box gird  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  ">
        {data.map((element: any) => (
          <div className="relative teacher_card dark:bg-[#1F2937] h-[352px] text-center rounded-[20px] bg-white  pt-[16px] pb-[23px] px-[19px]">
            <div className="absolute top-[15px]  right-[15px] flex items-center gap-x-[12px]">
              <Image
                src={Edit}
                alt="img"
                className="cursor-pointer"
                onClick={(evt) => {
                  setID(element.id);
                  handleOneGet();
                  setEditShowModal(true);
                }}
              />
              <Image
                src={Delete}
                alt="img"
                className="cursor-pointer"
                id={element.id}
                onClick={(evt) => handleDelete(evt)}
              />
            </div>
            <Link
              href="/admin/teachers/singleTeacher"
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
      <Toaster />
    </section>
  );
}
