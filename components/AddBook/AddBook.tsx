import { useMutation } from "@apollo/client";
import { useState } from "react";
import { addBookMutation } from "../../graphql/queries";

// Components:
import AuthorsSelect from "../AuthorsSelect/AuthorsSelect";

interface Props {
  refetch: Function;
}
export default function AddBook({ refetch }: Props) {
  const [addBook, { data, error, loading }] = useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorID, setAuthorID] = useState<String | null>(null);

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await addBook({ variables: { name, genre, authorID } });
    refetch();
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
