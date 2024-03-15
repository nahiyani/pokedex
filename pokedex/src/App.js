import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  //API URL
  const URL = "file:///C:/Users/nahiy/pokedex/pokedex/pokedex.json";
  const [pokemonData, setPokemonData] = useState([]);

  const [error, setError] = useState(null);

  // Fetch data using useEffect hook
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, []);
  
  return (
    <div id='stats'>
      {/* Render each individual Pokémon */}
      {pokemonData.map(pokemon => (
        <div key={pokemon.id}>
          <h2>{pokemon.name.english}</h2>
          <p>Japanese: {pokemon.name.japanese}</p>
          <p>Chinese: {pokemon.name.chinese}</p>
          <p>French: {pokemon.name.french}</p>
          <p>Type: {pokemon.type.join(', ')}</p>
          <p>Base Stats:</p>
          <ul>
            <li>HP: {pokemon.base.HP}</li>
            <li>Attack: {pokemon.base.Attack}</li>
            <li>Defense: {pokemon.base.Defense}</li>
            <li>Special Attack: {pokemon.base['Sp. Attack']}</li>
            <li>Special Defense: {pokemon.base['Sp. Defense']}</li>
            <li>Speed: {pokemon.base.Speed}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;