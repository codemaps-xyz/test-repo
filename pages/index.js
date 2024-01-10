import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Container, Flex, Heading, Text, Grid } from '@radix-ui/themes'
import MapCard from '../components/MapCard'
// import Navbar from '@/components/NavBar'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ paths }) {

  const sortedPaths = paths.sort((a, b) => {
    if (a.isComingSoon && !b.isComingSoon) {
      return 1;
    }
    if (!a.isComingSoon && b.isComingSoon) {
      return -1;
    }
    return 0;
  });

  return (
    <>
      <Head>
        <title>Codemaps</title>
        <meta name="description" content="Codemaps Learning Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container size="3" className={styles.mainContainer}>

          <Flex className={styles.flexColumn}>
            <Heading className={styles.heading}>Choose a Map</Heading>
            <Text className={styles.text}>Select a Learning Path to get started!</Text>
          </Flex>

          <Flex className={styles.flexColumnGap}>
            <Grid columns="4" gap="3" width="auto" className={styles.grid}>
              {/* {sortedPaths.map((item, index) => (
                <MapCard key={index} name={item.pathName} level={item.level} tag={item.tags} pathId={item.id} slug={item.slug} isComingSoon={item.isComingSoon} />
              ))} */}
            </Grid>
          </Flex>

        </Container>
      </main>
    </>
  )
}

// ... getStaticProps remains unchanged ...

export async function getStaticProps(context) {

  try {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const res = await fetch( `${baseUrl}/api/paths`);

      if (!res.ok) {
          // Handle HTTP errors
          throw new Error(`Failed to fetch questions, status: ${res.status}`);
      }

      const paths = await res.json();
      return {
        props: { paths },
      };

  } catch (error) {
      console.error(error);
      return { notFound: true };
  }
}