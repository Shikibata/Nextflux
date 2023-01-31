async function getPopularMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results;
}
async function getAnticipatedMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&region=US&append_to_response=credits`
  );
  const data = await res.json();
  return data.results;
}
async function getDisneyMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=primary_release_date.desc&page=1&with_companies=2|3475|15935`
  );
  const data = await res.json();
  return data.results;
}

async function getGhibliMovie() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&with_companies=10342`
  );
  const data = await res.json();
  return data.results;
}
export {getPopularMovie, getAnticipatedMovie, getDisneyMovie, getGhibliMovie};
