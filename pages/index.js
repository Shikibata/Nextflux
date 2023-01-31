import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/Navbar'
import SectionCard from '@/components/card/SectionCard'
import { magic } from '@/lib/magic-client'
import { getAnticipatedMovie, getPopularMovie, getPopularShow} from "@/lib/tmdbCalls";

export async function getServerSideProps() {

  return {
    props: {popularShow : await getPopularShow(), popularMovie : await getPopularMovie(), anticipatedMovie : await getAnticipatedMovie()},
  }
}
export default function Home({
  popularShow, popularMovie, anticipatedMovie
})
{
  console.log(popularShow)
  return (
    <>
      <Head>
        <title>Nextflux</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Hero
          title="Vikings Valhalla"
          subTitle="a very cute dog"
          imgUrl="/assets/hero-img.jpg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Popular Show" videos={popularShow} size="large" />
          <SectionCard title="Popular Movie" videos={popularMovie} size="large" />
          <SectionCard title="Anticipated Movie" videos={anticipatedMovie} size="large" />
        </div>
      </div>
    </>
  )
}
