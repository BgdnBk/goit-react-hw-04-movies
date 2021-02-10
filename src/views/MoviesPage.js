import { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../service/FetchAPI";

export default class SearchMovie extends Component {
  state = {
    page: 1,
    movie: null,
    name: "",
    error: "",
  };

  handleChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({ name: value });
    console.log(value);
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.fetchAPI();
  };

  incrementPage() {
    this.setState((prevPage) => ({ page: prevPage.page + 1 }));
  }

  fetchAPI() {
    const { page, name } = this.state;

    Api.fetchSearch(page, name)
      .then((responseMovie) => {
        this.setState({ movie: responseMovie });
        console.log("arr movie", this.state.movie);
      })
      .then(this.incrementPage())
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { match, location } = this.props;
    const { movie, name } = this.state;
    return (
      <>
        <div>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="1"> </label>
            <input
              id="1"
              name="text"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movie"
              value={name}
              onChange={this.handleChange}
            ></input>
            <button type="submit">Поиск</button>
          </form>
          {movie && (
            <div>
              <ul>
                {movie.results.map(({ original_title, id }) => (
                  <li key={id}>
                    {movie && (
                      <Link
                        to={{
                          pathname: `${match.url}/${id}`,
                          state: { from: location },
                        }}
                      >
                        {original_title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}
