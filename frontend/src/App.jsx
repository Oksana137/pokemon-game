import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Cards from "./components/Cards";
import Detail from "./pages/Detail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Cards />} />
        <Route path="/:id" element={<Detail />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
