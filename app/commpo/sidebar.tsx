'use client';
import { useEffect, useState } from 'react';
import { auth, db } from "@/utils/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css';
import Image from 'next/image';
import logo from '@/public/mystroke.png';
import Link from 'next/link';

 
export default function Sidebar() {
 
  const [user, setUser] = useState(auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});

  // Check if user is logged in
  if (!user) {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }

  // If no user is logged in, redirect to login page
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("No user is logged in, showing login page");
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  });
  
  // Read user data
  useEffect(() => {
    const readUser = async () => {
      const userCollection = collection(db, "Doctor");
      const userDoc = doc(userCollection, user?.uid);
      const userSnapshot = await getDoc(userDoc);
      const userDataReadUser = userSnapshot.data();
      return userDataReadUser;
    };

    if (user) {
      const fetchUserData = async () => {
        const data = await readUser();
        setUserData(data);
      };
      fetchUserData();
    }
  }, [user]);

  // Logout
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Open/close dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Open/close sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (   
    <div>
      {/* Mobile View Hamburger Menu */}
      <div className="lg:hidden fixed w-full p-4 flex justify-between items-center bg-gray-800 text-white z-50">
        <Image src={logo} alt="MyStroke Logo" width={100} height={100} className="h-10 w-10 mr-4 rounded-full" />
        <button onClick={toggleSidebar} className="text-white"> 
          <i className={`fa ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-3xl`}></i>
        </button>
      </div>
      

      {/* Sidebar */}
      <aside className={`flex fixed md:relative w-3/4 md:w-full h-screen bg-[#354151] text-white  flex-col items-center p-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto`}>
        <nav className="mt-16 md:mt-4 flex-grow w-full">
          {/* Logo */}
          <div className="flex items-center justify-center m-auto mt-5 mb-12">
            <Image src={logo} alt="MyStroke Logo" className="h-10 w-10 mr-3 rounded-full" />
            <p className="text-white font-bold text-3xl">MyStroke</p>
          </div>

          {/* Navigation */}
          <ul className="list-none m-0 p-0 w-full">
            {/* Dashboard */}
            <li className="mb-4">
              <Link href='/' className="nav-item text-white flex items-center cursor-pointer" >
                <i className="mr-3 fa-solid fa-table-columns text-3xl"></i>
                <span className="text-md">Dashboard</span>
              </Link>
            </li>

            {/* Users */}
            <li className="mb-4">
              <Link href='/' className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-user text-3xl"></i>
                <span className="text-md">Users</span>
              </Link>
            </li>

            {/* Divider */}
            <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

            {/* My Class */}
            <li className=" mt-5 mb-4 relative">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={toggleDropdown}>
                <i className="mr-3 fa-solid fa-users text-3xl"></i>
                <span className="text-md">My class</span>
                <i className={`ml-3 fa-solid fa-angle-right text-md ${dropdownOpen ? 'rotate-90' : ''}`}></i>
              </a>
              {dropdownOpen && (
                <ul className="  bg[#354151] text-white shadow-md transition-all duration-300 w-full">
                  <li className="px-4 py-2 hover:bg-[#6A83A1]">
                    <a href="#" className="text-white block">Class 1</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-[#6A83A1]">
                    <a href="#" className="text-white block">Class 2</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-[6A83A1]">
                    <a href="#" className="text-white block">Class 3</a>
                  </li>
                </ul>
              )}
            </li>

            {/* Calendar */}
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-calendar-days text-3xl"></i>
                <span className="text-md">Calendar</span>
              </a>
            </li>

            {/* Theme */}
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-circle-half-stroke text-3xl"></i>
                <span className="text-md">Theme</span>
              </a>
            </li>
            
            {/* Statistic */}
            <li className="mb-32">
              <a className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-chart-pie text-3xl"></i>
                <span className="text-md">Statistic</span>
              </a>
            </li>
          </ul>

          {/* Divider */}
          <div className="border-b-[#6A83A1] py-2" style={{ borderBottomWidth: "0.6px" }}></div>

          {/* Create new class */}
          <button className="text-white px-4 py-2 mb-1 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-user-plus"></i>
            <span className="text-md">Create new class</span>
          </button>

          {/* Divider */}
          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          {/* Logout */}
          <button onClick={handleSignOut} className="text-white px-4 mb-1 py-2 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-right-from-bracket"></i>
            <span className="text-md">Logout</span>
          </button>

          {/* Divider */}
          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          {/* Doctor information */}
          {user ? (
            <div className="flex items-center p-4">
              <Image src={userData.information?.profile} width={100} height={100} alt="Doctor" className="h-12 w-12 rounded-full mr-4" />
              <div>
                <h1 className="text-md font-bold">{userData.username}</h1>
                <p className="text-sm">{user.email}</p>
              </div>
              <i className="fa-solid fa-gear text-xl ml-4"></i>
            </div>
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


 

    