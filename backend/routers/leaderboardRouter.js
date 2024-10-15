import { Router } from 'express';
import * as leaderboardController from '../controllers/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter
    .route('/')
    .get(leaderboardController.getAllLeaderboard)
    .post(leaderboardController.addNewLeaderboard);

    leaderboardRouter
      .route('/:id')
      .get(leaderboardController.getLeaderboardById)
      .put(leaderboardController.updateLeaderboard)
      .delete(leaderboardController.deleteLeaderboard);

    leaderboardRouter
      .route('/name/:name')  
      .get(leaderboardController.getLeaderboardByName);
     

export default leaderboardRouter;
