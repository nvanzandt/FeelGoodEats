import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import IndReview from '../ind-review/IndReview.js';

function Restaurant() {
  const { id } = useParams(); // Get the restaurant ID from the URL parameter
  const queryParams = new URLSearchParams(window.location.search); // Get the query parameters from the URL
  const category = queryParams.get('category') || 'general'; // Get the category from the query parameters, default to 'general' if not provided
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category); // Default category
  const [averageOverallRating, setAverageOverallRating] = useState(0); // State variable for average rating
  const [averageTasteRating, setAverageTasteRating] = useState(0); // State variable for average rating
  const [averageOptionsRating, setAverageOptionsRating] = useState(0); // State variable for average rating
  const [averageComfortRating, setAverageComfortRating] = useState(0); // State variable for average rating
  const [numReviews, setNumReviews] = useState(0); // State variable for number of reviews
  const [reviews, setReviews] = useState([]); // State variable for reviews

  // For each restaurant, fetch the restaurant data
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const firestore = getFirestore();
        const restaurantRef = doc(firestore, 'restaurants', id);
        const restaurantSnapshot = await getDoc(restaurantRef);
        if (restaurantSnapshot.exists()) {
          setRestaurant(restaurantSnapshot.data());
        } else {
          console.error('Restaurant not found');
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  // For each restaurant, fetch the average rating and number of reviews
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const firestore = getFirestore();
        const restaurantRef = doc(firestore, 'restaurants', id);
        const reviewsCollection = collection(restaurantRef, `diet/${selectedCategory}/reviews`);
        const querySnapshot = await getDocs(reviewsCollection);
        const reviewData = querySnapshot.docs.map(doc => doc.data());
        let totalOverallRating = 0;
        let totalTasteRating = 0;
        let totalOptionsRating = 0;
        let totalComfortRating = 0;

  
        for (let j = 0; j < reviewData.length; j++) {
          totalOverallRating += reviewData[j].Rating.Overall;
          totalTasteRating += reviewData[j].Rating.Taste;
          totalOptionsRating += reviewData[j].Rating.Options;
          totalComfortRating += reviewData[j].Rating.Comfort;

          
        }
        const averageOverallRating = totalOverallRating / reviewData.length;
        const averageTasteRating = totalTasteRating / reviewData.length;
        const averageOptionsRating = totalOptionsRating / reviewData.length;
        const averageComfortRating = totalComfortRating / reviewData.length;

        setAverageOverallRating(averageOverallRating);
        setAverageTasteRating(averageTasteRating);
        setAverageOptionsRating(averageOptionsRating);
        setAverageComfortRating(averageComfortRating);
        
        
        setNumReviews(reviewData.length);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [selectedCategory, id]);

  // For each restaurant, fetch the reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const firestore = getFirestore();
        const restaurantRef = doc(firestore, 'restaurants', id);
        const reviewsCollection = collection(restaurantRef, `diet/${selectedCategory}/reviews`);
        const querySnapshot = await getDocs(reviewsCollection);
        const reviewData = querySnapshot.docs.map(doc => doc.data());
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, [selectedCategory, id]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (!restaurant) {
    return <div class="border-t-2 flex flex-col justify-center"></div>;
  }



  return (
    <div class="border-t-2 flex flex-col justify-center pl-10">
      <div class="flex flex-col items-start mt-10">

        <div class="flex flex-col mt-5 mb-16">
          <div class="mr-20">
            <h1 class="text-4xl">{restaurant.Name}</h1>
            <h2>{restaurant.Cuisine}</h2>
          </div>
          <div>
            <h2>{restaurant.Address.Street}</h2>
            <h2>{restaurant.Address.City}, {restaurant.Address.State} {restaurant.Address.Zip}</h2>
          </div>
        </div>


          <div class="flex flex-col items-center">
            <div class="flex flex-col items-center">
              <h1 class="text-7xl">{!isNaN(averageOverallRating) ? averageOverallRating.toFixed(1) : 'N/A'}</h1>
              <h2 class="font-bold">Overall</h2>
            </div>

            <div class="flex flex-row mt-2">
            <div class="flex flex-col justify-center items-center w-20 border-r-2"> 
              <h1 class="text-3xl text-center">{!isNaN(averageTasteRating) ? averageTasteRating.toFixed(1) : 'N/A'}</h1>
              <h2>Taste</h2>
            </div>

            <div class="flex flex-col justify-cente items-center w-20 border-r-2"> 
              <h1 class="text-3xl text-center">{!isNaN(averageOptionsRating) ? averageOptionsRating.toFixed(1) : 'N/A'}</h1>
              <h2>Options</h2>
            </div>

            <div class="flex flex-col justify-center items-center w-20"> 
              <h1 class="text-3xl text-center">{!isNaN(averageComfortRating) ? averageComfortRating.toFixed(1) : 'N/A'}</h1>
              <h2>Comfort</h2>
            </div>
          </div>

          
      
      


          
          <h2 class="mt-3">Based on <u>{numReviews}</u> {numReviews === 1 ? 'review' : 'reviews'}</h2>
          <a key={id} href={`/restaurants/${id}/review`}>
                <button class="mt-5 bg-blue-500 text-white px-4 py-2 border shadow hover:bg-blue-600 duration-300 rounded-md mr-4">Write review</button>
          </a>

          
        </div>
        <div className="mt-2 w-44 flex flex-col">
              <select
                id="category"
                name="category"
                autoComplete="diet"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="general">general</option>
                <option value="vegan">vegan</option>
                <option value="vegetarian">vegetarian</option>
                <option value="dairy-free">dairy-free</option>
                <option value="gluten-free">gluten-free</option>
                <option value="keto">keto</option>
                <option value="kosher">kosher</option>
              </select>
            </div>
      </div>
        
      <div>
        <h1 class="mt-16 text-3xl">Reviews</h1>
        {reviews.map(review => (
          <IndReview
            name={review.Name}
            body={review.Body}
            overall={review.Rating.Overall}
            taste={review.Rating.Taste}
            options={review.Rating.Options}
            comfort={review.Rating.Comfort}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Restaurant;