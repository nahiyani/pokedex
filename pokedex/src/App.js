//imports
import React, { useState, useEffect } from 'react';
import PokemonInfo from './PokemonInfo';
import TypeSort from './TypeSort';
import './App.css';

//returns the app components
function App() {
  
  //hook variables
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  //opens a model based on the Pokemon ID
  const handlePokemonDetailsClick = (pokemonId) => {
    setSelectedPokemonId(pokemonId);
    setSelectedPokemon(pokemonData.find(pokemon => pokemon.id === pokemonId));
  };

  //filters the Pokemon by type
  const filterPokemonByType = (type) => {
    if (type === '') {
      setFilteredPokemonData(pokemonData);
    } else {
      const filteredPokemon = pokemonData.filter(pokemon => pokemon.type.includes(type));
      setFilteredPokemonData(filteredPokemon);
    }
  };

  //useEffect hook to fetch data from JSON file
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
        setFilteredPokemonData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [filteredPokemonData, setFilteredPokemonData] = useState(null);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  //returns the HTML
  return (
    <div className="App">
      <main>
        <div className="container">
          <TypeSort filterPokemonByType={filterPokemonByType} />
          {filteredPokemonData ? (
            <>
              <PokemonTable
                pokemonData={filteredPokemonData}
                onPokemonDetails={handlePokemonDetailsClick}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
              {selectedPokemonId && <PokemonInfo pokemon={selectedPokemon} />}
            </>
          ) : (
            <p>Loading Pokémon data...</p>
          )}
        </div>
      </main>
    </div>
  );
}

function PokemonTable({ pokemonData, onPokemonDetails, sortConfig, handleSort }) {
  const { key, direction } = sortConfig;

  //sorting functions
  const sortingFunctions = {
    id: (a, b) => a.id - b.id,
    name: (a, b) => a.name.english.localeCompare(b.name.english),
    total: (a, b) => calculateTotal(a) - calculateTotal(b),
    hp: (a, b) => a.base.HP - b.base.HP,
    attack: (a, b) => a.base.Attack - b.base.Attack,
    defense: (a, b) => a.base.Defense - b.base.Defense,
    spAttack: (a, b) => a.base['Sp. Attack'] - b.base['Sp. Attack'],
    spDefense: (a, b) => a.base['Sp. Defense'] - b.base['Sp. Defense'],
    speed: (a, b) => a.base.Speed - b.base.Speed,
  };

  const sortedPokemonData = [...pokemonData].sort((a, b) => {
    const sortFunction = sortingFunctions[key];
    if (direction === 'asc') {
      return sortFunction(a, b);
    } else {
      return sortFunction(b, a);
    }
  });

  return (
    //creates a table containing all the Pokemon and relevant data
    <table className="pokemon-table">
      <thead>
        <tr>
          <th>Image</th>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th id='default-header'>Type</th>
          <th onClick={() => handleSort('total')}>Total</th>
          <th onClick={() => handleSort('hp')}>HP</th>
          <th onClick={() => handleSort('attack')}>Attack</th>
          <th onClick={() => handleSort('defense')}>Defense</th>
          <th onClick={() => handleSort('spAttack')}>Sp. Attack</th>
          <th onClick={() => handleSort('spDefense')}>Sp. Defense</th>
          <th onClick={() => handleSort('speed')}>Speed</th>
          <th id='default-header'></th>
        </tr>
      </thead>
      <tbody>
        {sortedPokemonData.map(pokemon => (
          <tr key={pokemon.id}>
            <td><img id='pokemonimage' src={`https://img.pokemondb.net/artwork/${pokemon.name.english.toLowerCase()}.jpg`} alt={pokemon.name.english} /></td>
            <td>{pokemon.id}</td>
            <td>{pokemon.name.english}</td>
            <td>
              {pokemon.type.map((type, index) => (
                <div key={index}>{type}</div>
              ))}
            </td>
            <td>{calculateTotal(pokemon)}</td>
            <td>{pokemon.base.HP}</td>
            <td>{pokemon.base.Attack}</td>
            <td>{pokemon.base.Defense}</td>
            <td>{pokemon.base["Sp. Attack"]}</td>
            <td>{pokemon.base["Sp. Defense"]}</td>
            <td>{pokemon.base.Speed}</td>
            <td><button id='more-details-button' onClick={() => onPokemonDetails(pokemon.id)}>More</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;

function calculateTotal(pokemon) {
  return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
}