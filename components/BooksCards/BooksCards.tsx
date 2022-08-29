import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppContext } from "../../context/state";
import { getAllBooks } from "../../graphql/queries";
import styles from "./BooksCards.module.css";

// Components:
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
              <div key={book.id} className={styles.bookCard} onClick={() => setSelectedBookID(book.id)}>
                {book.name}
              </div>
            );
          })}
        </div>
        <AddBook refetch={() => getBooks()} />
      </div>
    );
  else if (loading) return <p>loading...</p>;
  else if (error) return <p>Some error occurred {error.message}</p>;
  else return <AddBook refetch={() => getBooks()} />;
}
