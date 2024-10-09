import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesElements,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Cards />} />
        <Route path="/:id" element={<Detail />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
