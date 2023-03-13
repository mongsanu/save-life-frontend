import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { save_dummy_info } from './xave_dummy_info';

export default function SaveInfo() {
    const [info, setInfo] = React.useState<any>([]);
    const navigate = useRouter();
    React.useEffect(() => {
        const info = save_dummy_info;
        setInfo(info);
    }, [save_dummy_info]);
    return (
      <div className="w-full py-12 md:p-12">
        <p className="text-center text-red-500 text-4xl font-bold">
          We try to save life
        </p>
        <p className="text-center text-xl my-5 lg:w-[55%] mx-auto">
          Find blood donors near your location and make a blood request in less
          than 5 minutes
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 w-full lg:w-[90%] mx-auto h-full px-2 gap-4">
          {info.map((item: any) => (
            <div
              key={item?.id}
              className="flex justify-center items-center flex-col my-5"
            >
              <img
                className="w-[100px] h-[100px]"
                src={item.img}
                alt={item.title}
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true"
                // style={{...style, transition: "all 1.5s ease-in-out"}}
              />
              <p className="text-center text-2xl my-5">{item.title}</p>
              <p className="text-center text-xl">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Request Button */}
        <div className="flex justify-center items-center my-10">
          <button
            className="text-green-500 text-xl px-10 py-2 rounded-full border border-gray-200 ring-2 hover:ring-green-300 hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear"
            type="button"
            onClick={() => navigate.push("/request")}
          >
            Request
          </button>
        </div>
      </div>
    );
}
