import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import RestaurantResult from "../restaurant-result/RestaurantResult.js";



function Results() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default category
  const queryParams = new URLSearchParams(window.location.search); // Get the query parameters from the URL
  const query = queryParams.get('query'); // Get the query from the parameters
  const [searchQuery, setSearchQuery] = useState(query);
  const [changeQuery, setChangeQuery] = useState(false);

  

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const firestore = getFirestore();
        const restaurantsCollection = collection(firestore, 'restaurants');
        const querySnapshot = await getDocs(restaurantsCollection);
        const restaurantData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));


        // Filter restaurants based on search query
        let filteredRestaurants = restaurantData.filter(restaurant =>
          (restaurant.Name && restaurant.Name.toLowerCase().includes(searchQuery?.toLowerCase())) ||
          (restaurant.Cuisine && restaurant.Cuisine.toLowerCase().includes(searchQuery?.toLowerCase())) ||
          (restaurant.Address && restaurant.Address.City && restaurant.Address.City.toLowerCase().includes(searchQuery?.toLowerCase()))
        );
        
        

        // Iterate through each filtered restaurant
      for (let i = 0; i < filteredRestaurants.length; i++) {
        const restaurantRef = doc(firestore, "restaurants", filteredRestaurants[i].id);
        const reviewsCollection = collection(restaurantRef, `diet/${selectedCategory}/reviews`);
        const querySnapshot = await getDocs(reviewsCollection);
        const reviewData = querySnapshot.docs.map(doc => doc.data());

        // Calculate total rating and number of reviews
        let totalRating = 0;
        for (let j = 0; j < reviewData.length; j++) {
          totalRating += reviewData[j].Rating.Overall;  
        }
        const averageRating = totalRating / reviewData.length;

        // Update filtered restaurant with average rating and number of reviews
        filteredRestaurants[i].Rating = averageRating;
        filteredRestaurants[i].NumReviews = reviewData.length;
      }

      // Sort restaurants based on whether they have reviews
      filteredRestaurants.sort((a, b) => {
        if (isNaN(a.Rating) && isNaN(b.Rating)) {
          return 0;
        } else if (isNaN(a.Rating)) {
          return 1;
        } else if (isNaN(b.Rating)) {
          return -1;
        } else {
          return a.Rating - b.Rating;
        }
      });
        
      // Set filtered restaurants to state
      setRestaurants(filteredRestaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
    fetchRestaurants();
  }, [selectedCategory, changeQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      // Redirect to results page with search query
      setChangeQuery(!changeQuery);
    }
  };

  return (
    <div class="border-t-2 flex flex-col items-center justify-center">
    <form onSubmit={handleSearchSubmit} class="w-full z-10 flex flex-col items-center justify-center mt-2">
          <input
            className="w-11/12 md:w-3/4 lg:max-w-3xl px-4 py-2 rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search by name, cuisine, or location"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </form>
      <h1 class="text-2xl mt-4">Results</h1>
      <h3 class="mt-2 mb-2">Sort ratings by...</h3>
      <div>
        <button class={`text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4 ${selectedCategory === 'general' ? 'bg-slate-200' : ''}`} onClick={() => handleCategoryChange('general')}>general</button>
        <button class={`text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4 ${selectedCategory === 'vegan' ? 'bg-slate-200' : ''}`} onClick={() => handleCategoryChange('vegan')}>vegan</button>
        <button class="text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4">vegetarian</button>
        <button class="text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4">dairy-free</button>
        <button class="text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4">gluten-free</button>
        <button class="text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200 mr-4">keto</button>
        <button class="text-sm text-black px-3 py-2 border shadow rounded-md hover:bg-slate-200">kosher</button>
      </div>
      {restaurants.map(restaurant => (
        <a key={restaurant.id} href={`/restaurants/${restaurant.id}?category=${selectedCategory}`}>
        <RestaurantResult
          name={restaurant.Name}
          cuisine={restaurant.Cuisine}
          rating={restaurant.Rating}
          numReviews={restaurant.NumReviews}
        />
      </a>
      ))}
    </div>
  );
}

export default Results;