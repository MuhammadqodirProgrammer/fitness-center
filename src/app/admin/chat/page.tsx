"use client";

import Header from "@/layout/admin/Header/Header";
import Image from "next/image";
import img from "../../../../public/images/gear.png";
import sent from "../../../../public/icons/Sent.svg";
import script from "../../../../public/icons/Attachment.svg";
import "./chat.css";
import instance from "@/app/api/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Page() {
  const [names, setNames] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [admin, setAdmin] = useState<any>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const [changed2, setChanged2] = useState<any>();
  const [id, setId] = useState<number>(1);
  const [msg, setMsg] = useState<any>([]);
  const [socket, setSocket] = useState<any>();
  let token = localStorage.getItem("token");
  function renderFunc() {
    socket.emit("join", { title: "salom" });
    socket.on("client", (data: any) => {
      setNames(data);
    });
    socket.on("admin", (data: any) => {
      setAdmin(data);
    });
    socket.on("success", (data: any) => {
      setChanged2(data);
    });

    return () => {
      socket.disconnect();
    };
  }
  useEffect(() => {
    if (changed) {
      renderFunc();
    }
  }, [changed, changed2]);

  useEffect(() => {
    const sockets = io("http://localhost:1818");
    setSocket(sockets);
    setChanged(true);
  }, []);

  const handlePost = async (evt: any) => {
    evt.preventDefault();
    const data = {
      message: evt.target[0].value,
      created_at: new Date(),
      id: id,
    };
    setMsg(data);
    socket.emit("sendMsg", data);

    evt.target[0].value = " ";
  };

  const setMainId = (evt: any) => {
    setId(evt);
  };
  const getUser = async () => {
    const res = await instance.get(`/get/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const res = names.filter((el: any) => el.client_id == id);
  const resAdmin = admin.filter((el: any) => el.client_id == id);

  //  ============

  return (
    <>
      <Header title={"Chat"} />
      <div className="container px-[60px] mt-[35px]">
        <div className="flex flex-wrap lg:flex-nowrap gap-5">
          <div className="w-full lg:w-1/3">
            {data.map((el: any) => {
              return (
                <>
                  <div
                    onClick={() => setMainId(el?.id)}
                    className="flex cursor-pointer items-center gap-[20px] p-[20px] my-3 bg-white rounded-lg"
                  >
                    <Image
                      src={`http://localhost:1818/${el?.image}`}
                      width={60}
                      height={60}
                      className="rounded-full"
                      alt="pic"
                    />
                    <div>
                      <p className="text-[black]">{el?.username}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full lg:w-2/3  ">
            <div className="bg-[#DDFCF5D1] overflow-y-auto example h-[580px]">
              {res.map((el: any) => {
                const time = el.createdAt.split("T")[1].slice(0, 5);
                return (
                  <>
                    <div dir="ltr" className="my-3">
                      <div className="bg-white rounded-md p-3 w-[350px] flex justify-between items-end gap-5  ">
                        <p className="text-[12px] text-[black]">{time}</p>
                        <p className="font-semibold text-[black] text-[18px] text-left">
                          {el?.message}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
              {resAdmin.map((el: any) => {
                const time = el.createdAt.split("T")[1].slice(0, 5);
                return (
                  <>
                    <div dir="rtl" className="my-3">
                      <div className="bg-white rounded-md p-3 w-[350px] flex justify-between items-end gap-5  ">
                        <p className="text-[12px] text-[black]">{time}</p>
                        <p className="font-semibold text-[black] text-[18px] text-left">
                          {el?.message}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div>
              <form
                onSubmit={handlePost}
                className="flex gap-3 bg-white dark:bg-[#3B3B3B]  mt-3 rounded-3xl"
              >
                <input
                  type="text"
                  className="w-full p-3 rounded-l-3xl outline-none px-3"
                  placeholder="Write your message..."
                />
                <button>
                  <Image src={script} width={50} height={50} alt="pic" />
                </button>
                <button
                  type="submit"
                  className="me-3 bg-[#4D44B5] px-4 rounded-3xl text-white my-1 flex items-center gap-2"
                >
                  Send
                  <Image
                    src={sent}
                    width={32}
                    height={32}
                    alt="pic"
                    className="me-3"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
