"use client";
import Sidebar from "@/app/commpo/sidebar";
import { useEffect, useState } from "react";
import Image from "next/image";

// Calendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import thLocale from '@fullcalendar/core/locales/th';
import './calendar.css';

export default function Page() {
    const today = new Date().toISOString().split("T")[0];

    const events = [
        { title: 'วันขึ้นปีใหม่', start: '2024-01-01', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันมาฆบูชา', start: '2024-02-24', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันมาฆบูชา', start: '2024-02-26', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันจักรี', start: '2024-04-06', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันจักรี', start: '2024-04-08', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันสงกรานต์', start: '2024-04-13', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันสงกรานต์', start: '2024-04-14', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันสงกรานต์', start: '2024-04-15', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันสงกรานต์', start: '2024-04-16', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันแรงงาน', start: '2024-05-01', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันฉัตรมงคล', start: '2024-05-04', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันฉัตรมงคล', start: '2024-05-06', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันวิสาขบูชา', start: '2024-05-22', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว', start: '2024-07-28', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว', start: '2024-07-29', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันแม่แห่งชาติ', start: '2024-08-12', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันคล้ายวันสวรรคตพระบาทสมเด็จพระเจ้าอยู่หัวรัชกาลที่ 9', start: '2024-10-13', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'ชดเชยวันคล้ายวันสวรรคตพระบาทสมเด็จพระเจ้าอยู่หัวรัชกาลที่ 9', start: '2024-10-14', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันปิยมหาราช', start: '2024-10-23', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันพ่อแห่งชาติ', start: '2024-12-05', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันรัฐธรรมนูญ', start: '2024-12-10', color: 'rgba(0, 255, 41, 0.35)' },
        { title: 'วันสิ้นปี', start: '2024-12-31', color: 'rgba(0, 255, 41, 0.35)' }
    ];    

    return (
        <div className="lg:flex h-screen overflow-scroll no-scrollbar">
            {/* Sidebar */}
            <div className="w-full lg:w-64 sidebar no-scrollbar">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-grow px-8 pt-0 pb-0 text-white overflow-y-scroll no-scrollbar">
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
                    {/* Calendar */}
                    <div className="bg-[#3B4553] px-8 py-8 w-full lg:w-11/12 rounded-xl lg:mt-24 xl:mt-36">
                        <p className="text-3xl">ปฏิทิน</p>
                        <FullCalendar
                            plugins={[
                                dayGridPlugin
                            ]}
                            locale={thLocale}
                            headerToolbar={{
                                left: "",
                                center: "prev, title, next",
                                right: ""
                            }}
                            nowIndicator={true}
                            selectable={true}
                            selectMirror={true}
                            initialDate={today}
                            events={events}
                            initialView="dayGridMonth"
                        />
                    </div>

                    {/* Pin */}
                    <div className="bg-[#3B4553] mt-8 w-full lg:w-11/12 p-8 pt-5 bg-opacity-50 rounded-xl mb-8">
                        {/* title */}
                        <div className="flex">
                            <p className="text-2xl">ปักหมุด</p>

                            {/* add & delete */}
                            <div className="flex ml-auto">
                                <button className="bg-[#3B4553] text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                    <i className="fa-solid fa-plus text-lg font-bold"></i>
                                </button>
                                <button className="bg-[#3B4553] text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                    <i className="fa-solid fa-minus text-lg font-bold"></i>
                                </button>
                            </div>
                        </div>

                        {/* Pin */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-5">
                            <div className="bg-[#00FF29] px-5 py-3 rounded-[9px] bg-opacity-35 flex items-center">
                                <p className="text-[#00FF29]">วันหยุด</p>
                                <div className="bg-[#00FF29] w-2 h-2 rounded-full ml-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* right BAr */}
            <div className="w-full p-8 pt-0 lg:p-0 lg:w-1/5 lg:mt-16 overflow-hidden">
                {/* Daliy order */}
                <div className="bg-[#3B4553] p-8 pt-5 rounded-xl lg:rounded-r-none mb-8">
                    {/* title */}
                    <div className="flex">
                        <p className="text-md">รายการวันนี้</p>

                        {/* add & delete */}
                        <div className="flex ml-auto">
                            <button className="bg-gray-800 text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                <i className="fa-solid fa-plus text-lg font-bold"></i>
                            </button>
                            <button className="bg-gray-800 text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                <i className="fa-solid fa-minus text-lg font-bold"></i>
                            </button>
                        </div>
                    </div>

                    {/* Order */}

                </div>

                {/* to do */}
                <div className="bg-[#3B4553] p-8 pt-5 rounded-xl lg:rounded-r-none mb-8">
                    {/* title */}
                    <div className="flex">
                        <p className="text-md">รายการสิ่งที่ต้องทำ</p>

                        {/* add & delete */}
                        <div className="flex ml-auto">
                            <button className="bg-gray-800 text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                <i className="fa-solid fa-plus text-lg font-bold"></i>
                            </button>
                            <button className="bg-gray-800 text-white p-1 py-0 shadow-xl rounded-full aspect-square mr-5">
                                <i className="fa-solid fa-minus text-lg font-bold"></i>
                            </button>
                        </div>
                    </div>

                    {/* Order */}

                </div>

                {/* Event */}
                <div className="bg-[#3B4553] p-8 pt-5 rounded-xl lg:rounded-r-none mb-8">
                    {/* title */}
                    <div className="flex">
                        <p className="text-md">กิจกรรม</p>

                        {/* Dropdown */}

                    </div>

                    {/* Order */}

                </div>
                
            </div>
        </div>
    );
}
