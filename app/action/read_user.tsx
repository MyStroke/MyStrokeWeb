'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from "@/utils/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

interface UserContextProps {
  user: any;
  userData: any;
  loading: boolean;
}

const defaultUserContext: UserContextProps = {
  user: null,
  userData: {},
  loading: true,
};

const UserContext = createContext<UserContextProps>(defaultUserContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readUser = async () => {
      if (user) {
        const userCollection = collection(db, "Doctor");
        const userDoc = doc(userCollection, user?.uid);
        const userSnapshot = await getDoc(userDoc);
        const userDataReadUser = userSnapshot.data();
        return userDataReadUser;
      }
      return null;
    };

    if (user) {
      const fetchUserData = async () => {
        const data = await readUser();
        setUserData(data);
        setLoading(false);
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
