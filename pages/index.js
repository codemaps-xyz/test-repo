import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Container, Flex, Heading, Text, Grid } from '@radix-ui/themes'
// import MapCard from '../components/MapCard'
// import Navbar from '@/components/NavBar'
import styles from '@/styles/Home.module.css'

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
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      const res = await fetch( `${baseUrl}/api/test`);

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