"use client";

import Header from "@/layout/admin/Header/Header";
import Image from "next/image";
import img from "../../../../public/images/bell.png";
import trash from "../../../../public/icons/trash.svg";
import { useEffect, useState } from "react";
import instance from "@/app/api/api";

export default function Page() {
  const [data, setData] = useState<any>([]);
  const getOrder = async () => {
    const res = await instance.get("/get/order");
    setData(res.data);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const all = data?.map((i: any) => i.Product);

  // const handleDelete = async (evt: any) => {
  //   console.log(evt);
  //   const res = await instance.delete(`/delete/order/${evt}`);
  //   setData(res.data);
  // };
  return (
    <div>
      <Header title={"Buyurtmalar"} />

      <div className="bg-white p-5 flex flex-wrap gap-3 rounded-xl  h-full">
        {all.length
          ? all.map((el: any) => {
              return (
                <div className="bg-[#C1BBEB] p-5 w-full h-[378px] lg:w-1/4 rounded-lg">
                  <div className="bg-white p-5 flex items-center justify-center rounded-lg">
                    <Image
                      src={`http://localhost:1818/${el?.image}`}
                      width={315}
                      height={288}
                      className="w-[265px] h-[228px]"
                      alt="pic"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#303972] font-semibold">{el?.name}</p>
                      <p className="text-[#5C63A3] ">{el?.type}</p>
                    </div>
                    <div className="text-end">
                      <p className="text-[red] font-semibold">{el.brand}</p>
                      <p className="text-[blue] ">{el?.price}$</p>
                      <div
                        // onClick={() => handleDelete(el?.id)}
                        className="flex justify-end"
                      >
                        <Image src={trash} width={32} height={32} alt="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : "Not found"}
      </div>
    </div>
  );
}
