import styles from "./BookDetails.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { getSpecificBook, deleteBookMutation } from "../../graphql/queries";
import { useAppContext } from "../../context/state";
import { Book } from "../../types/types";
import { LineWave } from "react-loader-spinner";
import { Button } from "react-bootstrap";

interface Props {
  bookID: string;
  refetch: Function;
}

interface AuthorBook {
  name: string;
}

export default function BookDetails({ bookID, refetch }: Props) {
  const { books, setBooks, setSelectedBookID } = useAppContext();

  const { data, error, loading } = useQuery(getSpecificBook, {
    variables: { bookID },
  });

  const [deleteBook, { error: deleteBookError, loading: deleteBookLoading }] =
    useMutation(deleteBookMutation);

  function removeBookByID(booksArr: Book[] | null, id: string) {
    return booksArr?.filter((book: Book) => book.id !== id) || booksArr;
  }

  const deleteBookClicked = async () => {
    await deleteBook({ variables: { bookID: data.book.id } });
    if (!loading && !error) {
      setSelectedBookID(null);
      setBooks(removeBookByID(books, data.book.id));
      refetch();
    }
  };

  if (loading)
    return (
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        visible={true}
      />
    );
  if (error) return <p>Some error occurred {error.message}</p>;

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.deleteBookBtn}>
        <Button
          variant="outline-danger"
          className={styles.submitBtn}
          onClick={() => deleteBookClicked()}
        >
          Delete Book
        </Button>
      </div>
      {deleteBookLoading ? (
        <p>loading...</p>
      ) : deleteBookError ? (
        <p>Error occurred while deleting book: {deleteBookError.message}</p>
      ) : (
        <div>
          <h1>{data.book.name}</h1>
          <h3>
            {data.book.author.name} ({data.book.author.age})
          </h3>
          <p>All author&apos;s books:</p>
          <ul>
            {data.book.author.books.map((authorBook: AuthorBook, i: number) => {
              return <li key={i}>{authorBook.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
