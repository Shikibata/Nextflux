import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./Search.module.css";

export default function Index() {

  const [results, setResults] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f3b77a29e42a69f45d60d8a4695d81df&query=${q}`
      );
      setResults(response.data.results);
    };

    if (q) {
      search();
    }
  }, [q]);

  return (
    <div className={styles.container}>
      {results.map((result) => (
        <p key={result.id}>{result.title}</p>
      ))}
    </div>
  );
}
