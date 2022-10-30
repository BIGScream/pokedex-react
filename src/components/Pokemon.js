import React from "react";

const Pokemon = ({pokemon}) => {
    const artwork = pokemon.sprites.other["official-artwork"].front_default
    return (
        <div className="pokemon-card">
            <h3>#{pokemon.id} {pokemon.name}</h3>
            <img src={artwork} />
        </div>
        
    )
}

export default Pokemon;