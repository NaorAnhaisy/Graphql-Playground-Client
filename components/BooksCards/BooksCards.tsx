import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getAllBooks } from "../../graphql/queries";
import BookDetails from "../BookDetails/BookDetails";

export default function Books() {
  const { data, error, loading } = useQuery(getAllBooks);
  const [selectedBook, setSelectedBook] = useState(null);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Some error occurred {error.message}</p>;

  return (
    <div>
      {data?.books?.map((book: any) => {
        return (
          <div key={book.id} onClick={() => setSelectedBook(book.id)}>
            {book.name}
          </div>
        );
      })}
      {selectedBook && <BookDetails bookID={selectedBook} />}
    </div>
  );
}
