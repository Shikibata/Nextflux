import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./Search.module.css";
import Card from "@/components/card/Card";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

export default function Index() {

  const [results, setResults] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3b77a29e42a69f45d60d8a4695d81df&query=${q}`
      );
      setResults(response.data.results.sort((a, b) => b.popularity - a.popularity))
    };
    if (q) {
      search();
    }
  }, [q]);

  return (

    <div className={styles.container}>
      <Navbar />
      {results.map((movie) => (
        <Link href={`/video/${movie.id}`} key={movie.id}>
        <Card imgUrl={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                size={"medium"}/>
        </Link>
      ))}
    </div>
  );
}
