import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import {
  selectPokemonsCount,
  fetchPokemons,
  selectNexlUrl,
} from "@app/store/features/pokemonsSlice";
import { fetchAllPokemons } from "@app/store/features/searchSlice";
import { Home } from "@app/pages/Home/home.component";
import { Detail } from "@app/pages/Detail/detail.component";

const App = () => {
  const dispatch = useAppDispatch();
  const nextUrl = useAppSelector(selectNexlUrl);
  const pokemonsCount = useAppSelector(selectPokemonsCount);
  console.log("pokemonsCount", pokemonsCount);

  useEffect(() => {
    if (nextUrl) {
      dispatch(fetchPokemons(nextUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pokemonsCount > 0) {
      dispatch(fetchAllPokemons(pokemonsCount));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsCount]);

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
