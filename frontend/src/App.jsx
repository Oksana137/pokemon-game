import { Route, BrowserRouter, Routes } from "react-router-dom";

import LeaderBord from "./pages/LeaderBord";
import Home from "./pages/Home";

function App() {
  return( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderbord" element={<LeaderBord />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
