function fethcMovies(page) {
  const KEY = "1c3ed917e270a5c333ac553de7aecf76";
  const URL_TRENDING_DAY = "https://api.themoviedb.org/3/trending/all/day";

  return fetch(
    `${URL_TRENDING_DAY}?api_key=${KEY}&language=ru&page=${page}`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error("Такого запроса нет или некоректный запрос")
    );
  });
}

function fetchOneMovie(idMovie) {
  const URL_ONE_MOVIE = "https://api.themoviedb.org/3/movie/";
  const KEY = "1c3ed917e270a5c333ac553de7aecf76";

  return fetch(`${URL_ONE_MOVIE}${idMovie}?api_key=${KEY}&language=ru`).then(
    (r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject(
        new Error("Такого фильма нет или некоректный запрос")
      );
    }
  );
}

function fetchCast(idMovie) {
  const URL_CAST_MOVIE = "https://api.themoviedb.org/3/movie/";
  const KEY = "1c3ed917e270a5c333ac553de7aecf76";

  return fetch(
    `${URL_CAST_MOVIE}${idMovie}/credits?api_key=${KEY}&language=ru&page=1`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error("Такой страницы нет или некоректный запрос")
    );
  });
}

function fetchReviews(idMovie) {
  const KEY = "6afe4b8475996e1addf24229c39e89a6";
  const GENERAL_LINK_ONE_MOVIE = "https://api.themoviedb.org/3/movie/";

  return fetch(
    `${GENERAL_LINK_ONE_MOVIE}${idMovie}/reviews?api_key=${KEY}&language=ru`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error("Такой страницы нет или некоректный запрос")
    );
  });
}

function fetchSearch(page, name) {
  const KEY = "6afe4b8475996e1addf24229c39e89a6";
  const GENERAL_LINK_TRENDS = "https://api.themoviedb.org/3";
  return fetch(
    `${GENERAL_LINK_TRENDS}/search/movie?api_key=${KEY}&query=${name}&language=ru&page=${page}&include_adult=false`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такого запроса не існує"));
  });
}

const api = {
  fethcMovies,
  fetchOneMovie,
  fetchCast,
  fetchReviews,
  fetchSearch,
};

export default api;

// пример запроса https://api.themoviedb.org/3/movie/550?api_key=1c3ed917e270a5c333ac553de7aecf76&language=ru

// fethcMovies(1).then(console.log);

// /movie/{movie_id}
