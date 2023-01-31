import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "./video.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/navbar/Navbar";
import Image from "next/image";

Modal.setAppElement("#__next");

export default function Video() {
  const router = useRouter();
  const API_KEY = "AIzaSyCS528ImN923Y3hgZRRbQuFldYkPzsqNYU";
  const id = router.query.id;
  const [video, setVideo] = useState();
  const [infos, setInfos] = useState('');
  const [cast, setCast] = useState([]);

  async function getInfos() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f3b77a29e42a69f45d60d8a4695d81df&language=en-US`
    );
    setInfos(response.data)
    return response.data;
  }
  useEffect(() => {
    async function getVideo() {
      const infos = await getInfos();
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=id&q=${infos.title}+movie trailer&type=video&key=${API_KEY}`
      );
      setVideo(response.data.items[0].id.videoId);
    }
    getVideo();
  }, []);

  useEffect(() => {
  async function getCast(){
     const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f3b77a29e42a69f45d60d8a4695d81df&language=en-US`)
    setCast(response.data.cast)
    return response.data;
    }
    getCast()
  }, []);

  console.log(cast)
  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="60%"
          src={`https://www.youtube.com/embed/${video}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{infos.release_date}</p>
              <p className={styles.title}>{infos.title}</p>
              <p className={styles.description}>{infos.overview}</p>
            </div>
            <div className={styles.col2}>
              {cast.slice(0, 12).map((actor) => (
                <li className={styles.li} key={actor.id}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                    alt={actor.name}
                    width="150"
                    height="200"
                    sizes="auto"
                    className={styles.cardImg}
                  />
              {actor.name} as {actor.character}
                </li>
                ))}
              {/*
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>*/}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
