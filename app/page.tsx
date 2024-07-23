"use client";
import Sidebar from '@/app/commpo/sidebar';
import ChartComponent from '@/app/commpo/chart';
import { useEffect, useState } from 'react';
import Clock from '@/app/commpo/clock';

export default function Page() {
  const [newPatientsData, setNewPatientsData] = useState({});
  const [oldPatientsData, setOldPatientsData] = useState({});

  useEffect(() => {
    // Simulating fetching data for new patients
    setNewPatientsData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'New Patients',
          data: [50, 40, 60, 80, 100, 90, 70],
        },
      ],
    });

    // Simulating fetching data for old patients
    setOldPatientsData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Old Patients',
          data: [45, 35, 55, 75, 95, 85, 65],
        },
      ],
    });
  }, []);

  return (
    <div className="md:flex h-screen overflow-scroll">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-64 sidebar no-scrollbar">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-8 pt-0 pb-0 text-white overflow-y-scroll no-scrollbar ">
        {/* Search Bar */}
        <div className="flex items-center fixed mt-8">
          <i className="fa-solid fa-magnifying-glass text-2xl mr-4"></i>
          <input
            type="text"
            placeholder="Search something here..."
            className="border-none bg-transparent outline-none w-full py-2 text-white placeholder-gray-400"
          />
        </div>

        {/* Main Content */}
        <div className="flex mt-24 flex-col items-center justify-center h-full overflow-scroll">
          {/* Large Square with Inner Squares */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl lg:mt-64 xl:mt-20">
            <div className="mb-8 text-2xl font-bold">Statistic</div>
            <div className="flex justify-between mb-12">
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center">
                <i className="fa-solid fa-user-group text-3xl"></i>
              </div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center">
                <i className="fa-solid fa-clipboard-list text-3xl"></i>
              </div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center">
                <i className="fa-solid fa-users text-3xl"></i>
              </div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center">
                <i className="fa-regular fa-face-smile text-3xl text-[#61FF29]"></i>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-7">
            <div className="bg-[#354151] text-white rounded-lg p-4 w-full h-52 items-center justify-center">
              <div className='flex text-xl'>New patients statics
                <i className=" ml-auto block fa-solid fa-chart-line text-xl text-[#26FF03]"></i>
              </div>
              <div><ChartComponent data={newPatientsData} gradientFrom="#FFFFFF" gradientTo="#7B7FDF" /></div>

            </div>
            <div className="bg-[#354151] text-white rounded-lg p-4 w-full h-52  items-center justify-center">
              <div className='flex text-xl'><div className='text-[#FFF970]'>Old &nbsp; </div> patients statics
                <i className=" ml-auto block fa-solid fa-chart-line text-xl text-[#FFF970]"></i>
              </div>
              <ChartComponent data={oldPatientsData} gradientFrom="#FFFFFF" gradientTo="#E9CA5D" />

            </div>
          </div>

          {/* Upcoming Appointment */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl mt-8 mb-8">
            <div className="mb-8 text-2xl font-bold">Upcoming appointment</div>
            <div className="table-container">
              <table className="w-full">
                <thead className="bg-[#2b3a42] text-white">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Gender</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Time</th>
                    <th className="py-2 px-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 1</td>
                    <td className="py-2 px-4">Male</td>
                    <td className="py-2 px-4">Oct 1, 2024</td>
                    <td className="py-2 px-4">10:00AM</td>
                    <td className="py-2 px-4">Details</td>
                  </tr>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 8</td>
                    <td className="py-2 px-4">Female</td>
                    <td className="py-2 px-4">Oct 5, 2024</td>
                    <td className="py-2 px-4">12:00PM</td>
                    <td className="py-2 px-4">Details</td>
                  </tr>
                  <tr className="bg-[#2b3a42] text-white">
                    <td className="py-2 px-4">Patient 12</td>
                    <td className="py-2 px-4">Male</td>
                    <td className="py-2 px-4">Oct 8, 2024</td>
                    <td className="py-2 px-4">01:00PM</td>
                    <td className="py-2 px-4">Details</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* right BAr */}
      <div className='flex'>

            {/* clock */}
        <div className=''>
        <Clock />
          </div>

      </div>

    </div>
  );
}
