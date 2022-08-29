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
  selectedBookID: string | null;
  setSelectedBookID: React.Dispatch<React.SetStateAction<string | null>>;
};

const initialAppContextState = {
  books: null,
  setBooks: () => {},
  authors: null,
  setAuthors: () => {},
  selectedBookID: null,
  setSelectedBookID: () => {},
};

const AppContext = createContext<AppContextType>(initialAppContextState);

export function AppWrapper({ children }: Props) {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [authors, setAuthors] = useState<Author[] | null>(null);
  const [selectedBookID, setSelectedBookID] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        authors,
        setAuthors,
        selectedBookID,
        setSelectedBookID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
