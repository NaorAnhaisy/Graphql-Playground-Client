import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppContext } from "../../context/state";
import { getAllAuthors } from "../../graphql/queries";

interface Props {
  onChangeAuthor: Function;
}

export default function AuthorsSelect({ onChangeAuthor }: Props) {
  const { data, error, loading } = useQuery(getAllAuthors);
  const { authors, setAuthors } = useAppContext();

  useEffect(() => {
    if (data) setAuthors(data.authors);
  }, [data, setAuthors]);

  if (loading) return <p>loading authors...</p>;
  if (error) return <p>Get authors error! {error.message}</p>;

  return (
    <div>
      <select onChange={(e) => onChangeAuthor(e.target.value)}>
        {authors?.map((author: any) => {
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
