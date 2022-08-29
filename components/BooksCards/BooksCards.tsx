import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
import { getAllBooks } from "../../graphql/queries";

// Components:
import BookDetails from "../BookDetails/BookDetails";
import AddBook from "../AddBook/AddBook";

export default function BooksCards() {
  const [getBooks, { data, error, loading }] = useLazyQuery(getAllBooks, {
    fetchPolicy: "no-cache", // Used for first execution
  });

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const [selectedBook, setSelectedBook] = useState(null);
  const { books, setBooks } = useAppContext();

  useEffect(() => {
    if (data) setBooks(data.books);
  }, [data, setBooks]);

  if (books)
    return (
      <div>
        {books?.map((book: any) => {
          return (
            <div key={book.id} onClick={() => setSelectedBook(book.id)}>
              {book.name}
            </div>
          );
        })}
        {selectedBook && <BookDetails bookID={selectedBook} />}
        <AddBook refetch={() => getBooks()} />
      </div>
    );

  if (loading) return <p>loading...</p>;
  if (error) return <p>Some error occurred {error.message}</p>;
}
