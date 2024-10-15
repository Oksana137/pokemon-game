import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // SweetAlert2 importieren
import NavBar from "../components/NavBar";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:8201/leaderboard");
      const sortedPlayers = response.data.sort((a, b) => b.score - a.score); 
      setPlayers(sortedPlayers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch leaderboard data.");
      setLoading(false);
    }
  };

  // Funktion, um einen Spieler zu löschen
  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:8201/leaderboard/${id}`);
      setPlayers(players.filter((player) => player._id !== id)); 
    } catch (err) {
      console.error("Error deleting player:", err);
    }
  };

  
  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Abbrechen'
    }).then((result) => {
      if (result.isConfirmed) {
        
        deletePlayer(id);
        Swal.fire(
          'Yes, delete it!',
          'The player has been deleted.',
          'success'
        );
      }
    });
  };

  
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <NavBar/>
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player._id} className="bg-yellow-300 text-black">
              <td className="border px-4 py-2">{index + 1}</td> 
              <td className="border px-4 py-2">{player.username}</td> 
              <td className="border px-4 py-2">{player.score}</td> 
              <td className="border px-4 py-2">
                
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => confirmDelete(player._id)}
                  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </>
  );
};

export default Leaderboard;
