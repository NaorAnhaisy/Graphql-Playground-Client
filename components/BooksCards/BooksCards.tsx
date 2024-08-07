import styles from "./BooksCards.module.css";
import { useAppContext } from "../../context/state";
import { LineWave } from "react-loader-spinner";
import AddBook from "../AddBook/AddBook";
import { ApolloError } from "@apollo/client";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

interface Props {
  getBooks: Function;
  loading: boolean;
  error?: ApolloError;
}

export default function BooksCards({ getBooks, loading, error }: Props) {
  const { books, setSelectedBookID } = useAppContext();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
      <div ref={parent}>
        <LineWave
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave"
          visible={true}
        />
      </div>
    );
  else if (error) return <p>Some error occurred {error.message}</p>;
  else return <AddBook refetch={() => getBooks()} />;
}
