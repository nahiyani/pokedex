import React, { useState, useEffect } from 'react';
import PokemonInfo from './PokemonInfo';
import TypeSort from './TypeSort';
import Search from './Search';
import './App.css';

const typeColors = {
  Grass: '#78C850', Poison: '#A040A0',  Fire: '#F08030',  Water: '#6890F0',  Bug: '#A8B820',  Normal: '#A8A878',
  Electric: '#F8D030',  Ground: '#E0C068',  Fairy: '#EE99AC',  Fighting: '#C03028',  Psychic: '#F85888',  Rock: '#B8A038',
  Ghost: '#705898',  Ice: '#98D8D8',  Dragon: '#7038F8',   Dark: '#705848',  Steel: '#B8B8D0',
  Flying: '#A890F0',
};

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filteredPokemonData, setFilteredPokemonData] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [filterOptions, setFilterOptions] = useState({ type: '', searchQuery: '' });

  const handlePokemonDetailsClick = (pokemonId) => {
    setSelectedPokemonId(pokemonId);
    setSelectedPokemon(filteredPokemonData.find(pokemon => pokemon.id === pokemonId));
  };

  const filterPokemon = () => {
    if (pokemonData) {
      const { type, searchQuery } = filterOptions;
      const filteredData = pokemonData.filter(pokemon => {
        const matchesType = type === '' || pokemon.type.includes(type);
        const matchesSearch = searchQuery === '' || pokemon.name.english.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      });
    
      setFilteredPokemonData(filteredData);
    }
  };
 
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(response => response.json())
      .then(data => {
        setPokemonData(data);
        setFilteredPokemonData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    filterPokemon();
  }, [filterOptions, pokemonData]);

  return (
    <div className="App">
      <main>
        <div className="container">
          <Search filterPokemon={filterPokemon} setSearchQuery={query => setFilterOptions(prevOptions => ({ ...prevOptions, searchQuery: query }))} />
          <TypeSort filterPokemon={type => setFilterOptions(prevOptions => ({ ...prevOptions, type }))} />
          <TotalItemsCounter totalItems={totalItems} />
          {filteredPokemonData ? (
            <>
              <PokemonTable
                pokemonData={filteredPokemonData}
                onPokemonDetails={handlePokemonDetailsClick}
                sortConfig={sortConfig}
                handleSort={handleSort}
                setTotalItems={setTotalItems}
              />
              {selectedPokemonId && <PokemonInfo pokemon={selectedPokemon} />}
            </>
          ) : (
            <p id='loading'>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

function TotalItemsCounter({ totalItems }) {
  return <p id='results-returned'>Results Returned: {totalItems}</p>;
}

function PokemonTable({ pokemonData, onPokemonDetails, sortConfig, handleSort, setTotalItems }) {
  const { key, direction } = sortConfig;

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

  useEffect(() => {
    setTotalItems(pokemonData.length);
  }, [pokemonData, setTotalItems]);

  const sortedPokemonData = [...pokemonData].sort((a, b) => {
    const sortFunction = sortingFunctions[key];
    return direction === 'asc' ? sortFunction(a, b) : sortFunction(b, a);
  });

  return (
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
                <div key={index} style={{ backgroundColor: typeColors[type], padding: '5px', borderRadius: '15px', color: 'white', marginRight: '5px', width: '100px', fontWeight: 'bold' }}>{type}</div>
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

function calculateTotal(pokemon) {
  return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
}

export default App;