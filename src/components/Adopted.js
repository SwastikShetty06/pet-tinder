import React from "react";

const Adopted = ({ adoptedPets }) => {
    return (
        <div className="adopted">
        <h2>Adopted Pets</h2>
        {adoptedPets.length > 0 ? (
            <ul>
            {adoptedPets.map((pet) => (
                <li key={pet.id}>
                <img src={pet.imagePet} alt={pet.name} className="adopted-image" />
                <div className="adopted-info">
                    <h3>{pet.name}</h3>
                    <p>{pet.type} - {pet.breed}</p>
                </div>
                </li>
            ))}
            </ul>
        ) : (
            <p>No pets adopted yet!</p>
        )}
        </div>
    );
};

export default Adopted;