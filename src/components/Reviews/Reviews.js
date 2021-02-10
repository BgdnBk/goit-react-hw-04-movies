import React, { Component } from "react";
import Api from "../../service/FetchAPI";

export default class Cast extends Component {
  state = {
    review: null,
    error: "",
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    this.fetchAPI(movieId);
  }

  fetchAPI(id) {
    Api.fetchReviews(id)
      .then((review) => {
        this.setState({ review: review });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  render() {
    const { review } = this.state;
    return review && review.results.length > 0 ? (
      <ul>
        {review.results.map(({ author, id, content }) => (
          <li key={id}>
            <p>Автор: {author}</p> <p>{content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>Обзор ещё не написали</p>
    );
  }
}
