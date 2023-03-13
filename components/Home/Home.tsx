import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const navigate = useRouter();
  return (
    <div
      className="bg-green-100 w-full py-12 md:p-12 text-black"
      //   style={{ clipPath: "circle(72.8% at 50% 15%)" }}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 w-full h-full px-2">
        <div className="flex justify-center items-center">
          <img
            className="w-[50%] h-[70%] md:w-[50%] lg:w-[60%] lg:h-full animate-pulse"
            src={"/connect.svg"}
            alt="home"
          />
        </div>
        <div className="h-full flex flex-col gap-2 justify-start items-center w-full">
          <button
            onClick={() => navigate.push("/register")}
            type="button"
            className="rounded-full text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 ring-2 ring-green-500 text-xl transition-all duration-300"
          >
            Be A Donor
          </button>
          <p className="lg:w-[80%] lg:text-2xl md:text-xl sm:text-md text-md text-justify">
            Donating blood is a voluntary act that can have significant benefits
            for both the donor and the recipient. If you are interested in
            donating blood, it's recommended to check with your local blood
            donation center to learn more about the eligibility requirements and
            the donation process
          </p>
        </div>
      </div>
    </div>
  );
}
