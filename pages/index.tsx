import type { NextPage } from "next";
import Head from "next/head";
import AddBook from "../components/AddBook/AddBook";
import BooksCards from "../components/BooksCards/BooksCards";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Library Graphql App</title>
        <meta name="description" content="Library Graphql App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BooksCards />
        <AddBook />
      </main>
    </div>
  );
};

export default Home;
