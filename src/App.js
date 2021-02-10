import React, { Suspense, lazy } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "home-page" */)
);

const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "movies-page" */)
);

const MovieDetailsPage = lazy(() =>
  import(
    "./views/MovieDetailsPage" /* webpackChunkName: "movies-details-page" */
  )
);

const NotFound = lazy(() =>
  import("./views/NotFound" /* webpackChunkName: "movies-details-page" */)
);

const App = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/movies/:movieId" component={MovieDetailsPage}></Route>
          <Route path="/movies" component={MoviesPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
