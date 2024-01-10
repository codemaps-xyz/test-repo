import { db } from '@/utlils/firebaseAdmin';

export default async function handler(req, res) {
    try {
        const snapshot = await db.collection('paths').get();
        const data = snapshot.docs.map(doc => doc.data());

        res.status(200).json(data);
    } catch (error) {
        console.error('Error accessing Firestore:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}