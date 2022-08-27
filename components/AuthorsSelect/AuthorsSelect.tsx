import { useQuery } from "@apollo/client";
import { getAllAuthors } from "../../graphql/queries";

interface Props {
  onChangeAuthor: Function;
}

export default function AuthorsSelect({ onChangeAuthor }: Props) {
  const { data, error, loading } = useQuery(getAllAuthors);

  if (loading) return <p>loading authors...</p>;
  if (error) return <p>Get authors error! {error.message}</p>;

  return (
    <div>
      <select onChange={(e) => onChangeAuthor(e.target.value)}>
        {data?.authors?.map((author: any) => {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
