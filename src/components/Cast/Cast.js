import React, { Component } from "react";
import Api from "../../service/FetchAPI";

export default class Cast extends Component {
  state = {
    cast: null,
    error: "",
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    this.fetchAPI(movieId);
  }

  fetchAPI(movieId) {
    Api.fetchCast(movieId)
      .then((actor) => {
        this.setState({ cast: actor.cast });
        console.log(this.state.cast);
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { cast } = this.state;
    return (
      <ul>
        {cast &&
          cast.map(({ original_name, character, id, profile_path }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt=""
              />
              <p>{original_name}</p>
              <p>{character}</p>
            </li>
          ))}
      </ul>
    );
  }
}
