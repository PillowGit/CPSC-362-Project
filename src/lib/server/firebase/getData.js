import firebase_app from '$lib/server/firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve a document from a Firestore collection
export default async function getDocument(collection, id) {
  if (collection == "auths") {
    return {
      result: {
        id: "auths",
        data: {

        },
      },
      error: null,
    }
  } else if (collection == "users") {
    return {
      result: {
        id: "users",
        data: {
          /* Example userdata entry
          "authcookiehere": {
            username: string,
            password: string,
            auth: string,
            lists: [string],
            invites: [string],
          }
          */
         "6944e4f61a01dd5ad5c03bf15bb97867ddf27cbebec967f0f2557d342a78ba4a": {
          username: "pillow",
          password: "pillow",
          auth: "6944e4f61a01dd5ad5c03bf15bb97867ddf27cbebec967f0f2557d342a78ba4a",
          lists: [],
          invites: [],
         },
        },
      },
      error: null,
    }
  } else if (collection == "lists") {
    return {
      result: {
        id: "lists",
        data: {

        },
      },
      error: null,
    }
  }

  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    const snapshot = await getDoc(docRef);
    snapshot.exists() ? (result = { id: snapshot.id, ...snapshot.data() }) : (result = null);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}