import React from "react";
import "./Pokemon.css"

const Pokemon = ({pokemon}) => {
    console.log(pokemon);
    return (
        <div className="pokemon-card">
            <h3>#{pokemon.id} {pokemon.name}</h3>
            <img src={pokemon.artwork} alt={pokemon.name} />
            <ul className="types">
                {
                    pokemon.types.map( (type) => {
                        return <li className={"type type--" + type.type.name}>{type.type.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Pokemon;