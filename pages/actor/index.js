import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./Actor.module.css";
import Link from "next/link";
import Card from "@/components/card/Card";

export default function Index() {

  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const {id} = router.query;
  console.log(id)

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f3b77a29e42a69f45d60d8a4695d81df`
      );
      setMovies(response.data.cast.sort((a, b) => b.popularity - a.popularity))
    };

    if (id) {
      fetchMovies();
    }
  }, [id]);

  return (
    <div>
      {movies.map((movie) => (
        <Link href={`/video/${movie.id}`} key={movie.id}>
          <Card
            imgUrl={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            size={"medium"}
          />
        </Link>
      ))}
    </div>
  );
}
