
function RestaurantResult({ name, cuisine, rating, numReviews}) {

  let color = ""; 
  if (rating < 3) {
    color = "red-300";
  } else if (rating < 4) {
    color = "yellow-300";
  } else {
    color = "green-300";
  }

  return (
    <div>
      <a>
        <div class=" flex flex-row w-[600px] mt-6 px-3 py-2 bg-gray-100 hover:bg-gray-200">
          <div>
            <h3 class="text-center">Overall</h3>
            <h3 className={`text-lg font-bold h-16 w-16 flex items-center justify-center bg-${color}`}>{!isNaN(rating) ? rating.toFixed(1) : 'N/A'}</h3>
            <h3>{numReviews} {numReviews === 1 ? 'review' : 'reviews'}</h3>
          </div>
          <div class="ml-10">
            <h1 class="font-bold text-xl">{name}</h1>
            <h3 class="font-light">{cuisine}</h3>
          </div> 
        </div>
      </a>
      
    </div>
    
  );
}

export default RestaurantResult;