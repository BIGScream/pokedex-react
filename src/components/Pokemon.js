import React from "react";
import "./Pokemon.css"

const Pokemon = ({pokemon}) => {
    console.log(pokemon);
    return (
        <div className="pokemon-card">
            <div class="pokemon-card__id">#{pokemon.id}</div>
            <h3>{pokemon.translation.name}</h3>
            <img src={pokemon.artwork} alt={pokemon.name} class="pokemon-card__artwork" />
            <ul className="types">
                {
                    pokemon.types.map( (type) => {
                        return <li className={"type type--" + type.type.name}>{type.type.name}</li>
                    })
                }
            </ul>
            <br></br>
            <b>{pokemon.translation.genus}-Pokémon</b>
            <br></br>
            Gewicht: {pokemon.weight/10}kg<br></br>
            Höhe: {pokemon.height*10}cm<br></br>
        </div>
    )
}

export default Pokemon;