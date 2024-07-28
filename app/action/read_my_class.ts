import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';

export const getClassesForUser = async (uid: string) => {
    const classesRef = collection(db, 'Class');
    const q = query(classesRef, where('doctor.doctorUID', '==', uid));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    const classes: any = [];
    snapshot.forEach(doc => {
        classes.push({ id: doc.id, ...doc.data() });
    });

    return classes;
}