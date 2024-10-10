import { useEffect, useState } from "react";
import { getPokemon } from "../utils/network";
import Card from "../components/Card";

const Cards = () => {
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        let result = [];
        for (let i = 1; i < 20; i++) {
          const pokemon = await getPokemon(i);
          result.push(pokemon);
        }
        console.log(result);
        setPokemons(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPokemons();
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-8 p-8">
      {pokemons && pokemons.map((pokemon) => <Card pokemon={pokemon} />)}
    </div>
  );
};

export default Cards;
