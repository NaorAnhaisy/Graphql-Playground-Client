import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAppContext } from "../context/state";
import { useLazyQuery } from "@apollo/client";
import { getAllBooks } from "../graphql/queries";
import { Row, Col } from "react-bootstrap";

// Components:
import BooksCards from "../components/BooksCards/BooksCards";
import BookDetails from "../components/BookDetails/BookDetails";

const Home: NextPage = () => {
  const { setBooks, selectedBookID } = useAppContext();
  const [getBooks, { data, error, loading }] = useLazyQuery(getAllBooks, {
    fetchPolicy: "network-only",
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data) setBooks(data.books);
  }, [data, setBooks]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Library Graphql App</title>
        <meta name="description" content="Library Graphql App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.mainTitle}>Welcome to the Library Graphql App</h1>
        <Row className={styles.booksRow}>
          <Col sm={12} md={4} className={styles.booksCardsColumn}>
            <BooksCards getBooks={getBooks} loading={loading} error={error} />
          </Col>
          <Col sm={12} md={8} className={styles.bookDetailsColumn}>
            {selectedBookID && <BookDetails bookID={selectedBookID} refetch={() => {}} />}
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Home;
