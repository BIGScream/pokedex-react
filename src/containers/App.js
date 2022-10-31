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
    let pokedata;
    const pokeCount = 151;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokeCount}`);
    const pokeList = await response.json();
    for (let pkmn of pokeList.results) {
      if (localStorage.getItem('pokeList_' + pkmn.name)) {
        console.log(pkmn.name + " from storage");
        pokedata = JSON.parse(localStorage.getItem('pokeList_' + pkmn.name));
      } else {
        console.log(pkmn.name + " from api");
        response = await fetch(pkmn.url);
        pokedata = await response.json();
        // Filter Pokedata
        pokedata = {
          "id": pokedata.id,
          "name": pokedata.name,
          "types": pokedata.types,
          "artwork": pokedata.sprites.other["official-artwork"].front_default,
          "height": pokedata.height,
          "weight": pokedata.weight,
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
