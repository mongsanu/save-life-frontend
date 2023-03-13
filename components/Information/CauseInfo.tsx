import React, { Fragment } from 'react'
import {
  FileSearchOutlined,
  ClockCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";

export default function CauseInfo() {
    const cause_info: any = [
      {
        id: 1,
        img_data: {
          img: "/emergency.svg",
          alt: "Emergency",
          aos: "fade-up",
        },
        titleIcon: <FileSearchOutlined className="text-red-500" />,
        title: "Made for Everyone",
        content:
          "Get connected in a matter of minutes at zero cost. Our App ships with a smart system that finds the closest blood donors. Our automated blood donation system works efficiently whenever someone needs a blood transfusion",
        position: "left",
        animation: "animation-bounce",
      },
      {
        id: 2,
        img_data: {
          img: "/ambulance.svg",
          alt: "Answer to Emergencies",
          aos: "zoom-out-down",
        },
        titleIcon: <ClockCircleOutlined className="text-red-500" />,
        title: "Answer to Emergencies",
        content:
          "As soon as a new blood request is raised, it is routed among our local volunteer blood donors. We know time matters! So we keep you updated with real-time notifications sent directly to you via SMS (text message)",
        position: "right",
        animation: "animation-shake",
      },
      {
        id: 3,
        img_data: {
          img: "/savelife.svg",
          alt: "You are someone's Hero",
          aos: "fade-up",
        },
        titleIcon: <HeartOutlined className="text-red-500" />,
        title: "You are someone's Hero",
        content:
          "We are a community of blood donors and blood recipients. We are here to help you save lives. We are here to help you find blood donors near you. We are here to help you find blood donors near you. We are here to help you find blood donors near you.",
        position: "left",
        animation: "animation-bounce",
      },
    ];
    return (
      <React.Fragment>
        <div className="bg-yellow-100 w-full flex flex-col justify-center items-center py-12 text-black">
          <p className="text-center text-red-500 text-4xl font-bold">
            Join The Cause
          </p>
          <p className="text-center text-xl my-5 lg:w-[55%] mx-auto">
            Join our cause and help us save more lives. Everyone should have the
            right to get a blood transfusion
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 w-full h-full px-2">
            {cause_info?.map((item: any) => (
              <Fragment key={item?.id}>
                {item?.position === "left" ? (
                  <>
                    <div className="sm:flex justify-end items-end md:hidden">
                      <img
                        className={`w-[50%] h-[80%] md:w-[50%] mx-auto lg:w-[60%] lg:h-full  duration-300 delay-300 ${item?.animation}`}
                        src={item?.img_data?.img}
                        alt={item?.img_data?.alt}
                        data-aos={item?.img_data?.aos}
                        data-aos-duration="1000"
                      />
                    </div>
                    <div className="h-full flex justify-center items-center w-full">
                      <div
                        data-aos={`fade-${item?.position}`}
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="true"
                      >
                        <p className="lg:w-[80%] mx-auto font-bold flex items-center gap-3 mb-3 justify-center lg:justify-start lg:text-3xl text-xl">
                          {item?.titleIcon}
                          <span>{item?.title}</span>
                        </p>
                        <p className="lg:w-[80%] mx-auto lg:text-lg md:text-xl sm:text-md text-md text-justify">
                          {item?.content}
                        </p>
                      </div>
                    </div>
                    <div className="md:flex justify-center items-center hidden">
                      <img
                        className={`w-[50%] h-[70%] md:w-[50%] lg:w-[60%] lg:h-full  duration-300 delay-300 ${item?.animation}`}
                        src={item?.img_data?.img}
                        alt={item?.img_data?.alt}
                        data-aos={item?.img_data?.aos}
                        data-aos-duration="1000"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center relative">
                      <img
                        className={`w-[50%] h-[70%] md:w-[50%] lg:w-[60%] lg:h-full  duration-300 delay-300 ${item?.animation}`}
                        src={item?.img_data?.img}
                        alt={item?.img_data?.alt}
                        data-aos={item?.img_data?.aos}
                        data-aos-duration="1000"
                      />
                      <p className="absolute bottom-10 md:bottom-12 py-2 border-b-gray-400 border-b-8 h-[5px] w-[80%]"></p>
                    </div>
                    <div className="h-full flex justify-center items-center w-full">
                      <div
                        data-aos={`fade-${item?.position}`}
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="true"
                      >
                        <p className="lg:w-[80%] mx-auto font-bold flex items-center gap-3 mb-3 justify-center lg:justify-start lg:text-3xl text-xl">
                          {item?.titleIcon}
                          <span>{item?.title}</span>
                        </p>
                        <p className="lg:w-[80%] mx-auto lg:text-lg md:text-xl sm:text-md text-md text-justify">
                          {item?.content}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
}
