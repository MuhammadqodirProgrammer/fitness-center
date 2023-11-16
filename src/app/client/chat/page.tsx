"use client";

import Header from "@/layout/admin/Header/Header";
import Image from "next/image";
import img from "../../../../public/images/gear.png";
import sent from "../../../../public/icons/Sent.svg";
import script from "../../../../public/icons/Attachment.svg";
import "./chat.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Page() {
  const [names, setNames] = useState<any>([]);
  const [admin, setAdmin] = useState<any>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const [changed2, setChanged2] = useState<any>();
  const [socket, setSocket] = useState<any>();
  let ID = localStorage.getItem("userId");

  function renderFunc() {
    socket.on("client", (data: any) => {
      setNames(data);
    });
    socket.on("admin", (data: any) => {
      setAdmin(data);
    });
    socket.on("success1", (data: any) => {
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

  const handlePostClient = async (evt: any) => {
    evt.preventDefault();
    console.log(evt.target[0].value);

    const data = {
      message: evt.target[0].value,
      created_at: new Date(),
      id: ID,
    };
    socket.emit("sendMsgClient", data);
    evt.target[0].value = " ";
  };

  const res = names.filter((el: any) => el.client_id == ID);
  const resAdmin = admin.filter((el: any) => el.client_id == ID);

  //  ============

  return (
    <>
      <Header title={"Chat"} />
      <div className="container px-[60px] mt-[35px]">
        <div className="">
          <div className="w-full   ">
            <div className="bg-[#DDFCF5D1] overflow-y-auto example h-[580px]">
              {resAdmin.map((el: any) => {
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
              {res.map((el: any) => {
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
                onSubmit={handlePostClient}
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
