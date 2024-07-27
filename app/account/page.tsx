"use client";
import Sidebar from "@/app/commpo/sidebar";
import Image from "next/image";
import { useUser } from "@/app/action/read_user";

export default function Page() {
    const { userData, loading } = useUser();

    // Loading page
    if (loading) {
        return (
            <div className="w-full h-screen justify-center items-center flex">
                <p className="text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="lg:flex h-screen overflow-scroll no-scrollbar">
            {/* Sidebar */}
            <div className="w-full lg:w-64 sidebar no-scrollbar">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="text-white w-full h-screen items-center justify-center flex">
                <form className="bg-[#354151] border-[#647B9B] border-1 p-8 rounded-2xl w-10/12 h-3/4 mt-20 md:m-0 overflow-y-auto">
                    <h3 className="text-2xl mb-3">การตั้งค่าบัญชี</h3>

                    {/* Profile and fullname */}
                    <div className="mb-8 bg-[#2C3848] p-3 w-full rounded-md md:rounded-l-3xl md:rounded-r-md block md:flex">
                        <div className="p-1 border-[#2655B0] border-1 rounded-full w-20 mr-4 mb-3 md:mb-0">
                            <Image src={userData.information?.profile} width={100} height={100} alt="Doctor" className="rounded-full aspect-square w-full" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold">แพทย์: {userData.information?.first_name} {userData.information?.last_name}</p>
                            <p className="text-[#BBBBBB]">{userData.information?.specialization}</p>

                            <div className="block md:flex">
                                {/* update profile */}
                                <button className="bg-[#2655B0] text-white px-3 py-1 rounded-md mt-2 mr-5 shadow flex">
                                    อัพเดตข้อมูล
                                </button>

                                {/* delete profile */}
                                <button className="text-[#FF3B30] border-[#647B9B] border-1 px-3 py-1 rounded-md mt-2 flex">
                                    ลบข้อมูล
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* personal information */}
                    <p className="text-xl mb-3">ข้อมูลส่วนบุคคล</p>
                    <div className="mb-3 bg-[#2C3848] px-4 pt-5 pb-2 md:p-8 w-full rounded-md grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* first name */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">ชื่อจริง</label><br />
                            <input type="text" className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full" defaultValue={userData.information?.first_name} />
                        </div>

                        {/* last name */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">นามสกุล</label><br />
                            <input type="text" className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full" defaultValue={userData.information?.last_name} />
                        </div>

                        {/* email */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">อีเมล</label><br />
                            <input type="text" className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full" defaultValue={userData.email} />
                        </div>

                        {/* gender & perfix */}
                        <div className="block md:flex gap-5">
                            <div className="w-full mb-3 md:mb-0">
                                <label htmlFor="" className="text-[#BBBBBB] text-sm">คำนำหน้า</label><br />
                                <select name="" id="" className="bg-transparent px-3 py-2 rounded-md w-full border-1 border-[#647B9B]">
                                    <option value="นาย">นาย</option>
                                    <option value="นางสาว">นางสาว</option>
                                    <option value="นาง">นาง</option>
                                    <option value="" selected hidden>ไม่ระบุ</option>
                                </select>
                            </div>

                            <div className=" w-full mb-3 md:mb-0">
                                <label htmlFor="" className="text-[#BBBBBB] text-sm">เพศ</label><br />
                                <select name="" id="" className="bg-transparent px-3 py-2 rounded-md w-full border-1 border-[#647B9B]">
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                    <option value="" selected hidden>ไม่ระบุ</option>
                                </select>
                            </div>
                        </div>

                        {/* age */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">อายุ</label><br />
                            <input type="number" className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full" defaultValue={userData.information?.age} />
                        </div>

                        {/* specialization */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">ตำแหน่ง</label><br />
                            <input type="text" className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full" defaultValue={userData.information?.specialization} />
                        </div>

                        {/* desciption */}
                        <div className="">
                            <label htmlFor="" className="text-[#BBBBBB] text-sm">รายละเอียด</label><br />
                            <textarea name="" id="" cols={30} rows={5} className="text-white focus:outline-none bg-transparent border-1 border-[#647B9B] px-3 py-2 rounded-md w-full max-h-52">{userData.information?.description}</textarea>
                        </div>

                        {/* save & cancel */}
                        <div className="block mt-auto ml-auto">
                            <button className="bg-[#2655B0] text-white px-3 py-1 rounded-md md:mt-2 mr-5 shadow">
                                บันทึกการเปลี่ยนแปลง
                            </button>
                            <button className="border-[#647B9B] border-1 px-3 py-1 mb-2 rounded-md mt-2">
                                ยกเลิก
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
