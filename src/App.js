import React, { useEffect, useState } from "react";
import "./components/PokemonThumbnail.js";
import "./App.css";
import PokemonThumbnail from "./components/PokemonThumbnail.js";

const App = () => {
  const [data, setData] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const response = await fetch(loadMore);
    const data = await response.json();
    setLoadMore(data.next);

    const card = (results) => {
      results.forEach(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        const data = await response.json();
        setData((currentList) => [...currentList, data]);
        await data.sort((a, b) => a.id - b.id);
      });
    };
    card(data.results);
  };

  return (
    <div className="app-container">
      <span className="font-link"></span>
      <div className="pokemon-container">
        <div className="card-container">
          <h1>Gotta Catch 'em All!</h1>
          <span className="info">
            {data
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((pokemonStats, index) => (
                <PokemonThumbnail
                  key={index}
                  id={pokemonStats.id}
                  image={pokemonStats.sprites.other.dream_world.front_default}
                  name={pokemonStats.name}
                  type={pokemonStats.types[0].type.name}
                />
              ))}
          </span>
          <button className="load-more" onClick={() => handleFetch()}>
            Get More Pokemon!
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

{
  /* <div className="all-container">
  {allPokemons
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((pokemon, index) => (
      <PokemonThumbnail
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.sprites.other.dream_world.front_default}
        type={pokemon.types[0].type.name}
        key={index}
      />
    ))}
</div>; */
}
