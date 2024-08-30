import React, { useState } from "react";
import { userData, petData } from "./data";
import PetCard from "./components/PetCard";
import Adopted from "./components/Adopted";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adoptedPets, setAdoptedPets] = useState([]);

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === petData.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handleSwipeRight = () => {
    setAdoptedPets([...adoptedPets, petData[currentIndex]]);
    setCurrentIndex((prevIndex) =>
      prevIndex === petData.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const currentPet = petData[currentIndex];

  return (
    <div className="App">
      <header>
        <h1>Welcome to Pet-Pool, {userData.name}!</h1>
        <p>{userData.bio}</p>
      </header>

      {currentIndex < petData.length  ? (
        <div>
          <PetCard pet={currentPet} />
          <div className="buttons">
            <button onClick={handleSwipeLeft} className="swipe-btn">
              Swipe Left
            </button>
            <button onClick={handleSwipeRight} className="swipe-btn">
              Swipe Right
            </button>
          </div>
        </div>
      ):(
        <p>No more pets to show!</p>
      ) }

      <Adopted adoptedPets={adoptedPets} />
    </div>
  );
}

export default App;