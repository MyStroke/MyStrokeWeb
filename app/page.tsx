"use client";
import '@/app/car.css'; // Custom styling
import {today, getLocalTimeZone} from "@internationalized/date";
import Sidebar from "@/app/commpo/sidebar";
import ChartComponent from "@/app/commpo/chart";
import { useEffect, useState } from "react";
import Clock from "@/app/commpo/clock";
import { NextUIProvider } from '@nextui-org/react';
import { Calendar } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Page() {
  const [newPatientsData, setNewPatientsData] = useState({});
  const [oldPatientsData, setOldPatientsData] = useState({});
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = useState(defaultDate);

  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = `${date.getFullYear()}-${month}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    // Simulating fetching data for new patients
    setNewPatientsData({
      labels: ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย", "ก.ค"],
      datasets: [
        {
          label: "New Patients",
          data: [50, 40, 60, 80, 100, 90, 70],
          borderRadius: 10,
        },
      ],
    });

    // Simulating fetching data for old patients
    setOldPatientsData({
      labels: ["ม.ค.", "ก.พ.", "มี.ย.", "เม.ย.", "พ.ค.", "มิ.ย", "ก.ค"],
      datasets: [
        {
          label: "Old Patients",
          data: [45, 35, 55, 75, 95, 85, 65],
          borderRadius: 10,
        },
      ],
    });
  }, []);

  return (
    <div className="lg:flex h-screen overflow-scroll no-scrollbar">
      {/* Sidebar */}
      <div className="w-full lg:w-64 sidebar no-scrollbar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow px-8 pt-0 pb-0 text-white overflow-y-scroll no-scrollbar ">
        {/* Search Bar */}
        <div className="flex items-center fixed mt-8">
          <i className="fa-solid fa-magnifying-glass text-2xl mr-4"></i>
          <input
            type="text"
            placeholder="ลองค้นหาบางอย่าง..."
            className="border-none bg-transparent outline-none w-full py-2 text-white placeholder-gray-400 no-scrollbar"
          />
        </div>

        {/* Main Content */}
        <div className="flex mt-24 flex-col items-center justify-center overflow-scroll no-scrollbar">
          {/* Large Square with Inner Squares */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl lg:mt-24">
            <div className="text-2xl font-bold">ค่าสถิติ</div>
            <div className="block lg:flex m-auto">
              {/* Patients */}
              <div className="bg-[#253345] text-black rounded-[12px] w-full px-4 py-2 m-3 ml-0 md:ml-3 mb-0 flex items-center">
                <i className="fa-solid fa-user-group text-3xl text-[#7EA9FC] mr-3"></i>
                <div>
                  <p className="text-white text-xl font-bold">7</p>
                  <p className="text-[#BBBBBB] text-sm">ผู้ป่วย</p>
                </div>
              </div>

              {/* History */}
              <div className="bg-[#253345] text-black rounded-[12px] w-full px-4 py-2 m-3 ml-0 md:ml-3 mb-0 flex items-center">
                <i className="fa-solid fa-clipboard-list text-3xl text-[#7EA9FC] mr-3"></i>
                <div>
                  <p className="text-white text-xl font-bold">2</p>
                  <p className="text-[#BBBBBB] text-sm">ประวัติการบำบัด</p>
                </div>
              </div>

              {/* Classes */}
              <div className="bg-[#253345] text-black rounded-[12px] w-full px-4 py-2 m-3 ml-0 md:ml-3 mb-0 flex items-center">
                <i className="fa-solid fa-users text-3xl text-[#7EA9FC] mr-3"></i>
                <div>
                  <p className="text-white text-xl font-bold">1</p>
                  <p className="text-[#BBBBBB] text-sm">คลาสทั้งหมด</p>
                </div>
              </div>

              {/* Feelings */}
              <div className="bg-[#253345] text-black rounded-[12px] w-full px-4 py-2 m-3 ml-0 md:ml-3 mb-0 flex items-center">
                <i className="fa-regular fa-face-smile text-3xl text-[#61FF29] mr-3"></i>
                <div>
                  <p className="text-white text-xl font-bold">2</p>
                  <p className="text-[#BBBBBB] text-sm">ความรู้สึกผู้ป่วย</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patients statics */}
          <div className="block md:flex mt-7 w-full max-w-4xl">
            {/* New */}
            <div className="bg-[#354151] text-white rounded-lg p-4 w-full items-center justify-center mb-5 md:mb-0 md:mr-8">
              <div className="flex text-xl">
                สถิติผู้ป่วยรายใหม่
                <i className=" ml-auto block fa-solid fa-chart-line text-xl text-[#26FF03]"></i>
              </div>
              <div>
                <ChartComponent
                  data={newPatientsData}
                  gradientFrom="#FFFFFF"
                  gradientTo="#7B7FDF"
                />
              </div>
            </div>

            {/* Old */}
            <div className="bg-[#354151] text-white rounded-lg p-4 w-full  items-center justify-center mb-5 md:mb-0">
              <div className="flex text-xl">
                สถิติผู้ป่วยรายเก่า
                <i className=" ml-auto block fa-solid fa-chart-line text-xl text-[#FFF970]"></i>
              </div>
              <div className="">
                <ChartComponent
                  data={oldPatientsData}
                  gradientFrom="#FFFFFF"
                  gradientTo="#E9CA5D"
                />
              </div>
            </div>
          </div>

          {/* Upcoming Appointment */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl md:mt-8 md:mb-8 ">
            <div className="mb-8 text-2xl font-bold">การนัดหมายเร็วๆนี้</div>
            <div className="table-container">
              <table className="w-full">
                <thead className="bg-[#2b3a42] text-white">
                  <tr>
                    <th className="py-2 px-4">ชื่อ <i className={`ml-3 fa-solid fa-angle-right text-md`}></i> </th>
                    <th className="py-2 px-4">เพศ <i className={`ml-3 fa-solid fa-angle-right text-md`}></i> </th>
                    <th className="py-2 px-4">วันที่ <i className={`ml-3 fa-solid fa-angle-right text-md`}></i> </th>
                    <th className="py-2 px-4">เวลา <i className={`ml-3 fa-solid fa-angle-right text-md`}></i> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 1</td>
                    <td className="py-2 px-4">Male</td>
                    <td className="py-2 px-4">Oct 1, 2024</td>
                    <td className="py-2 px-4">10:00AM</td>
                  </tr>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 8</td>
                    <td className="py-2 px-4">Female</td>
                    <td className="py-2 px-4">Oct 5, 2024</td>
                    <td className="py-2 px-4">12:00PM</td>
                  </tr>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 12</td>
                    <td className="py-2 px-4">Male</td>
                    <td className="py-2 px-4">Oct 8, 2024</td>
                    <td className="py-2 px-4">01:00PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* right BAr */}
      <div className="w-full p-8 md:p-0 md:w-1/5 md:mt-16 overflow-hidden">
        {/* clock */}
        <div className="mb-1">
          <Clock />
        </div>

        {/* calendar */}
        <div className="flex gap-x-4 mb-3 overflow-hidden">
          <Calendar
            aria-label="Date (Uncontrolled)"
            focusedValue={focusedDate}
            value={defaultDate}
            onFocusChange={setFocusedDate}
           className="Calendar"
          />
        </div>

        {/* Edit */}
        <button className="w-full bg-[#354151] opacity-90 hover:opacity-70 transition-all rounded-2xl lg:rounded-r-none shadow-lg flex items-center justify-center py-12 mb-3">
          <FontAwesomeIcon icon={faPenToSquare} className="text-xl mr-3" />
          <p className="text-xl">แก้ไข</p>
        </button>

        {/* your class */}
        <div className="w-full h-full bg-[#354151] rounded-2xl lg:rounded-r-none p-3 lg:pl-4 lg:pr-0 overflow-hidden">
          <p className="font-bold text-lg">คลาสของคุณ</p>
          <p className="text-[#BBBBBB] text-sm">ผู้ป่วยรายล่าสุด</p>

          {/* user */}
          <div className="w-full rounded-full lg:rounded-r-none bg-[#253345] flex px-4 py-2 items-center shadow-md mt-3">
            {/* profile */}
            <div className=" border-1 border-[#2655B0] rounded-full p-1 mr-3">
              <Image
                src="https://media.istockphoto.com/id/1011241694/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%AB%E0%B8%B2%E0%B8%87%E0%B8%A2%E0%B8%B2%E0%B8%A7%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%84%E0%B8%97%E0%B8%A2%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B8%97%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%A1.jpg?s=612x612&w=0&k=20&c=q7qz0uFc4Zkf5tGxFLNFyg82k_l9YS06nUQ9Ny-RIOo="
                width={100}
                height={100}
                alt=""
                className="rounded-full aspect-square w-12"
              />
            </div>

            {/* Text */}
            <div className="">
              <p className="text-[#BBBBBB] text-sm">ได้เข้าร่วม Class01</p>
              <p>Test 1</p>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
