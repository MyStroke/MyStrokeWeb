'use client';
import { useState } from 'react';
import { auth } from "@/utils/firebaseConfig";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';

export default function SidebarAdmin() {
  const [user, setUser] = useState(auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDashboard = () => {
    window.location.href = '/admin/dashboard';
  };

  const handleUsers = () => {
    window.location.href = '/admin/users';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Mobile View Hamburger Menu */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-gray-800 text-white">
        <img src="mystroke.png" alt="MyStroke Logo" className="h-10 w-10 mr-4 rounded-full" />
        <button onClick={toggleSidebar} className="text-white">
          <i className={`fa ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-3xl`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#354151] text-white flex flex-col items-center p-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center mt-10 mb-12">
          <img src="mystroke.png" alt="MyStroke Logo" className="h-10 w-10 mr-4 rounded-full" />
          <span className="text-white font-bold text-3xl">MyStroke</span>
        </div>

        <nav className="mt-4 flex-grow w-full">
          <ul className="list-none m-0 p-0 w-full">
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleDashboard}>
                <i className="mr-3 fa-solid fa-table-columns text-3xl"></i>
                <span className="text-lg">Dashboard</span>
              </a>
            </li>

            <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleUsers}>
              <i className="mr-3 fa-solid fa-user text-3xl"></i>
              <span className="text-lg">Users</span>
            </a>
            
            <div className=" border-b-2 border-b-[#6A83A1] py-2" ></div>
           
            <li className="mb-4">
            </li>
            <li className="mb-4 relative">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={toggleDropdown}>
                <i className="mr-3 fa-solid fa-users text-3xl"></i>
                <span className="text-lg">My classroom</span>
                <i className={`ml-3 fa-solid fa-angle-right text-lg ${dropdownOpen ? 'rotate-90' : ''}`}></i>
              </a>
              {dropdownOpen && (
                <ul className="absolute left-0 top-full bg-gray-800 text-white rounded shadow-md py-2 transition-all duration-300 w-full">
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="#" className="text-white block">Class 1</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="#" className="text-white block">Class 2</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <a href="#" className="text-white block">Class 3</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleUsers}>
                <i className="mr-3 fa-solid fa-calendar-days text-3xl"></i>
                <span className="text-lg">Calendar</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleUsers}>
                <i className="mr-3 fa-solid fa-circle-half-stroke text-3xl"></i>
                <span className="text-lg">Theme</span>
              </a>
            </li>
            <li className="mb-4 mb-32">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleUsers}>
                <i className="mr-3 fa-solid fa-chart-pie text-3xl"></i>
                <span className="text-lg">Statistic</span>
              </a>
            </li>
          </ul>
          
          <div className="  border-b-[#6A83A1] py-2" style={{borderBottomWidth: "0.6px"}}></div>

        <button
          className="text-white px-4 py-2 mb-5 rounded flex items-center w-full"
        >
          <i className="text-3xl mr-3 fa-solid fa-user-plus"></i>
          <span className="text-lg">New Class</span>
        </button>

        <div className=" border-b-2 border-b-[#6A83A1] py-2" ></div>

        <button
          onClick={handleSignOut}
          className=" text-white px-4 mb-5 py-2 rounded flex items-center w-full"
        >
          <i className="text-3xl mr-3 fa-solid fa-right-from-bracket"></i>
          <span className="text-lg">Log Out</span>
        </button>

        <div className=" border-b-2 border-b-[#6A83A1] py-2" ></div>
        
        {user ? (
          <h1 className="text-xl font-bold mb-4">{user.email}</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        )}
        </nav>
      </aside>

      {/* Overlay for mobile view */}
      {sidebarOpen && (
        <div onClick={toggleSidebar} className="lg:hidden"></div>
      )}
    </div>
    
  );
}
