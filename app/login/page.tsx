"use client"
import { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../globals.css'
import { login } from '../action/login_action';
import { auth } from '@/utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Check if user is logged in
    useEffect(() => {
        setIsClient(true);
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.push('/');
            }
        });
    }, [router]);

    console.log();

    if (!isClient) {
        return null; // Prevent server-side rendering issues
    }

    // Show Disclaimer
    if (showDisclaimer) {
        Swal.fire({
            title: 'ข้อตกลงในการใช้ซอฟต์แวร์ (Disclaimer)',
            html: `
                <p class="text-left text-sm">
                     ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นายเตชินท์ พงษ์มุกดา นายไอดิน ศรีสง่า นายธัญวิสิฏฐ์ อิ่นแก้ว จาก โรงเรียนยุพราชวิทยาลัย ภายใต้การดูแลของ นายปณวรรต บุญตาศานย์ ภายใต้โครงการ ซอฟต์แวร์เพื่อการประเมินความสามารถและฝึกทักษะฟื้นฟูสมรรถภาพการใช้มือของผู้ป่วยหลอดเลือดในสมอง ( MyStroke ) ซึ่งสนับสนุนโดย สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติโดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา ซึ่งผู้พัฒนาได้อนุญาตให้สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติเผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ดังน้ัน สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติจึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์ ตลอดจนไม่รับประกันความเสียหายต่างๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ท้ังสิ้น
                </p>
            `,
            showCloseButton: true,
            showConfirmButton: false,
        }).then(() => {
            setShowDisclaimer(false);
        })
    }

    return (
        <div className="h-screen flex items-center justify-center w-full">
            <div className="w-10/12 md:w-7/12 xl:w-9/12 m-auto block xl:flex ">
                <div className='w-full p-3 rounded-2xl xl:rounded-none xl:rounded-s-2xl' style={{ backgroundColor: "#404C5E" }}>
                    {/* logo */}
                    <div className="ms-3 mt-3 flex items-center">
                        <Image src="/mystroke.png" alt="MyStroke Logo" width={40} height={40} className="mr-4 rounded-full" />
                        <span className="text-white text-lg">MyStroke</span>
                    </div>
                    {/* login */}
                    <div className="flex justify-center items-center mt-3 p-3">
                        <form action={login}>
                            <div className="text-white p-8 rounded-lg shadow-lg" style={{backgroundColor: "#2E3F52"}}>
                                <h1 className="text-lg xl:text-2xl font-bold mb-4">เฮ้ ยินดีต้อนรับ!</h1>
                                <p className="mb-6 xl:rounded-e-2xl hidden xl:block">กรุณากรอก ID แพทย์และรหัสผ่านของคุณเพื่อเป็นทั้งเว็บไซต์</p>
                                <div className="mb-4">
                                    <label className="block text-gray-500 text-sm" htmlFor="doctorId">
                                    บัตรประจำตัวแพทย์
                                    </label>
                                    <input
                                        name='emailDoctor'                                        
                                        className="border-none focus:border-none active:border-none bg-transparent active:outline-none w-full py-2 text-white focus:outline-none"
                                        id="doctorId"
                                        type="email"
                                        placeholder="Doctor’s ID"
                                        autoComplete='off'
                                        style={{borderBottom: "1px solid #647B9B"}}
                                    />
                                </div>
                                <div className="mb-4 relative">
                                    <label className="block text-gray-500 text-sm" htmlFor="password">
                                    รหัสผ่าน
                                    </label>
                                    <input
                                        name='passwordDoc'
                                        className="border-none focus:border-none active:border-none bg-transparent active:outline-none w-full py-2 pr-10 text-white focus:outline-none"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        style={{borderBottom: "1px solid #647B9B"}}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                                            <i className={`mt-8 fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <a href="#" className="text-blue-400 hover:text-blue-500 text-sm float-right">
                                        Forget Password?
                                    </a>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-5 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                เข้าสู่ระบบ
                            </button>
                        </form>                        
                    </div>

                    {/* ข้อตกลง */}
                    <p className="hidden sm:block text-center text-sm text-gray-400 cursor-pointer mb-5" onClick={() => setShowDisclaimer(true)}>ข้อตกลงในการใช้ซอฟต์แวร์</p>
                </div>
                {/* fordoctor */}
                <div className='w-full p-5 rounded-none xl:rounded-e-2xl hidden xl:block' style={{ backgroundColor: "#2E3F52" }}>
                    <p className="float-end text-gray-500 text-lg ">สำหรับแพทย์</p> 
                    {/* image */}
                    <div className='w-full h-full flex items-center justify-center'>
                        <Image src="/Women working on laptop.png" alt="MyStroke Logo" width={400} height={400} className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
