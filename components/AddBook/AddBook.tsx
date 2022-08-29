import { useMutation } from "@apollo/client";
import { useState } from "react";
import { addBookMutation } from "../../graphql/queries";
import styles from "./AddBook.module.css";

// Components:
import { Row, Col, Form, Button } from "react-bootstrap";
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
    <Form className={styles.addBookForm} onSubmit={submitForm}>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Book's name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col sm={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Book's genre"
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <AuthorsSelect
        onChangeAuthor={(authorID: String) => setAuthorID(authorID)}
      />
      <Button className={styles.submitBtn} type="submit">Add Book</Button>
    </Form>
  );
}
