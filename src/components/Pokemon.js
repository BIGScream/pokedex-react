import React from "react";
import "./Pokemon.css"

const Pokemon = ({pokemon}) => {
    console.log(pokemon);
    const artwork = pokemon.sprites.other["official-artwork"].front_default;
    return (
        <div className="pokemon-card">
            <h3>#{pokemon.id} {pokemon.name}</h3>
            <img src={artwork} alt={pokemon.name} />
            <ul>
                {
                    pokemon.types.map( (type) => {
                        return <li>{type.type.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Pokemon;