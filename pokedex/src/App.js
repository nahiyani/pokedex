import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <main>
        <div className="container">
          {pokemonData ? (
            <PokemonTable pokemonData={pokemonData} />
          ) : (
            <p>Loading Pokémon data...</p>
          )}
        </div>
      </main>
    </div>
  );
}

function PokemonTable({ pokemonData }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = key => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortByName = (a, b) => {
    const nameA = a.name.english.toLowerCase();
    const nameB = b.name.english.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  // Separate sorting function
  const sortById = (a, b) => a.id - b.id;
  const sortByTotal = (a, b) => calculateTotal(a) - calculateTotal(b);
  const sortByHP = (a, b) => a.base.HP - b.base.HP;
  const sortByAttack = (a, b) => a.base.Attack - b.base.Attack;
  const sortByDefense = (a, b) => a.base.Defense - b.base.Defense;
  const sortBySpAttack = (a, b) => a.base['Sp. Attack'] - b.base['Sp. Attack'];
  const sortBySpDefense = (a, b) => a.base['Sp. Defense'] - b.base['Sp. Defense'];
  const sortBySpeed = (a, b) => a.base.Speed - b.base.Speed;

  const calculateTotal = pokemon => {
    return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
  };

  let sortingFunction;
  switch (sortConfig.key) {
    case 'id':
      sortingFunction = sortById;
      break;
    case 'name':
      sortingFunction = sortByName;
      break;
    case 'total':
      sortingFunction = sortByTotal;
      break;
    case 'HP':
      sortingFunction = sortByHP;
      break;
    case 'Attack':
      sortingFunction = sortByAttack;
      break;
    case 'Defense':
      sortingFunction = sortByDefense;
      break;
    case 'Sp. Attack':
      sortingFunction = sortBySpAttack;
      break;
    case 'Sp. Defense':
      sortingFunction = sortBySpDefense;
      break;
    case 'Speed':
      sortingFunction = sortBySpeed;
      break;
    default:
      sortingFunction = sortById; // Default sorting by id
      break;
  }

  // Sort the Pokemon data using the selected sorting function
  const sortedPokemonData = [...pokemonData].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return sortingFunction(a, b);
    } else {
      return sortingFunction(b, a); // Reverse sorting for descending order
    }
  });

  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th>Type</th>
          <th onClick={() => handleSort('total')}>Total</th>
          <th onClick={() => handleSort('HP')}>HP</th>
          <th onClick={() => handleSort('Attack')}>Attack</th>
          <th onClick={() => handleSort('Defense')}>Defense</th>
          <th onClick={() => handleSort('Sp. Attack')}>Sp. Attack</th>
          <th onClick={() => handleSort('Sp. Defense')}>Sp. Defense</th>
          <th onClick={() => handleSort('Speed')}>Speed</th>
        </tr>
      </thead>
      <tbody>
        {sortedPokemonData.map(pokemon => (
          <tr key={pokemon.id}>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;