import { auth } from '@/utils/firebaseConfig'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

// Function to translate error messages to Thai
function translateErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'อีเมลไม่ถูกต้อง';
    case 'auth/user-disabled':
      return 'บัญชีผู้ใช้ถูกปิดการใช้งาน';
    case 'auth/user-not-found':
      return 'ไม่พบบัญชีผู้ใช้';
    case 'auth/wrong-password':
      return 'รหัสผ่านไม่ถูกต้อง';
    case 'auth/invalid-credential':
      return 'ข้อมูลรับรองไม่ถูกต้อง';
    case 'auth/missing-password':
      return 'กรุณากรอกรหัสผ่าน';
    default:
      return 'เกิดข้อผิดพลาดบางอย่าง';
  }
}

export async function login(formData: FormData) {
  try {
    const Inpemail = formData.get("emailDoctor") as string;
    const password = formData.get("passwordDoc") as string;
    const email = Inpemail.toLowerCase();

    console.log("Form Data Received");

    if (auth) {
      console.log("Auth instance exists, attempting to sign in...");

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success");

      Swal.fire({
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'Okay'
      }).then(() => {
        console.log("Swal fired for login success");
        window.location.href = '/';
      });

      return true;
    } else {
      console.log("Auth instance does not exist or is not initialized");

      Swal.fire({
        title: 'Error!',
        text: 'Unable to connect to the authentication service.',
        icon: 'error',
        confirmButtonText: 'Okay'
      }).then(() => {
        console.log("Swal fired for auth error");
      });

      return false;
    }
  } catch (error: any) {
    console.error("Login Error:", error.message);

    const translatedMessage = translateErrorMessage(error.code);

    Swal.fire({
      title: 'Login Failed',
      text: translatedMessage,
      icon: 'error',
      confirmButtonText: 'Retry'
    });

    return false;
  }
}

export function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is already logged in, redirecting to main page");
      window.location.href = '/';
    } else {
      console.log("No user is logged in, showing login page");
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  });
}

window.addEventListener('load', checkAuthState);
