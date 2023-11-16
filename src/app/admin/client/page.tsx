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
import instance, { baseUrlImg } from "@/app/api/api";
import { Modal } from "@/components/Modal/Modal";
const notify = () => toast.success("Successfully Created Teacher");
const notify2 = () => toast.error("Error While Creating Teacher");
const notify3 = () => toast.success("Successfully Edited Teacher");
const notify4 = () => toast.success("Successfully Deleted Teacher");
const notify5 = () => toast.error("Error While Editing Teacher");
const notify6 = () => toast.error("Error While Deleting Teacher");

export default function Page() {
  //   const name = "Mirzaev Mirkomil ";

  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [singledata, setSingleData] = useState<any>([]);
  const [Id, setID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editshowModal, setEditShowModal] = useState(false);
  const getClient = () => {
    instance
      .get(`/get/client`, {
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
  const getTeacher = () => {
    instance
      .get(`/get/teacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res: any) => {
        setTeachers(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const handleOneGet = () => {
    instance
      .get(`/get/client/${Id}`, {
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
    getClient();
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
  const passwordRef = useRef<any>(null);
  const birhtdayRef = useRef<any>(null);
  const dayRef = useRef<any>(null);

  async function handleCreate(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("username", nameRef?.current.value);
    data.append("lastName", surnameRef?.current.value);
    data.append("phoneNumber", phoneRef?.current.value);
    data.append("teacher_id", typeRef?.current.value);
    data.append("description", infoRef?.current.value);
    data.append("image", imageRef?.current.files[0]);
    data.append("email", emailRef?.current.value);
    data.append("password", passwordRef?.current.value);
    data.append("birthday", birhtdayRef?.current.value);
    data.append("day", dayRef?.current.value);

    let response = await instance.post("/post/client", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      notify();
      setShowModal(false);
      getClient();
    } else {
      notify2();
    }
  }

  async function handleDelete(evt: any) {
    evt.preventDefault();
    const id = evt.target.id;

    let response = await instance.delete(`/delete/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      notify4();
      getClient();
    } else {
      notify6();
    }
  }

  const editnameRef = useRef<any>(null);
  const editsurnameRef = useRef<any>(null);
  const editphoneRef = useRef<any>(null);
  const editinfoRef = useRef<any>(null);
  const edittypeRef = useRef<any>(null);
  const editimageRef = useRef<any>(null);
  const editemailRef = useRef<any>(null);
  const editpasswordRef = useRef<any>(null);
  const editbirhtdayRef = useRef<any>(null);
  const editdayRef = useRef<any>(null);

  async function handleEditSubmit(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("username", editnameRef?.current.value);
    data.append("lastName", editsurnameRef?.current.value);
    data.append("phoneNumber", editphoneRef?.current.value);
    data.append("teacher_id", edittypeRef?.current.value);
    data.append("description", editinfoRef?.current.value);
    data.append("image", editimageRef?.current.files[0]);
    data.append("email", editemailRef?.current.value);
    data.append("password", editpasswordRef?.current.value);
    data.append("birthday", editbirhtdayRef?.current.value);
    data.append("day", editdayRef?.current.value);

    let response = await instance.put(`/put/client/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      notify3();
      setEditShowModal(false);
      getClient();
    } else {
      notify5();
    }
  }

  return (
    <section>
      <Header title={showModal ? "Yangi mijoz qo'shish" : "Mijozlar"} />

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
            title="Create Client"
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
                    Ustoz *
                  </label>
                  <select
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={typeRef}
                  >
                    {teachers.map((element: any) => (
                      <option className="text-inputColor" value={element.id}>
                        {element.username + " " + element.lastName}
                      </option>
                    ))}
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
                    htmlFor="#email"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    id="email"
                    placeholder="********"
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  />
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
            title="Edit Client"
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
                    defaultValue={singledata[0]?.phoneNumber}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={editphoneRef}
                  />
                </div>
                <div className="w-[100%] flex flex-col gap-2 mb-2">
                  <label
                    htmlFor="#type"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Ustoz *
                  </label>
                  <select
                    id="type"
                    className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                    ref={edittypeRef}
                  >
                    <option value={singledata[0]?.Teacher.id} selected hidden>
                      {singledata[0]?.Teacher.username +
                        " " +
                        singledata[0]?.Teacher.lastName}
                    </option>
                    {teachers.map((element: any) => (
                      <option className="text-inputColor" value={element.id}>
                        {element.username + " " + element.lastName}
                      </option>
                    ))}
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
                    htmlFor="#email"
                    className="text-labelColor text-[18px] font-bold"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    ref={editpasswordRef}
                    id="email"
                    defaultValue={singledata[0]?.password}
                    className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  />
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

      <div className="bg-white p-[32px] my-[40px]  rounded-[15px]  dark:bg-gray-800 ">
        <h3 className="text-[#303972] text-[24px] font-bold mb-[20px]">
          Mijozlar
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
                    ID
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check2" className=" text-sm font-medium  ">
                    Email
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check3" className=" text-sm font-medium  ">
                    Ustoz
                  </label>
                  <Image src={down} alt="img" />{" "}
                </th>

                <th className="text-center flex items-center  gap-x-[20px] justify-center ">
                  <label htmlFor="check4" className=" text-sm font-medium  ">
                    Boshladi
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
                        id="id2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="id2"
                        className=" w-[100%] absolute h-[100%] top-0 right-0 "
                      >
                        {" "}
                      </label>
                    </div>

                    <Image
                      src={`${baseUrlImg}/${element.image}`}
                      alt="img"
                      width={100}
                      height={100}
                      className=" lg:w-[48px] lg:h-[48px] md:w-[35px] md:h-[35px]  w-[30px] h-[30px] max-w-none  block object-cover rounded-full "
                    />

                    <div>
                      <p>
                        {(element.username + " " + element.lastName).slice(
                          0,
                          20
                        ) + `..`}
                      </p>

                      <p>{element.phoneNumber}</p>
                    </div>
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.id}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white  text-[14px] text-center ">
                    {element.email}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.Teacher.username + " " + element.Teacher.lastName}
                  </td>

                  <td className=" text-[#232D42]   dark:text-white text-[14px] text-center ">
                    {element.createdAt.split("T")[0]}
                  </td>

                  <div className=" absolute   right-[15px] flex items-center gap-x-[12px] ">
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
                      id={element.id}
                      className="cursor-pointer"
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
