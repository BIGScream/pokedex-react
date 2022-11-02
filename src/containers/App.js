import React, {Component}  from 'react';
import './App.css';
import PokemonList from '../components/PokemonList'

class App extends Component {

  constructor() {
    super();
    this.state = {
      pokemon: [],
      searchField: '',
    }
  }

  async componentDidMount() {
    let myPokeList = [];
    let pokedata, speciesdata, speciesName, speciesText, speciesDescr;
    const pokeCount = 4;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokeCount}`);
    const pokeList = await response.json();

    for (let pkmn of pokeList.results) {
      if (localStorage.getItem('pokeList_' + pkmn.name)) {
        console.log(pkmn.name + " from storage");
        pokedata = JSON.parse(localStorage.getItem('pokeList_' + pkmn.name));
      } else {
        console.log(pkmn.name + " from api");

        // get pokemon stat data
        response = await fetch(pkmn.url);
        pokedata = await response.json();

        // get species data
        response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokedata.id}/`);
        speciesdata = await response.json();
        console.log(speciesdata);

        speciesName = speciesdata.names.filter((name) => name.language.name === "de");
        speciesText = speciesdata.flavor_text_entries.filter((txt) => txt.language.name === "de");
        speciesDescr = speciesdata.genera.filter((desc) => desc.language.name === "de");

        // Filter Pokedata
        pokedata = {
          "id": pokedata.id,
          "name": pokedata.name,
          "types": pokedata.types,
          "artwork": pokedata.sprites.other["official-artwork"].front_default,
          "height": pokedata.height,
          "weight": pokedata.weight,
          "translated_name": speciesName[0].name,
          "genus": speciesDescr[0].genus,
          "species_text": speciesText[0].flavor_text
        }
        localStorage.setItem('pokeList_' + pkmn.name, JSON.stringify(pokedata));  
      }
      myPokeList.push(pokedata)
    };
    this.setState({pokemon: myPokeList});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="Pokemon Logo" src='http://pokedex.pascal-nees.de/assets/img/pokemon_logo.png'></img>
          <h1>Pokédex</h1>
        </header>
        <PokemonList pokemonList={this.state.pokemon} />
      </div>
    );
  }
}

export default App;
