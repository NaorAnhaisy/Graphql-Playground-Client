import { useQuery } from "@apollo/client";
import { getSpecificBook } from "../../graphql/queries";
import styles from "./BookDetails.module.css";

// Components:
import { LineWave } from "react-loader-spinner";
import { useEffect } from "react";

interface Props {
  bookID: string;
}

interface AuthorBook {
  name: string;
}

export default function Books({ bookID }: Props) {
  const { data, error, loading } = useQuery(getSpecificBook, {
    variables: { bookID },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
  );
}
