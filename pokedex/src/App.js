import React, { useState, useEffect } from 'react';
import PokemonInfo from './PokemonInfo';
import TypeSort from './TypeSort';
import Search from './Search';
import './App.css';

const typeColors = {
  Grass: '#78C850', Poison: '#A040A0', Fire: '#F08030', Water: '#6890F0', Bug: '#A8B820', Normal: '#A8A878',
  Electric: '#F8D030', Ground: '#E0C068', Fairy: '#EE99AC', Fighting: '#C03028', Psychic: '#F85888', Rock: '#B8A038',
  Ghost: '#705898', Ice: '#98D8D8', Dragon: '#7038F8', Dark: '#705848', Steel: '#B8B8D0',
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
  const [isModelOpen, setIsModelOpen] = useState(false); 

  const handlePokemonDetailsClick = (pokemonId) => {
    setSelectedPokemonId(pokemonId);
    setSelectedPokemon(filteredPokemonData.find(pokemon => pokemon.id === pokemonId));
    setIsModelOpen(true);
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

  useEffect(() => {
    if (pokemonData) {
      const { type, searchQuery } = filterOptions;
      const filteredData = pokemonData.filter(pokemon => {
        const matchesType = type === '' || pokemon.type.includes(type);
        const matchesSearch = searchQuery === '' || pokemon.name.english.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      });

      setFilteredPokemonData(filteredData);
      setTotalItems(filteredData.length);
    }
  }, [filterOptions, pokemonData]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <Search filterPokemon={setFilterOptions} />
          <TypeSort filterPokemon={type => setFilterOptions(previousOptions => ({ ...previousOptions, type }))} />
          <p id='toptext'>Results Returned: {totalItems}</p>
          {filteredPokemonData ? (
            <>
              <PokemonTable
                pokemonData={filteredPokemonData}
                onPokemonDetails={handlePokemonDetailsClick}
                sortConfig={sortConfig}
                handleSort={handleSort}
              />
              {isModelOpen && selectedPokemon && <PokemonInfo setOpenModel={setIsModelOpen} pokemonId={selectedPokemonId} />}
            </>
          ) : (
            <p id='toptext'>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

function PokemonTable({ pokemonData, onPokemonDetails, sortConfig, handleSort }) {
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

  const sortedPokemonData = [...pokemonData].sort((a, b) => {
    const sortFunction = sortingFunctions[key];
    return direction === 'asc' ? sortFunction(a, b) : sortFunction(b, a);
  });

  return (
    <table className="pokemon-table">
      <thead>
        <tr>
          <th id='default-header'>Image</th>
          <th onClick={() => handleSort('id')}>Number</th>
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
            <td>
              <img
                id='pokemonimage'
                src={`https://img.pokemondb.net/artwork/${pokemon.id === 29 ? 'nidoran-f' : 
                    pokemon.id === 32 ? 'nidoran-m' :
                    pokemon.id === 83 ? 'farfetchd' :
                    pokemon.id === 122 ? 'mr-mime' :
                    pokemon.id === 439 ? 'mime-jr' :
                    pokemon.id === 669 ? 'flabebe' :
                    pokemon.id === 772 ? 'type-null' :
                    (pokemon.name.english.includes(' ') ? pokemon.name.english.split(' ').join('-').toLowerCase() : pokemon.name.english.toLowerCase())}.jpg`}
                alt={pokemon.name.english}/>
            </td>
            <td>{pokemon.id}</td>
            <td>{pokemon.name.english}</td>
            <td>
              {pokemon.type.map((type, index) => (
                <div id='type-colours' key={index} style={{ backgroundColor: typeColors[type] }}>{type}</div>
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