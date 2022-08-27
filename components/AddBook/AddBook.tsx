import { useMutation } from "@apollo/client";
import { useState } from "react";
import { addBookMutation } from "../../graphql/queries";
import AuthorsSelect from "../AuthorsSelect/AuthorsSelect";

export default function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorID, setAuthorID] = useState<String | null>(null);

  const [addBook, { data, error, loading }] = useMutation(addBookMutation);

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addBook({ variables: { name, genre, authorID } });
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Submission error! {error.message}</p>;

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="genre"
          onChange={(e) => setGenre(e.target.value)}
        />
        <AuthorsSelect
          onChangeAuthor={(authorID: String) => setAuthorID(authorID)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
