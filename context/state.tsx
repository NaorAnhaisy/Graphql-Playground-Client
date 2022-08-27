import { createContext, useContext, useState } from "react";
import { Book, Author } from "../types/Book";

interface Props {
  children?: React.ReactNode;
}

type AppContextType = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
  author: Author[] | null;
  setAuthors: React.Dispatch<React.SetStateAction<Author[] | null>>;
};

const initialAppContextState = {
  books: null,
  setBooks: () => {},
  author: null,
  setAuthors: () => {},
};

const AppContext = createContext<AppContextType>(initialAppContextState);

export function AppWrapper({ children }: Props) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [author, setAuthors] = useState<Author[] | null>(null);

  return (
    <AppContext.Provider value={{ books, setBooks, author, setAuthors }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
