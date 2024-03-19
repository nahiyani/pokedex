import React, { useState, useEffect } from 'react';
import './Model.css';

const PokemonInfo = ({ setOpenModel }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const calculateTotal = (pokemon) => {
    return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
  };

  return (
    <div className="morestats">
      {pokemonData && pokemonData.length > 0 && (
        <>
          <p>{pokemonData[0].id}</p>
          <p>Name: {pokemonData[0].name.english}</p>
          <p>Japanese Name: {pokemonData[0].name.japanese}</p>
          <p>Chinese Name: {pokemonData[0].name.chinese}</p>
          <p>French Name: {pokemonData[0].name.french}</p>
          <p>Type: {pokemonData[0].type.join(', ')}</p>
          <p>Total: {calculateTotal(pokemonData[0])}</p>
          <p>HP: {pokemonData[0].base.HP}</p>
          <p>Attack: {pokemonData[0].base.Attack}</p>
          <p>Defense: {pokemonData[0].base.Defense}</p>
          <p>Sp. Attack: {pokemonData[0].base["Sp. Attack"]}</p>
          <p>Sp. Defense: {pokemonData[0].base["Sp. Defense"]}</p>
          <p>Speed: {pokemonData[0].base.Speed}</p>
        </>
      )}
      <button className="close" onClick={() => setOpenModel(false)}>X</button>
    </div>
  );
};

export default PokemonInfo;