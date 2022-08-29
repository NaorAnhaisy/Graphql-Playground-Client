import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppContext } from "../../context/state";
import { getAllBooks } from "../../graphql/queries";
import styles from "./BooksCards.module.css";

// Components:
import { LineWave } from "react-loader-spinner";
import AddBook from "../AddBook/AddBook";

export default function BooksCards() {
  const { setSelectedBookID } = useAppContext();
  const [getBooks, { data, error, loading }] = useLazyQuery(getAllBooks, {
    fetchPolicy: "no-cache", // Used for first execution
  });

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const { books, setBooks } = useAppContext();

  useEffect(() => {
    if (data) setBooks(data.books);
  }, [data, setBooks]);

  if (books)
    return (
      <div>
        <div className={styles.booksCards}>
          {books?.map((book: any) => {
            return (
              <div
                key={book.id}
                className={styles.bookCard}
                onClick={() => setSelectedBookID(book.id)}
              >
                {book.name}
              </div>
            );
          })}
        </div>
        <AddBook refetch={() => getBooks()} />
      </div>
    );
  else if (loading)
    return (
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        visible={true}
      />
    );
  else if (error) return <p>Some error occurred {error.message}</p>;
  else return <AddBook refetch={() => getBooks()} />;
}
