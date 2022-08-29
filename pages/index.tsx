import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAppContext } from "../context/state";
import { Row, Col } from "react-bootstrap";

// Components:
import BooksCards from "../components/BooksCards/BooksCards";
import BookDetails from "../components/BookDetails/BookDetails";

const Home: NextPage = () => {
  const { selectedBookID } = useAppContext();

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
            <BooksCards />
          </Col>
          <Col sm={12} md={8} className={styles.bookDetailsColumn}>
            {selectedBookID && <BookDetails bookID={selectedBookID} />}
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Home;
