import React, { useState, useEffect } from 'react';
import './PokemonInfo.css';

const PokemonInfo = ({ setOpenModel, pokemonId }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`);
        const data = await response.json();
        const selectedPokemon = data.find(pokemon => pokemon.id === pokemonId);
        setPokemon(selectedPokemon);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const calculateTotal = (pokemon) => {
    return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
  };

  return (
    <div className={`modal ${pokemon ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close" onClick={() => setOpenModel(false)}>x</button>
        {pokemon && (
          <>
            <img
                id='pokemonimagemodal'
                src={`https://img.pokemondb.net/artwork/${pokemon.name.english.includes(' ') ? pokemon.name.english.split(' ').join('-').toLowerCase() : pokemon.name.english.toLowerCase()}.jpg`}
                alt={pokemon.name.english}
              />
            <p>Number: {pokemon.id}</p>
            <p>Name: {pokemon.name.english}</p>
            <p>Japanese Name: {pokemon.name.japanese}</p>
            <p>Chinese Name: {pokemon.name.chinese}</p>
            <p>French Name: {pokemon.name.french}</p>
            <p>Type: {pokemon.type.join(', ')}</p>
            <p>Total: {calculateTotal(pokemon)}</p>
            <p>HP: {pokemon.base.HP}</p>
            <p>Attack: {pokemon.base.Attack}</p>
            <p>Defense: {pokemon.base.Defense}</p>
            <p>Sp. Attack: {pokemon.base["Sp. Attack"]}</p>
            <p>Sp. Defense: {pokemon.base["Sp. Defense"]}</p>
            <p>Speed: {pokemon.base.Speed}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;

