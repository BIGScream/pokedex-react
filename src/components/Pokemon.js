import React from "react";
import "./Pokemon.css"

const Pokemon = ({pokemon}) => {
    console.log(pokemon);
    return (
        <div className="pokemon-card">
            <div class="pokemon-card__id">#{pokemon.id}</div>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.artwork} alt={pokemon.name} class="pokemon-card__artwork" />
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