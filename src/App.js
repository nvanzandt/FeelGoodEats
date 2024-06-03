import firebaseContext from './context.js';
import firebaseApp from './firebase.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home-page/Home.js';
import Header from './components/header/Header.js';
import Results from './components/results-page/Results.js';
import AddListing from './components/add-listing-page/AddListing.js';
import Restaurant from './components/restaurant-page/Restaurant.js';
import Review from './components/review-page/Review.js';

function App() {
  return (
      <div >
        <firebaseContext.Provider value={firebaseApp}>
          < Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />}/>
              <Route path="/add-listing" element={<AddListing />}/>
              <Route path="/restaurants/:id" element={<Restaurant />}/>
              <Route path="/restaurants/:id/review" element={<Review />}/>
            </Routes>
          </BrowserRouter>
        </firebaseContext.Provider>
      </div>
    
  );
}

export default App;
