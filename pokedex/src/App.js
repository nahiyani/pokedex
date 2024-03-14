import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  //API fetching
  const URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b7d21bb44af1e27256b893737fb76d68&page=1";

  const [nameEnglish, setNameEnglish] = useState("");
  const [nameJapanese, setNameJapanese] = useState("");
  const [nameChinese, setnameChinese] = useState("");
  const [nameFrench, setNameFrench] = useState("");

  useEffect (() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      console.log(result);
    }
    fetchData();
  }, [])
  
  return (
    <div className="App">
        <h2>All Pokémon stats can be found here!</h2>
    </div>
  );
}

export default App;
