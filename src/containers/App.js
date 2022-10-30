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
    const pokeCount = 3;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokeCount}`);
    const pokeList = await response.json();
    console.log("pokeList", pokeList)
    for (let pkmn of pokeList.results) {
      console.log("api", pkmn);
      response = await fetch(pkmn.url);
      pokedata = await response.json();
      myPokeList.push(pokedata)
    };
    console.log("FullList", myPokeList);
    this.setState({pokemon: myPokeList});
    console.log("stateList", this.state.pokemon);
  }

  render() {
    console.log("stateList2", this.state.pokemon);
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="Pokemon Logo" src='http://pokedex.pascal-nees.de/assets/img/pokemon_logo.png'></img>
          <h1>React Pokédex</h1>
          <PokemonList pokemonList={this.state.pokemon} />
        </header>
      </div>
    );
  }
}

export default App;
