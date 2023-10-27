import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import {
  fetchPokemons,
  selectNexlUrl,
} from "@app/store/features/pokemonsSlice";
import { Home } from "@app/pages/Home/home.component";
import { Detail } from "@app/pages/Detail/detail.component";

const App = () => {
  const dispatch = useAppDispatch();
  const nextUrl = useAppSelector(selectNexlUrl);
  useEffect(() => {
    if (nextUrl) {
      dispatch(fetchPokemons(nextUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/pokemon/:pokemonName",
      element: <Detail />,
    },
  ]);

  return (
    <>
      {/* <header>Header</header> */}
      <RouterProvider router={router} />
      {/* <footer>Footer</footer> */}
    </>
  );
};

export default App;
