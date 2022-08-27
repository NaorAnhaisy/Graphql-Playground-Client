import { useQuery } from "@apollo/client";
import { getSpecificBook } from "../../graphql/queries";

interface Props {
    bookID: string;
};

export default function Books({ bookID }: Props) {
  const { data, error, loading } = useQuery(getSpecificBook, {
    variables: { bookID },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Some error occurred {error.message}</p>;

  return (
    <div>
      <h1>{data.book.name}</h1>
    </div>
  );
}
