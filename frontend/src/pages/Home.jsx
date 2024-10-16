import Fotter from "../components/Fotter";
import Gamelogic from "../components/Gamelogic";
import NavBar from "../components/NavBar";
import MainLayout from "../layouts/MainLayout";
const Home = () => {
  return (
    <>
      <MainLayout/>
      <Gamelogic />
    <Fotter/>
    </>
  );
};

export default Home;
