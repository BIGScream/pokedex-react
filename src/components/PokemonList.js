import React from "react";
import Pokemon from "./Pokemon";
import "./PokemonList.css"

const PokemonList = ({pokemonList}) => {
    let pokemonListArr = [];
    if (pokemonList) {
        pokemonListArr = pokemonList.map( (singlePokemon, index) => {
            return <Pokemon pokemon={singlePokemon} key={index} />
        });
    }
    return (
        <div className="pokemon-list">
            {pokemonListArr}
        </div>
    );
}

export default PokemonList;