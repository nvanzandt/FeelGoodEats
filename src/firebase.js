import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";


// Firebase configuration
const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

// Initialize Firebase
const firestore = getFirestore();

const restaurantCollection = collection(firestore, "restaurants");



// Function to add a new restaurant
async function addNewRestaurant(name, cuisine, street, city, state, zip, country) {
  const newRestaurant = await addDoc(restaurantCollection, {
    Name: name,
    Cuisine: cuisine,
    Address: {
      Street: street,
      City: city,
      State: state,
      Zip: zip,
      Country: country
    }

  });
  
  return newRestaurant.id;

}
const firebaseExports = {
  firebaseApp,
  addNewRestaurant,
  addNewReview,
};

export default firebaseExports;


// Function to add a new review for a vegan diet 
async function addNewReview(restaurantId, rating, body) {
  const restaurantRef = doc(firestore, "restaurants", restaurantId);
  const reviewsCollection = collection(restaurantRef, "diet/vegan/reviews");

  const newReview = {
    Rating: rating,
    Body: body,
  };

  await addDoc(reviewsCollection, newReview);
}



