import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "./video.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/navbar/Navbar";

Modal.setAppElement("#__next");

export default function Video() {
  const router = useRouter();
  const API_KEY = "AIzaSyCS528ImN923Y3hgZRRbQuFldYkPzsqNYU";
  const id = router.query.id;
  const [video, setVideo] = useState();
  const [infos, setInfos] = useState();

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
      console.log(infos);
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=id&q=${infos.title}+movie trailer&type=video&key=${API_KEY}`
      );
      setVideo(response.data.items[0].id.videoId);
    }
    getVideo();
  }, []);


  console.log(infos)
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
      </Modal>
    </div>
  );
}
