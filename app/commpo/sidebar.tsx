'use client';
import { useState, useEffect } from 'react';
import { auth } from "@/utils/firebaseConfig";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css';
import Image from 'next/image';
import logo from '@/public/mystroke.png';
import Link from 'next/link';
import { useUser } from '../action/read_user';
import { getClassesForUser } from '../action/read_my_class';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [user, setUser] = useState(auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const { userData, loading } = useUser();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    });
}, [router]);

  // Fetch classes
  useEffect(() => {
    if (user) {
      const fetchClasses = async () => {
        const getClass = await getClassesForUser(user.uid);
        setClasses(getClass);
      };
      fetchClasses();
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

  // Loading page
  if (loading) {
    return (
      <div className="w-full h-screen justify-center items-center flex">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

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
      <aside className={` no-scrollbar flex fixed lg:relative w-3/4 lg:w-full h-screen bg-[#354151] text-white  flex-col items-center p-0 transition-transform transform z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto`}>
        <nav className="mt-16 md:mt-4 flex-grow w-full">
          {/* Logo */}
          <div className="flex items-center justify-center m-auto mt-5 md:mt-20 lg:mt-5 mb-12">
            <Image src={logo} alt="MyStroke Logo" className="h-10 w-10 mr-3 rounded-full" />
            <p className="text-white font-bold text-3xl">MyStroke</p>
          </div>

          {/* Navigation */}
          <ul className="list-none m-0 p-0 w-full">
            {/* Dashboard */}
            <li className="mb-4">
              <Link href='/' className="nav-item text-white flex items-center cursor-pointer" >
                <i className="mr-3 fa-solid fa-table-columns text-3xl"></i>
                <span className="text-md">แดสบอร์ด</span>
              </Link>
            </li>

            {/* Account */}
            <li className="mb-4">
              <Link href='/account' className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-user text-3xl"></i>
                <span className="text-md">บัญชีผู้ใช้</span>
              </Link>
            </li>

            {/* Divider */}
            <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

            {/* My Class */}
            <li className="mt-5 relative mb-4">
              <a className={`nav-item text-white flex items-center cursor-pointer ${dropdownOpen ? 'bg-[#2655B0]' : ''}`} 
                onClick={toggleDropdown}
              >
                <i className="mr-3 fa-solid fa-users text-3xl"></i>
                <span className="text-md">คลาสของฉัน</span>
                <i className={`fa-solid fa-angle-right ml-auto text-md ${dropdownOpen ? 'rotate-90' : ''}`}></i>
              </a>
              {dropdownOpen && (
                <ul className="text-white transition-all duration-300 w-full pointer">
                  {classes.map((classItem: any, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-[#6A83A1] bg-[#374C69] cursor-pointer">
                      <Link href={`/class/${classItem.id}`} className="text-white block">{classItem.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Calendar */}
            <li className="mb-4">
              <Link href="/calendar" className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-calendar-days text-3xl"></i>
                <span className="text-md">ปฏิทิน</span>
              </Link>
            </li>

            {/* Theme */}
            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-circle-half-stroke text-3xl"></i>
                <span className="text-md">ธีม</span>
              </a>
            </li>

            {/* Statistic */}
            <li className="mb-32">
              <Link href="statistic" className="nav-item text-white flex items-center cursor-pointer">
                <i className="mr-3 fa-solid fa-chart-pie text-3xl"></i>
                <span className="text-md">สถิติ</span>
              </Link>
            </li>
          </ul>

          {/* Divider */}
          <div className="border-b-[#6A83A1] py-2" style={{ borderBottomWidth: "0.6px" }}></div>

          {/* Create new class */}
          <button className="text-white px-4 py-2 mb-1 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-user-plus"></i>
            <span className="text-md">สร้างคลาสใหม่</span>
          </button>

          {/* Divider */}
          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          {/* Logout */}
          <button onClick={handleSignOut} className="text-white px-4 mb-1 py-2 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-right-from-bracket"></i>
            <span className="text-md">ออกจากระบบ</span>
          </button>

          {/* Divider */}
          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          {/* Doctor information */}
          {user ? (
            <div className="flex items-center p-4 w-full">
              <Image src={userData.information?.profile} width={100} height={100} alt="Doctor" className="rounded-full aspect-square mr-4 w-12" />
              <div>
                <h1 className="text-md font-bold">{userData.username}</h1>
                <p className="text-sm">{user.email}</p>
              </div>
              <i className="fa-solid fa-gear text-xl ml-auto"></i>
            </div>
          ) : (
            <h1 className="text-2xl font-bold mb-4 text-center mt-4">Loading...</h1>
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