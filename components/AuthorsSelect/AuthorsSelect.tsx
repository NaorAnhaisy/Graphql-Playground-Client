import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppContext } from "../../context/state";
import { getAllAuthors } from "../../graphql/queries";

// Components:
import { Form } from "react-bootstrap";

interface Props {
  onChangeAuthor: Function;
}

export default function AuthorsSelect({ onChangeAuthor }: Props) {
  const { data, error, loading } = useQuery(getAllAuthors);
  const { authors, setAuthors } = useAppContext();

  useEffect(() => {
    onChangeAuthor(data?.authors[0].id);
  }, [data, onChangeAuthor]);

  useEffect(() => {
    if (data) setAuthors(data.authors);
  }, [data, setAuthors]);

  if (loading) return <p>loading authors...</p>;
  if (error) return <p>Get authors error! {error.message}</p>;

  return (
    <Form.Select onChange={(e) => onChangeAuthor(e.target.value)}>
      {authors?.map((author: any) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      })}
    </Form.Select>
  );
}
