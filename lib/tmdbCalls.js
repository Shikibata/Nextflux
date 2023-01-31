async function getPopularShow() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function getPopularMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`)
  const data = await res.json();
  return data.results;
}
async function getAnticipatedMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&region=US`)
  const data = await res.json();
  return data.results;
}
export {getPopularShow, getPopularMovie, getAnticipatedMovie}




