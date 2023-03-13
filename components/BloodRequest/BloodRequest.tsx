import { useRouter } from 'next/router';
import React from 'react'
import RequestForm from './RequestForm';

export default function BloodRequest() {
  const navigate = useRouter();
  return (
    <div className="flex flex-col items-center min-h-screen request-bg py-10 lg:px-12 px-5">
      <p className="text-center text-white text-4xl font-bold">Save lives</p>
      <p className="text-center text-xl my-3 lg:w-[55%] mx-auto text-white">
        Join our wonderful community and start saving lives. You can become
        someone's unknown but all important Hero
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3 w-full h-full px-2">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[80%] h-[70%] md:w-[60%] lg:w-[60%] lg:h-full"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            src={"/patients.svg"}
            alt="home"
          />
          {/* <button
            onClick={() => navigate.push("/register")}
            type="button"
            className="rounded-full text-white hover:bg-white hover:text-red-500 py-2 px-4 ring-2 ring-green-500 text-xl transition-all duration-300"
          >
            Be A Donor
          </button> */}
        </div>
        <div
          // className="min-h-full"
          // data-aos="flip-up"
          // data-aos-offset="200"
          // data-aos-delay="50"
          // data-aos-duration="500"
          // data-aos-easing="ease-in-out"
          // data-aos-mirror="true"
          // data-aos-once="false"
        >
          <RequestForm />
        </div>
      </div>
    </div>
  );
}
