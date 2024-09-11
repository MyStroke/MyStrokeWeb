"use client"
import { useEffect, useState } from "react";
import ChartComponent from "../commpo/chart"
import Sidebar from "../commpo/sidebar"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartOptions } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistic() {
    const [newPatientsData, setNewPatientsData] = useState({});
    const [oldPatientsData, setOldPatientsData] = useState({});

    // Fetching data for new patients and old patients
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

    // Data for the line chart
    const data = {
        labels: ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'],
        datasets: [
            {
                label: 'หญิง',
                data: [3, 4, 0, 0, 0, 3, 0],
                borderColor: '#4791FF',
                backgroundColor: 'rgba(71,145,255,0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                label: 'ชาย',
                data: [0, 3, 0, 0, 4, 0, 0],
                borderColor: '#BED8FF',
                backgroundColor: 'rgba(190,216,255,0.2)',
                yAxisID: 'y-axis-2',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
            },
            'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

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
                    <div className="block md:grid md:grid-cols-4 md:grid-flow-row-dense md:gap-3 xl:mt-80 mb-16 w-full max-w-4xl">
                        {/* สถิติผู้ป่วยรายใหม่ */}
                        <div className="bg-[#354151] rounded-[20px] w-full p-4 h-full col-span-2 mb-5 md:mb-0">
                            <div className="flex text-xl">
                                สถิติผู้ป่วยรายใหม่
                                <i className=" ml-auto block fa-solid fa-chart-line text-xl text-[#26FF03]"></i>
                            </div>
                            <div className="">
                                <ChartComponent
                                    data={newPatientsData}
                                    gradientFrom="#FFFFFF"
                                    gradientTo="#7B7FDF"
                                />
                            </div>
                        </div>

                        {/* สถิติผู้ป่วยรายเก่า */}
                        <div className="bg-[#354151] rounded-[20px] w-full p-4 h-full col-span-2 mb-5 md:mb-0">
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

                        {/* ผู้ป่วยทั้งหมด */}
                        <div className="bg-[#354151] rounded-[20px] w-full p-4 h-full col-span-3 mb-5 md:mb-0">
                            <div className="flex text-xl">
                                ผู้ป่วยทั้งหมด
                                <select name="" id="" className="bg-transparent outline-none text-sm text-[#BBBBBB] ml-auto cursor-pointer">
                                    <option value="">รายวัน</option>
                                    <option value="" selected>รายสัปดาห์</option>
                                    <option value="">รายเดือน</option>
                                </select>
                            </div>
                            <div className="">
                                <Line
                                    data={data}
                                    options={options}
                                />
                            </div>
                        </div>

                        {/* เพศ */}
                        <div className="bg-[#2D3D4F] rounded-[20px] w-full p-4 h-full col-span-1 mb-5 md:mb-0">
                            <div className="flex text-xl">
                                เพศ
                                <select name="" id="" className="bg-transparent outline-none text-sm text-[#BBBBBB] ml-auto cursor-pointer">
                                    <option value="">รายวัน</option>
                                    <option value="" selected>รายสัปดาห์</option>
                                    <option value="">รายเดือน</option>
                                </select>
                            </div>
                            <div className="">
                                <Doughnut
                                    data={{
                                        labels: ['ชาย', 'หญิง'],
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: [30, 70],
                                                backgroundColor: [
                                                    '#BED8FF',
                                                    '#4791FF',
                                                ],
                                                hoverOffset: 4,
                                            },
                                        ],
                                    }}
                                />

                                {/* Male */}
                                <div className="flex items-center mt-3">
                                    <div className="w-5 h-5 rounded-full bg-[#BED8FF]"></div>
                                    <span className="text-sm ms-4">เพศชาย</span>
                                    <div className="ms-auto text-[#BBBBBB]">30</div>
                                </div>

                                {/* Female */}
                                <div className="flex items-center mt-3">
                                    <div className="w-5 h-5 rounded-full bg-[#4791FF]"></div>
                                    <span className="text-sm ms-4">เพศหญิง</span>
                                    <div className="ms-auto text-[#BBBBBB]">70</div>
                                </div>

                                {/* All */}
                                <div className="flex items-center mt-3">
                                    <span className="text-sm ms-4">ทั้งหมด</span>
                                    <div className="ms-auto text-[#BBBBBB]">100</div>
                                </div>

                            </div>
                        </div>

                        {/* การกระตือรือร้นของผู้ป่วย */}
                        <div className="bg-[#354151] rounded-[20px] w-full h-full col-span-4 md:flex">
                            {/* Line */}
                            <div className="p-4 w-full h-full">
                                <div className="flex text-xl">
                                    การกระตือรือร้นของผู้ป่วย
                                    <select name="" id="" className="bg-transparent outline-none text-sm text-[#BBBBBB] ml-auto cursor-pointer">
                                        <option value="">รายวัน</option>
                                        <option value="" selected>รายสัปดาห์</option>
                                        <option value="">รายเดือน</option>
                                    </select>
                                </div>
                                <div className="">
                                    <Line
                                        data={
                                            {
                                                labels: ['จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.', 'อา.'],
                                                datasets: [
                                                    {
                                                        label: 'กระตือรือร้น',
                                                        data: [4, 3, 4, 5, 8, 8, 10, 8],
                                                        borderColor: '#28FB16',
                                                        backgroundColor: 'rgba(40,251,22,0.2)',
                                                        yAxisID: 'y-axis-1',
                                                    },
                                                ],
                                            }
                                        }
                                        options={options}
                                    />
                                </div>
                            </div>

                            {/* Doughnut */}
                            <div className="p-4 bg-[#2D3D4F] ms-auto rounded-r-[20px] hidden md:block">
                                {/* Graph */}
                                <div className="">
                                    <Doughnut 
                                        className="w-1/2"
                                        data={{
                                            labels: ['กระตือรือร้น'],
                                            datasets: [
                                                {
                                                    label: 'My First Dataset',
                                                    data: [100],
                                                    backgroundColor: [
                                                        '#28FB16',
                                                    ],
                                                    hoverOffset: 4,
                                                },
                                            ],
                                        }}
                                    />
                                </div>

                                {/* Active */}
                                <div className="flex items-center mt-3">
                                    <div className="w-5 h-5 rounded-full bg-[#28FB16]"></div>
                                    <span className="text-sm ms-4">กระตือรือร้น</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}