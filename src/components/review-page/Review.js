import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore methods


function Review() {
  const { id } = useParams(); // Get the restaurant ID from the URL parameter
  const queryParams = new URLSearchParams(window.location.search); // Get the query parameters from the URL
  const category = queryParams.get('category') || 'general'; // Get the category from the query parameters, default to 'general' if not provided
  
  const [restaurantName, setRestaurantName] = useState(''); // State to store the restaurant name
  const [selectedCategory, setSelectedCategory] = useState(category); // Default category
  const [tasteRating, setTasteRating] = useState(0);
  const [optionsRating, setOptionsRating] = useState(0);
  const [comfortRating, setComfortRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const firestore = getFirestore();
        const restaurantRef = doc(firestore, 'restaurants', id);
        const restaurantSnapshot = await getDoc(restaurantRef);
        if (restaurantSnapshot.exists()) {
          setRestaurantName(restaurantSnapshot.data().Name);
        } else {
          console.error('Restaurant not found');
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const calculateOverallRating = () => {
    // Calculate the average of taste, options, and comfort ratings
    const overall = (tasteRating + optionsRating + comfortRating) / 3;
    return overall;
  };



  const handleTasteRating = (value) => {
    setTasteRating(value);
  };

  const handleOptionsRating = (value) => {
    setOptionsRating(value);
  };

  const handleComfortRating = (value) => {
    setComfortRating(value);
  };




  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const firestore = getFirestore();
      const reviewRef = doc(
        firestore,
        `restaurants/${id}/diet/${selectedCategory}/reviews`, // Path to the reviews collection
        `${Date.now()}` // Unique document ID based on current timestamp
      );
  
      // Get the review text from the textarea
      const reviewBody = document.getElementById('review-text').value.trim();
      if (!reviewBody) {
        console.error('Review text cannot be empty');
        return; // Prevent submission if review text is empty
      }
  
      // Get the reviewer's name from the input
      const reviewerName = document.getElementById('reviewer-name').value.trim();
      if (!reviewerName) {
        console.error('Reviewer name cannot be empty');
        return; // Prevent submission if reviewer name is empty
      }
  
      // Construct the review object
      const reviewData = {
        Body: reviewBody,
        Name: reviewerName,
        Rating: {
          Comfort: comfortRating,
          Options: optionsRating,
          Taste: tasteRating,
          Overall: calculateOverallRating(),
        },
      };
  
      // Add the review document to Firestore
      await setDoc(reviewRef, reviewData);
  
      // Show the pop-up message
      setShowPopup(true);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleGoBack = () => {
    // Hide the pop-up and potentially reset the form or navigate back
    setShowPopup(false);

    // Redirect to the previous page
    window.history.back();
  };

  return (
    <div className="border-t-2">
 
     
      

    

     <div className=" mt-12 mb-12 border-b border-gray-900/10 bg-slate-200 sm:mx-auto sm:max-w-[800px] shadow sm:rounded-lg px-6 py-12 sm:px-12">
       <h2 className="text-base font-semibold leading-7 text-gray-900">Write a review for</h2>
       <h1 class="font-bold leading-7 text-gray-900 text-2xl">{restaurantName}</h1>

      <h2 class="mt-10 mb-3 text-sm font-medium leading-6 text-gray-900">Name</h2>
      <input
        type="text"
        name="reviewer-name"
        id="reviewer-name"
        autoComplete="family-name"
        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <select
        id="category"
        name="category"
        autoComplete="diet"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={selectedCategory}
        onChange={handleCategoryChange}
        class="mt-6 text-sm font-medium leading-6 text-gray-900"
      >
        <option value="general">general</option>
        <option value="vegan">vegan</option>
        <option value="vegetarian">vegetarian</option>
        <option value="dairy-free">dairy-free</option>
        <option value="gluten-free">gluten-free</option>
        <option value="keto">keto</option>
        <option value="kosher">kosher</option>
      </select>

          <h1 class="mt-6 mb-3 text-sm font-medium leading-6 text-gray-900">Taste</h1>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${tasteRating === 1 ? 'bg-red-300' : 'bg-slate-300'} hover:bg-red-300 mr-2`}
            onClick={() => handleTasteRating(1)}
          >
            1
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${tasteRating === 2 ? 'bg-orange-300' : 'bg-slate-300'} hover:bg-orange-300 mr-2`}
            onClick={() => handleTasteRating(2)}
          >
            2
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${tasteRating=== 3 ? 'bg-yellow-300' : 'bg-slate-300'} hover:bg-yellow-300 mr-2`}
            onClick={() => handleTasteRating(3)}
          >
            3
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${tasteRating === 4 ? 'bg-lime-300' : 'bg-slate-300'} hover:bg-lime-300 mr-2`}
            onClick={() => handleTasteRating(4)}
          >
            4
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${tasteRating === 5 ? 'bg-green-300' : 'bg-slate-300'} hover:bg-green-300`}
            onClick={() => handleTasteRating(5)}
          >
            5
          </button>

          <h1 class="mt-6 mb-3 text-sm font-medium leading-6 text-gray-900">Options</h1>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${optionsRating === 1 ? 'bg-red-300' : 'bg-slate-300'} hover:bg-red-300 mr-2`}
            onClick={() => handleOptionsRating(1)}
          >
            1
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${optionsRating === 2 ? 'bg-orange-300' : 'bg-slate-300'} hover:bg-orange-300 mr-2`}
            onClick={() => handleOptionsRating(2)}
          >
            2
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${optionsRating === 3 ? 'bg-yellow-300' : 'bg-slate-300'} hover:bg-yellow-300 mr-2`}
            onClick={() => handleOptionsRating(3)}
          >
            3
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${optionsRating === 4 ? 'bg-lime-300' : 'bg-slate-300'} hover:bg-lime-300 mr-2`}
            onClick={() => handleOptionsRating(4)}
          >
            4
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${optionsRating === 5 ? 'bg-green-300' : 'bg-slate-300'} hover:bg-green-300`}
            onClick={() => handleOptionsRating(5)}
          >
            5
          </button>

          <h1 class="mt-6 mb-3 text-sm font-medium leading-6 text-gray-900">Comfort</h1>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${comfortRating === 1 ? 'bg-red-300' : 'bg-slate-300'} hover:bg-red-300 mr-2`}
            onClick={() => handleComfortRating(1)}
          >
            1
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${comfortRating === 2 ? 'bg-orange-300' : 'bg-slate-300'} hover:bg-orange-300 mr-2`}
            onClick={() => handleComfortRating(2)}
          >
            2
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${comfortRating === 3 ? 'bg-yellow-300' : 'bg-slate-300'} hover:bg-yellow-300 mr-2`}
            onClick={() => handleComfortRating(3)}
          >
            3
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${comfortRating === 4 ? 'bg-lime-300' : 'bg-slate-300'} hover:bg-lime-300 mr-2`}
            onClick={() => handleComfortRating(4)}
          >
            4
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-medium leading-6 text-gray-900 ${comfortRating === 5 ? 'bg-green-300' : 'bg-slate-300'} hover:bg-green-300`}
            onClick={() => handleComfortRating(5)}
          >
            5
          </button>  


          <h1 className="mt-6 mb-3 text-sm font-medium leading-6 text-gray-900">Share your experience</h1>
          <div className="mt-2">
            <textarea
              id="review-text"
              name="review-text"
              rows={3}
              className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
   

      
        
        <div className="mt-10 flex items-center gap-x-6">
            <button type="button" onClick={handleGoBack} className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
      </div>

   





      {/* Pop-up message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex flex-col items-center justify-center p-12 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-10">Thank you for your submission!</p>
            <button
              onClick={handleGoBack}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;