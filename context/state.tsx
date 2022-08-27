import { createContext, useContext, useState } from "react";
import { Book, Author } from "../types/types";

interface Props {
  children?: React.ReactNode;
}

type AppContextType = {
  books: Book[] | null;
  setBooks: React.Dispatch<React.SetStateAction<Book[] | null>>;
  authors: Author[] | null;
  setAuthors: React.Dispatch<React.SetStateAction<Author[] | null>>;
};

const initialAppContextState = {
  books: null,
  setBooks: () => {},
  authors: null,
  setAuthors: () => {},
};

const AppContext = createContext<AppContextType>(initialAppContextState);

export function AppWrapper({ children }: Props) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [authors, setAuthors] = useState<Author[] | null>(null);

  return (
    <AppContext.Provider value={{ books, setBooks, authors, setAuthors }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
