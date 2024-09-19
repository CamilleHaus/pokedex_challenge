import React from 'react';

const typeColors = {
  fire: "bg-red-500",       
  grass: "bg-green-500",     
  water: "bg-blue-500",       
  electric: "bg-yellow-500",   
  poison: "bg-purple-500",     
  flying: "bg-blue-300",       
  ice: "bg-teal-400",          
  fighting: "bg-red-700",      
  ground: "bg-yellow-800",     
  psychic: "bg-pink-500",   
  bug: "bg-lime-500",        
  rock: "bg-gray-600",       
  ghost: "bg-purple-700",      
  dragon: "bg-indigo-700",     
  dark: "bg-gray-800",        
  steel: "bg-gray-400",       
  fairy: "bg-pink-300"         
};

const Type = ({typeName}) => {
    const bgColor = typeColors[typeName] || "bg-gray-500";
    return (
      <div
        className={`flex flex-1 items-center justify-center px-3 py-1.5 text-white rounded-md uppercase opacity-85 ${bgColor}`}
      >
        {typeName}
      </div>
    );
}

export default Type
