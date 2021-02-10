import React, { Component, lazy, Suspense } from "react";
import { Link, Route } from "react-router-dom";
import Api from "../service/FetchAPI";
import Loader from "../components/Loader/Loader";
import routes from "../routes";

const Cast = lazy(() =>
  import(
    "../components/Cast/Cast" /* webpackChunkName: "movies-details-page" */
  )
);

const Reviews = lazy(() =>
  import(
    "../components/Reviews/Reviews" /* webpackChunkName: "movies-details-page" */
  )
);

class MovieDetailsPage extends Component {
  state = {
    movie: null,
    error: null,
    loader: false,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.fetchAPI(movieId);
  }

  fetchAPI(movieId) {
    this.setState({ loader: true });

    Api.fetchOneMovie(movieId)
      .then((movie) => {
        this.setState({ movie: movie });
      })
      .catch((error) => {
        this.setState({ error: error });
      })
      .finally(() => {
        this.setState({ loader: false });
      });
  }

  goBackPage = () => {
    const { location, history } = this.props;
    history.push(location?.state?.from ?? "/");
  };

  render() {
    const { loader, movie } = this.state;
    const { match } = this.props;

    return (
      <>
        <div>
          {loader && <Loader />}
          <img
            src={movie && `https:image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt=""
            width="300"
            heigh="400"
          ></img>

          <div>
            <button type="button" onClick={this.goBackPage}>
              Назад
            </button>

            <div>
              <h3>Жанр</h3>
              <ul className="ul-genres">
                {movie &&
                  movie.genres.map(({ id, name }) => <li key={id}>{name} </li>)}
              </ul>
            </div>
            <div>
              <h2>Описание</h2>
              <p>{movie && movie.overview}</p>
            </div>

            <div>
              <Link className="linkCast" to={`${match.url}/cast`}>
                Актёры
              </Link>
              <br />
              <Link className="linkReviews" to={`${match.url}/reviews`}>
                Обзор
              </Link>

              <Suspense fallback={<Loader />}>
                <Route path={`${match.path}/cast`} component={Cast} />
                <Route />
                <Route path={`${match.path}/reviews`} component={Reviews} />
              </Suspense>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
