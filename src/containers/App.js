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

  csvToArray(str, delimiter = ",") {
    // slicing
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\r\n") + 1).split("\r\n");
  
    // Map the rows
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }
  

  async componentDidMount() {
    let myPokeList = [];
    let pokedata;
    const pokeCount = 151;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokeCount}`);
    const pokeList = await response.json();

    response = await fetch(`/assets/translations.csv`);
    let contents = await response.text();
    let translationArray = this.csvToArray(contents, ",");

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
          "translation": translationArray[pokedata.id-1]
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
