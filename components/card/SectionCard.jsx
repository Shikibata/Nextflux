import styles from "./SectionCard.module.css";
import Card from "@/components/card/Card";
import Link from "next/link";
export default function SectionCard(props) {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <Card
                imgUrl={`https://image.tmdb.org/t/p/w500${video?.poster_path}`}
                size={size}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
