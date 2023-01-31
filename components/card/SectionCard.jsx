import styles from './SectionCard.module.css'
import Card from '@/components/card/Card'
export default function SectionCard(props) {
  const { title, videos = [], size } = props
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return <Card key={index} imgUrl={`https://image.tmdb.org/t/p/w500${video?.poster_path}`} size={size} />
        })}
      </div>
    </section>
  )
}
