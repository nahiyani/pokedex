import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setError('Error fetching Pokémon data. Please try again later.');
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="pokemon-container">
        {pokemonData ? (
          pokemonData.map(pokemon => (
        <div key={pokemon.id} className="pokemon-card">
        <h2>{pokemon.name.english}</h2>
        <div className="stats">
          <p>#{pokemon.id}</p>
          <p>Types: {pokemon.type.join(', ')}</p>
          <p>HP: {pokemon.base.HP}</p>
          <p>Attack: {pokemon.base.Attack}</p>
          <p>Defense: {pokemon.base.Defense}</p>
          <p>Sp. Atk: {pokemon.base["Sp. Attack"]}</p>
          <p>Sp. Def: {pokemon.base["Sp. Defense"]}</p>
          <p>Speed: {pokemon.base.Speed}</p>
        </div>
      </div>
    ))
  ) : (
    <p>Loading Pokémon data...</p>
  )}
</div>
      )}
    </div>
  );
  
}

export default App;
