import SidebarAdmin from '@/app/commpo/sidebar';

export default function Page() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full flex-none md:w-64">
        <SidebarAdmin />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-8 text-white">
        {/* Search Bar */}
        <div className="flex items-center mb-8">
          <i className="fa-solid fa-magnifying-glass text-2xl mr-4"></i>
          <input
            type="text"
            placeholder="Search something here..."
            className="border-none bg-transparent outline-none w-full py-2 text-white placeholder-gray-400"
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* Large Square with Inner Squares */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl">
            <div className="mb-8 text-2xl font-bold">Statistic</div>
            <div className="flex justify-between mb-12">
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center">
              <i className="fa-solid fa-user-group text-3xl"></i></div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center"><i className="fa-solid fa-clipboard-list text-3xl"></i></div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center"><i className="fa-solid fa-users text-3xl"></i></div>
              <div className="bg-white text-black rounded-lg p-4 w-32 h-16 flex items-center justify-center"><i className="fa-regular fa-face-smile text-3xl text-[#61FF29]"></i></div>
            </div>
            
          </div>
          <div className="grid grid-cols-2 gap-8 mt-7">
              <div className="bg-white text-black rounded-lg p-4 w-full h-48 flex items-center justify-center">New patients statics</div>
              <div className="bg-white text-black rounded-lg p-4 w-full h-48 flex items-center justify-center">Old patients statics</div>
            </div>
          {/* Upcoming Appointment */}
          <div className="bg-[#354151] rounded-lg p-8 w-full max-w-4xl mt-8">
            <div className="mb-8 text-2xl font-bold">Upcoming appointment</div>
            <div className="overflow-auto">
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
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
