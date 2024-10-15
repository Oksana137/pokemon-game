import { Route, BrowserRouter, Routes } from "react-router-dom";

import Leaderboard from "./pages/LeaderBord";
import Home from "./pages/Home";

function App() {
  return( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderbord" element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
