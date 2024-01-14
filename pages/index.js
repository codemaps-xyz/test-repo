import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Container, Flex, Heading, Text, Grid } from '@radix-ui/themes'
// import MapCard from '../components/MapCard'
// import Navbar from '@/components/NavBar'
import styles from '@/styles/Home.module.css'
import { headers } from '@/next.config'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={styles.main}>
``      <h1>Hello World</h1>
      </main>
    </>
  )
}

// ... getStaticProps remains unchanged ...

export async function getStaticProps(context) {
  try {
    console.log('CONTEXT : ',context)
    console.log("getStaticProps started");
    // const cookieStore = cookies()
    // const cookieString = cookieStore.getAll()
    const cookies = context.req.headers.cookie;
    console.log( cookieString )

    const baseUrl = 'https://test-repo-1py6vevk2-codemaps-projects.vercel.app';
    console.log("Base URL:", baseUrl);

    const apiEndpoint = `${baseUrl}/api/test`;
    console.log("Fetching data from:", apiEndpoint);
    //const options = { headers: { Cookie : '_vercel_jwt=' + 'cookies' } };
    const res = await fetch(apiEndpoint);

    if (!res.ok) {
      console.error("Failed to fetch data. Status:", res.status);
      throw new Error(`Failed to fetch paths, status: ${res.status}`);
    }

    const paths = await res.json();
    console.log("Fetched data:", paths);

    return {
      props: { paths },
    };

  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
}
