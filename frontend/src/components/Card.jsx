import { Link } from "react-router-dom";

const Card = ({ pokemon }) => {
  return (
    <Link to={`/${pokemon.id}`}>
      <div className="bg-[#929497] p-4 w-80 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-base-100 rounded-lg overflow-hidden">
          <h2 className="font-bold p-4 bg-gradient-to-r from-[#feeb46] to-[#edc53b] text-neutral">
            {pokemon.name.toUpperCase()}
          </h2>
          <figure>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </figure>
        </div>
      </div>
    </Link>
  );
};

export default Card;
