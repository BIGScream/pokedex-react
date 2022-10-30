import React from "react";
import Pokemon from "./Pokemon";

const PokemonList = ({pokemonList}) => {
    console.log("PokemonList", pokemonList)
    let pokemonListArr = [];
    if (pokemonList) {
        pokemonListArr = pokemonList.map( (singlePokemon, index) => {
            return <Pokemon pokemon={singlePokemon} key={index} />
        });
    }
    return (
        <div className="pokemon">
            {pokemonListArr}
        </div>
    );
}

export default PokemonList;