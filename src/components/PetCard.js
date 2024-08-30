import React from "react";

const PetCard = ({ pet }) => {
    return (
        <div className="pet-card">
        <img src={pet.image} alt={pet.name} className="pet-image" />
        <h3>{pet.name}</h3>
        <p>{pet.type} - {pet.breed}</p>
        <p>Age: {pet.age}</p>
        </div>
    );
};

export default PetCard;