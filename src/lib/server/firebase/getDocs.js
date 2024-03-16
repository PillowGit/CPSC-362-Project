import firebase_app from '$lib/server/firebase/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve all documents from a Firestore collection
export default async function getAllDocuments(collectionName) {
  // Create a collection reference using the provided collection name
  const collectionRef = collection(db, collectionName);
  // Array to store the documents
  const result = [];
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve all documents from the collection
    const snapshot = await getDocs(collectionRef);
    // Loop through each document in the snapshot
    snapshot.forEach((doc) => {
      // Add the document data to the documents array
      // Include the document ID by using the spread operator (...) to include all fields of the document data
      result.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the documents and error as an object
  return { result, error };
}