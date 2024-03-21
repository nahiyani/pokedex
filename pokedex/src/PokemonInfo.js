import React, { useState, useEffect, useMemo } from 'react';
import './PokemonInfo.css';

const PokemonInfo = ({ setOpenModel, pokemonId }) => {
  const [pokemon, setPokemon] = useState(null);
  const [percentiles, setPercentiles] = useState({
    total: 0,
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  });

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

  const calculateTotal = useMemo(() => (pokemon) => {
    return Object.values(pokemon.base).reduce((acc, val) => acc + val, 0);
  }, []);

  useEffect(() => {
    if (pokemon) {
      const stats = {
        total: calculateTotal(pokemon),
        hp: pokemon.base.HP,
        attack: pokemon.base.Attack,
        defense: pokemon.base.Defense,
        specialAttack: pokemon.base["Sp. Attack"],
        specialDefense: pokemon.base["Sp. Defense"],
        speed: pokemon.base.Speed,
      };

      const fetchPokedexData = async () => {
        try {
          const response = await fetch(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`);
          const data = await response.json();
          const sortedData = data.slice().sort((a, b) => calculateTotal(a) - calculateTotal(b));

          const calculatePercentile = (stat, value) => {
            const count = sortedData.filter(p => stat(p) <= value).length;
            return Math.round((count / sortedData.length) * 100);
          };

          setPercentiles({
            total: calculatePercentile(p => calculateTotal(p), stats.total),
            hp: calculatePercentile(p => p.base.HP, stats.hp),
            attack: calculatePercentile(p => p.base.Attack, stats.attack),
            defense: calculatePercentile(p => p.base.Defense, stats.defense),
            specialAttack: calculatePercentile(p => p.base["Sp. Attack"], stats.specialAttack),
            specialDefense: calculatePercentile(p => p.base["Sp. Defense"], stats.specialDefense),
            speed: calculatePercentile(p => p.base.Speed, stats.speed),
          });
        } catch (error) {
          console.error('Error fetching Pokedex data:', error);
        }
      };

      fetchPokedexData();
    }
  }, [pokemon, calculateTotal]);

  const calculateColor = (percentile) => {
    const hue = (percentile / 100) * 120; 
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div className={`modal ${pokemon ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close" onClick={() => setOpenModel(false)}>x</button>
        {pokemon && (
          <>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      id='pokemonimagemodal'
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
                  <td className="stats-table">
                    <h2 id='pokemon-label'>#{pokemon.id}: {pokemon.name.english}</h2>
                    <p>Name: {pokemon.name.english}</p>
                    <p>Japanese Name: {pokemon.name.japanese}</p>
                    <p>Chinese Name: {pokemon.name.chinese}</p>
                    <p>French Name: {pokemon.name.french}</p>
                    <p>Type: {pokemon.type.join(', ')}</p>
                    <p>Total: {calculateTotal(pokemon)} (Percentile: <span style={{ color: calculateColor(percentiles.total) }}>{percentiles.total}</span>)</p>
                    <p>HP: {pokemon.base.HP} (Percentile: <span style={{ color: calculateColor(percentiles.hp) }}>{percentiles.hp}</span>)</p>
                    <p>Attack: {pokemon.base.Attack} (Percentile: <span style={{ color: calculateColor(percentiles.attack) }}>{percentiles.attack}</span>)</p>
                    <p>Defense: {pokemon.base.Defense} (Percentile: <span style={{ color: calculateColor(percentiles.defense) }}>{percentiles.defense}</span>)</p>
                    <p>Special Attack: {pokemon.base["Sp. Attack"]} (Percentile: <span style={{ color: calculateColor(percentiles.specialAttack) }}>{percentiles.specialAttack}</span>)</p>
                    <p>Special Defense: {pokemon.base["Sp. Defense"]} (Percentile: <span style={{ color: calculateColor(percentiles.specialDefense) }}>{percentiles.specialDefense}</span>)</p>
                    <p>Speed: {pokemon.base.Speed} (Percentile: <span style={{ color: calculateColor(percentiles.speed) }}>{percentiles.speed}</span>)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;