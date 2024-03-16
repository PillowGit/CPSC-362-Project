import firebase_app from '$lib/server/firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve a document from a Firestore collection
export default async function getDocument(collection, id) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    const snapshot = await getDoc(docRef);
    snapshot.exists() ? (result = { id: snapshot.id, data: {...snapshot.data()} }) : (result = null);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}