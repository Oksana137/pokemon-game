import Leaderboard from "../models/leaderboardSchema.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllLeaderboard = async(req, res, next) => {
    try {
        const leaderboard = await Leaderboard.find();
        if (!leaderboard.length) {
            throw new ErrorResponse('No player found', 404);
          }
        res.json(leaderboard)
    } catch (error) {
        next(error);
    }
}

export const getLeaderboardById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const leaderboard = await Leaderboard.findById(id);
      if (!leaderboard) {
        throw new ErrorResponse('No player found', 404);
      }
      res.json(leaderboard);
    } catch (error) {
      next(error);
    }
  };


export const addNewLeaderboard = async (req, res, next) => {
    const { username, score, date } = req.body;

    const formattedDate = new Date(date); // Datum in ein Date-Objekt konvertieren

    try {
        const newLeaderboard = await Leaderboard.create({
            username,
            score,
            date: formattedDate, // Speichern als Date-Objekt
        });
        res.status(201).json(newLeaderboard);
    } catch (error) {
        next(error);
    }
};

export default Leaderboard;



  export const updateLeaderboard = async (req, res, next) => {
    const { id } = req.params;
    const { username, score, date } = req.body;
  
    try {
      const updatedLeaderboard = await Leaderboard.findByIdAndUpdate(
        id,
        { username, score, date },
        { new: true } //this ensures the updated document is returned!
      );
  
      if (!updatedLeaderboard) {
        throw new ErrorResponse('Player not found', 404);
      }
      res.json(updatedLeaderboard);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteLeaderboard = async (req, res, next) => {
    const { id } = req.params;
    try {
      await Leaderboard.findByIdAndDelete(id);
      res.json({ message: `Player with the id ${id} was deleted` });
    } catch (error) {
      next(error);
    }
  };
  