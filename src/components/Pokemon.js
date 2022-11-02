import React from "react";
import "./Pokemon.css"

const Pokemon = ({pokemon}) => {
    return (
        <div className="pokemon-card">
            <div className="pokemon-card__id">#{pokemon.id}</div>
            <h3>{pokemon.translated_name}</h3>
            <img src={pokemon.artwork} alt={pokemon.name} className="pokemon-card__artwork" />
            <ul className="types">
                {
                    pokemon.types.map( (type) => {
                        return <li className={"type type--" + type.type.name}>{type.type.name}</li>
                    })
                }
            </ul>
            <br></br>
            <b>{pokemon.genus}</b>
            <br></br>
            Gewicht: {pokemon.weight/10}kg<br></br>
            Höhe: {pokemon.height*10}cm<br></br>
            <br></br>

            {pokemon.species_text}
        </div>
    )
}

export default Pokemon;