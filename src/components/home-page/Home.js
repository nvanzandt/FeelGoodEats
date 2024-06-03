import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/background.jpeg'
import review from '../../images/review.png'
import eating from '../../images/eating.png'



function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      // Redirect to results page with search query
      navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div >
      <div class="h-[500px] bg-cover bg-center w-full flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <h1 class="md:text-3xl text-2xl mb-6 text-white font-bold z-10">Find restaurants that meet your dietary needs</h1>
          <form onSubmit={handleSearchSubmit} class="w-full z-10 flex flex-col items-center justify-center">
            <input
              className="w-11/12 md:w-3/4 lg:max-w-3xl px-4 py-2 rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search by name, cuisine, or location"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </form>
      </div>

      <div class="flex flex-col justify-center items-center bg-slate-100">

        <div class="flex flex-row items-center mt-10"> 
          <div class="mr-10">
            <h1 class="text-2xl w-72 font-bold mb-3">Find a restaurant</h1>
            <h3 class="w-80">If you can't find the one you're looking for, add it to our database by clicking "Add listing!"</h3>
          </div>
          

          <img class="h-72" src={eating} alt="person eating at restaurant" />
        </div>
        
        <div class="flex flex-row items-center">
          <img class="h-72" src={review} alt="person writing a review" />
          <div class="ml-10">
            <h1 class="text-2xl w-72 font-bold mb-3">Write a review</h1>
            <h3 class="w-80">Share your dining experience.</h3>
          </div>
        </div>

      </div>
      <h1 class="text-2xl mt-5 text-center">Recent Reviews</h1>
    </div>
  );
}


export default Home; 
