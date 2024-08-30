import React from "react";
import { petData } from "../data";
import PetCard from "./PetCard";

const PetList = () => {
    return (
        <div className="pet-list">
        {petData.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
        ))}
        </div>
    );
    };

export default PetList;