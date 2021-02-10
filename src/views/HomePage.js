import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../service/FetchAPI";

class HomePage extends Component {
  state = {
    listMovie: [],
    page: 1,
    error: "",
    loader: false,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI() {
    const { page } = this.state;

    this.setState({ loader: true });

    Api.fethcMovies(page)
      .then((responseListMovie) => {
        this.setState({ listMovie: responseListMovie.results });
      })
      .then(() => {
        this.setState((prevPage) => ({ page: prevPage.page + 1 }));
      })
      .catch((error) => this.setState({ error: error }))
      .finally(() => this.setState({ loader: false }));
  }

  render() {
    const { listMovie } = this.state;

    return (
      <>
        <ul>
          {listMovie &&
            listMovie.map(({ id, title, name }) => (
              <li key={id}>
                <Link to={`/movies/${id}`}>{title ?? name}</Link>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default HomePage;
