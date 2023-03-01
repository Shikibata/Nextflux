import styles from "./Hero.module.css";
import { FaHeart, FaPlay } from "react-icons/fa";
import { useRouter } from "next/router";
export default function Hero(props) {
  const { title, subTitle, imgUrl } = props;
  const router = useRouter();

  const HandleOnPlay = () => {
    router.push(`video/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subtitle}>{subTitle}</h3>
          <div className={styles.playButtonWrapper}>
            <button className={styles.playButton} onClick={HandleOnPlay}>
              <FaPlay color={"black"} />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.heroImage}
        style={{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), var(--black40)), linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--black40)), url("${imgUrl}")`,
        }}
      ></div>
    </div>
  );
}
