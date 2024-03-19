/*import React from 'react'
import './Model.css';

const PokemonInfo = ({setOpenModel}) => {
    
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
        .then(response => response.json())
        .then(data => setPokemonData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return (
      <div className="morestats">
            <p>{pokemon.id}</p>
            <p>Name: {pokemon.name.english}</p>
            <p>Name (中国人): {pokemon.name.japanese}</p>
            <p>Name (日本語): {pokemon.name.chinese}</p>
            <p>Name (français): {pokemon.name.french}</p>
            <p> Type(s):
              {pokemon.type.map((type, index) => (
              <div key={index}>{type}</div>
              ))}
            </p>
            <p>Total: {calculateTotal(pokemon)}</p>
            <p>HP: {pokemon.base.HP}</p>
            <p>Attack: {pokemon.base.Attack}</p>
            <p>Defense: {pokemon.base.Defense}</p>
            <p>Sp. Attack: {pokemon.base["Sp. Attack"]}</p>
            <p>Sp. Defense: {pokemon.base["Sp. Defense"]}</p>
            <p>Speed: {pokemon.base.Speed}</p>
          <button className="close" onClick={() => setOpenModel(false)}>X</button>
      </div>
    
    )
  }

export default PokemonInfo*/