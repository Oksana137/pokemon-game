import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonBattle = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [pokemonName1, setPokemonName1] = useState("");
  const [username, setUsername] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [battleDone, setBattleDone] = useState(false);

  // Funktion zum Abrufen einer zufälligen Pokémon-ID
  const getRandomPokemonId = () => Math.floor(Math.random() * 898) + 1;

  // useEffect, um Pokémon-Daten zu holen, wenn der Benutzer das Pokémon sucht
  useEffect(() => {
    if (triggerFetch && pokemonName1) {
      setLoading(true);
      setError(null);
      axios
        .all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName1.toLowerCase()}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`)
        ])
        .then(
          axios.spread((res1, res2) => {
            setPokemon1(res1.data);
            setPokemon2(res2.data);
            setLoading(false);
            setBattleDone(false);
          })
        )
        .catch(error => {
          setError("Failed to fetch Pokémon data. Please check the Pokémon name.");
          setLoading(false);
        });
    }
    setTriggerFetch(false);
  }, [triggerFetch, pokemonName1]);

  // Funktion zum Senden von Benutzername und Score an die API
  const sendScoreToAPI = async (username, score) => {
    try {
      const currentDate = new Date().toISOString(); // Holt das aktuelle Datum im ISO-Format
      const response = await axios.post("http://localhost:8201/leaderboard", {
        username,
        score,
        date: currentDate,
      });
      console.log("Score sent to leaderboard successfully:", response.data);
    } catch (error) {
      console.error("Error sending score to leaderboard:", error.response?.data || error.message);
    }
  };

  // Funktion zum Kampfstart und Bestimmung des Siegers
  const fightHandler = () => {
    if (!battleDone && pokemon1 && pokemon2) {
      const pokemon1HP = pokemon1.stats[0].base_stat; // HP von Pokémon 1
      const pokemon2HP = pokemon2.stats[0].base_stat; // HP von Pokémon 2

      if (pokemon1HP > pokemon2HP) {
        setResult(`${pokemon1.name} Wins!`);
        const newScore = score + 5;
        setScore(newScore);

        // Senden des Benutzernamens und des neuen Scores an die Leaderboard-API
        if (username) {
          sendScoreToAPI(username, newScore);
        }
      } else if (pokemon2HP > pokemon1HP) {
        setResult(`${pokemon2.name} Wins!`);
      } else {
        setResult("It's a draw!");
      }
      setBattleDone(true);
    }
  };

  // Funktion zum Zurücksetzen des Spiels
  const resetHandler = () => {
    setPokemon1(null);
    setPokemon2(null);
    setResult("");
    setPokemonName1("");
    setUsername("");
    setError(null);
    setScore(0);
    setBattleDone(false);
  };

  // Modal-Funktion zum Anzeigen von Pokémon-Details
  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen text-white py-10">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">Pokémon Battle Arena</h1>

        {/* Eingabe für den Spielernamen und Pokémon */}
        <div className="flex justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs text-black"
          />
          <input
            type="text"
            placeholder="Enter your Pokémon name"
            value={pokemonName1}
            onChange={e => setPokemonName1(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs text-black"
          />
          <button className="btn btn-primary" onClick={() => setTriggerFetch(true)}>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-error">{error}</p>}

        {/* Kartenansicht für Pokémon */}
        <div className="grid grid-cols-2 gap-8 justify-items-center mt-6">
          {[pokemon1, pokemon2].map((pokemon, index) =>
            pokemon ? (
              <div
                key={index}
                className="card w-96 bg-yellow-300 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                onClick={() => handlePokemonSelect(pokemon)}
              >
                <figure className="p-4">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="rounded-lg" />
                </figure>
                <div className="card-body text-black">
                  <h2 className="card-title text-2xl capitalize">{pokemon.name}</h2>
                  <p className="text-lg">HP: {pokemon.stats[0].base_stat}</p>
                  <p className="text-lg">Attack: {pokemon.stats[1].base_stat}</p>
                  <p className="text-lg">Defense: {pokemon.stats[2].base_stat}</p>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Kampf- und Reset-Buttons */}
        <div className="mt-8">
          <button
            className="btn btn-accent text-lg px-6 py-2 mr-4"
            onClick={fightHandler}
            disabled={!pokemon1 || !pokemon2 || battleDone}
          >
            Fight
          </button>
          <button className="btn btn-error text-lg px-6 py-2" onClick={resetHandler}>
            Reset
          </button>
        </div>

        {/* Ergebnis */}
        {result && (
          <div className="mt-4 p-4 bg-yellow-300 text-bla rounded-lg shadow-xl text-black">
            <h2 className="text-3xl">{result}</h2>
          </div>
        )}

        {/* Modal für Pokémon-Details */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="modal-box relative bg-gray-800 text-white rounded-lg shadow-xl p-5">
              <h3 className="font-bold text-lg">{selectedPokemon.name}</h3>
              <p>Height: {selectedPokemon.height} dm</p>
              <p>Weight: {selectedPokemon.weight} hg</p>
              <p>Types: {selectedPokemon.types.map(type => type.type.name).join(", ")}</p>
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonBattle;






