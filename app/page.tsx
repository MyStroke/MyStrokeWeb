'use client'
import Image from "next/image";
import { auth } from "@/utils/firebaseConfig";

export default function Home() {
  const user = auth.currentUser;

  console.log(user?.email);
  
  return (
    <main>

      {/* user info */}
      <div className="flex items-center">
        <h1>{user?.email}</h1>
      </div>
      
      {/* sign out */}
      <div className="flex justify-end">
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>

    </main>
  );
}
