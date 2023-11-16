"use client";

import Header from "@/layout/admin/Header/Header";
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
      .get(`/get/product`, {
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
      .get(`/get/product/${Id}`, {
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
  const priceRef = useRef<any>(null);
  const brandRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const typeRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const countRef = useRef<any>(null);

  // edit

  const editnameRef = useRef<any>(null);
  const editpriceRef = useRef<any>(null);
  const editbrandRef = useRef<any>(null);
  const editinfoRef = useRef<any>(null);
  const edittypeRef = useRef<any>(null);
  const editimageRef = useRef<any>(null);
  const editcountRef = useRef<any>(null);
  const editdayRef = useRef<any>(null);
  const editbirhtdayRef = useRef<any>(null);
  const editjinsRef = useRef<any>(null);

  async function handleCreate(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", nameRef?.current.value);
    data.append("price", priceRef?.current.value);
    data.append("brand", brandRef?.current.value);
    data.append("type", typeRef?.current.value);
    data.append("description", infoRef?.current.value);
    data.append("image", imageRef?.current.files[0]);
    data.append("count", +countRef?.current.value);

    let response = await instance.post("/post/product", data, {
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

    let response = await instance.delete(`/delete/product/${id}`, {
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
  async function getOneForEdit(evt: any) {
    evt.preventDefault();
    const id = evt.target.id;
    console.log(id);
    setID(id);
    handleOneGet();
    setEditShowModal(true);
  }

  const single = (id: any) => {
    localStorage.setItem("prId", id);
  };

  async function handleEditSubmit(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", editnameRef?.current.value);
    data.append("price", editpriceRef?.current.value);
    data.append("brand", editbrandRef?.current.value);
    data.append("type", edittypeRef?.current.value);
    data.append("description", editinfoRef?.current.value);
    data.append(
      "image",
      editimageRef?.current.files[0] || singledata[0]?.image
    );
    data.append("count", +editcountRef?.current.value);

    console.log(
      editnameRef?.current.value,
      editpriceRef?.current.value,
      editbrandRef?.current.value,
      edittypeRef?.current.value,
      editinfoRef?.current.value,
      editimageRef?.current.files[0] || singledata[0]?.image,
      editcountRef?.current.value
    );

    let response = await instance.put(`/put/product/${Id}`, data, {
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
      <Header title={showModal ? "Yangi Jihozlar qo’shish" : "Jihozlar"} />

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
      </div>

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
                  Nomi *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nomi"
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={nameRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#surname"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Narxi *
                </label>
                <input
                  type="number"
                  id="surname"
                  placeholder="Narxi"
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={priceRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#phone"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Brand *
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Brand"
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={brandRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#type"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Turi *
                </label>
                <select
                  id="type"
                  className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={typeRef}
                >
                  <option className="text-inputColor" value="1">
                    Trenajor
                  </option>
                  <option className="text-inputColor" value="2">
                    Ko'p funksiyali Trenajor
                  </option>
                  <option className="text-inputColor" value="3">
                    Boshqa turdagi
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
                  Soni *
                </label>
                <input
                  type="number"
                  ref={countRef}
                  id="email"
                  placeholder="soni"
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                />
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
          <form className={`modal-content w-full`} onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#name"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Nomi *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nomi"
                  defaultValue={singledata[0]?.name}
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={editnameRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#surname"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Narxi *
                </label>
                <input
                  type="number"
                  id="surname"
                  placeholder="Narxi"
                  defaultValue={singledata[0]?.price}
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={editpriceRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#phone"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Brand *
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Brand"
                  defaultValue={singledata[0]?.brand}
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={editbrandRef}
                />
              </div>
              <div className="w-[100%] flex flex-col gap-2 mb-2">
                <label
                  htmlFor="#type"
                  className="text-labelColor text-[18px] font-bold"
                >
                  Turi *
                </label>
                <select
                  id="type"
                  defaultValue={singledata[0]?.type}
                  className="border border-inputBorder text-inputColor rounded-md w-[100%] py-3 px-2"
                  ref={edittypeRef}
                >
                  <option className="text-inputColor" value="1">
                    Trenajor
                  </option>
                  <option className="text-inputColor" value="2">
                    Ko'p funksiyali Trenajor
                  </option>
                  <option className="text-inputColor" value="3">
                    Boshqa turdagi
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
                  defaultValue={singledata[0]?.info}
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
                  Soni *
                </label>
                <input
                  type="number"
                  ref={editcountRef}
                  defaultValue={singledata[0]?.count}
                  id="email"
                  placeholder="soni"
                  className="border border-inputBorder placeholder-inputColor rounded-md w-[100%] py-3 px-2"
                />
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

      <div className="  bg-white rounded-[20px] px-[20px] py-[30px] ">
        <div className=" gird  grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4  ">
          {data?.length
            ? data.map((el: any) => {
                return (
                  <Link
                    href="/admin/singleProduct"
                    onClick={single(el?.id)}
                    className="teacher_card dark:bg-[#1F2937]    min-h-[352px] text-center rounded-[20px] bg-[#C1BBEB]  pt-[15px] pb-[23px] px-[15px] "
                  >
                    <div className="rounded-[15px] bg-white relative  w-auto h-[255px] overflow-hidden ">
                      <div className=" absolute top-[15px]  right-[15px] flex items-center gap-x-[12px] ">
                        <Image
                          src={Edit}
                          alt="img"
                          className="  "
                          id={el?.id}
                          onClick={getOneForEdit}
                        />
                        <Image
                          src={Delete}
                          alt="img"
                          className="  "
                          id={el?.id}
                          onClick={handleDelete}
                        />
                      </div>

                      <Image
                        src={`${baseUrlImg}/${el?.image}`}
                        alt="img"
                        width={100}
                        height={100}
                        // className=" rounded-full w-[160px] h-[160px] object-cover
                        className="  w-[100%] h-[100%] object-contain   "
                      />
                    </div>

                    <div className="flex   items-center justify-between mt-[10px] ">
                      <h4 className=" text-[#303972]  text-[18px]  font-bold ">
                        {el?.name}
                      </h4>

                      <p className="text-[#C11030] text-[18px]  font-bold text-left ">
                        {" "}
                        {el?.brand}
                      </p>
                    </div>

                    <div className="flex   items-center justify-between mt-[10px] ">
                      <h4 className=" text-[#5C63A3]  text-[18px]  font-bold ">
                        {el?.description}
                      </h4>

                      <p className="text-[#1128FA] text-[18px] font-bold text-left ">
                        {el?.price}
                      </p>
                    </div>
                  </Link>
                );
              })
            : "jihozlar yoq "}
        </div>

        <div className="flex justify-between items-center mt-[20px]">
          <p className="text-[#A098AE] text-[14px]  "> 1-7 dan 232 ta </p>

          <Pagination />
        </div>
      </div>

      <Toaster />
    </section>
  );
}
