'use client';
import { useEffect, useState } from 'react';
import { auth, db } from "@/utils/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css';


 
export default function SidebarAdmin() {
 
  const [user, setUser] = useState(auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});

  if (!user) {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }

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
      <div className="lg:hidden p-4 flex justify-between items-center bg-gray-800 text-white z-50">
        <img src="mystroke.png" alt="MyStroke Logo" className="h-10 w-10 mr-4 rounded-full" />
        <button onClick={toggleSidebar} className="text-white"> 
          <i className={`fa ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-3xl`}></i>
        </button>
      </div>
      

      {/* Sidebar */}
      <aside className={`flex h-min w-72 bg-[#354151] text-white  flex-col items-center p-0 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto`}>
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

            <li className="mb-4">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={handleUsers}>
                <i className="mr-3 fa-solid fa-user text-3xl"></i>
                <span className="text-lg">Users</span>
              </a>
            </li>

            <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

            <li className=" mt-5 mb-4 relative">
              <a className="nav-item text-white flex items-center cursor-pointer" onClick={toggleDropdown}>
                <i className="mr-3 fa-solid fa-users text-3xl"></i>
                <span className="text-lg">My classroom</span>
                <i className={`ml-3 fa-solid fa-angle-right text-lg ${dropdownOpen ? 'rotate-90' : ''}`}></i>
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

          <div className="border-b-[#6A83A1] py-2" style={{ borderBottomWidth: "0.6px" }}></div>

          <button className="text-white px-4 py-2 mb-1 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-user-plus"></i>
            <span className="text-lg">Create new class</span>
          </button>

          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          <button onClick={handleSignOut} className="text-white px-4 mb-1 py-2 mt-5 rounded flex items-center w-full justify-center">
            <i className="text-3xl mr-3 fa-solid fa-right-from-bracket"></i>
            <span className="text-lg">Logout</span>
          </button>

          <div className="border-b-2 border-b-[#6A83A1] py-2"></div>

          {user ? (
            <div className="flex items-center p-4">
              <img src={userData.information?.profile} alt="Doctor" className="h-12 w-12 rounded-full mr-4" />
              <div>
                <h1 className="text-lg font-bold">{userData.username}</h1>
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


 

    


