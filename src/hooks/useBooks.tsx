import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AddUpdateBook, Book } from '../types/Book';
import useBook from "./api/useBook";

interface Context {
	books: Book[];
	addBook: (params: AddUpdateBook) => void;
  editBook: (params: AddUpdateBook) => void;
  removeBook: (params: AddUpdateBook) => void
  isLoading: boolean;
	setLoading: (isLoading: boolean) => void;
}

const BookContext = createContext({
	books: [] as any,
	addBook: (params: AddUpdateBook) => {},
  editBook: (params: AddUpdateBook) => {},
  removeBook: (params: AddUpdateBook) => {},
  isLoading: false,
	setLoading: (isLoading: boolean) => {},
});

export function BookProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(false);
	const [books, setBooks] = useState<Book[]>([] as any);
  const {
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  } = useBook();

  const getBooks = useCallback(async () => {
    setLoading(true);
    const booksData = await fetchBooks();
    setBooks(booksData);
    setLoading(false);
  }, [setBooks, setLoading, fetchBooks]);

  const addBook = useCallback(({ book, onSuccess, onFail }: AddUpdateBook) => {
    setLoading(true);
    createBook({
      book,
      onSuccess: async () => {
        await getBooks();
        onSuccess();
      },
      onFail: (err) => {
        setLoading(false);
        onFail(err);
      },
    });
  }, [setLoading, createBook, getBooks]);

  const editBook = useCallback(({ book, onSuccess, onFail }: AddUpdateBook) => {
    setLoading(true);
    updateBook({
      book,
      onSuccess: async () => {
        await getBooks();
        onSuccess();
      },
      onFail: (err) => {
        setLoading(false);
        onFail(err);
      },
    });
  }, [setLoading, getBooks, updateBook]);

  const removeBook = useCallback(({ book, onSuccess, onFail }: AddUpdateBook) => {
    setLoading(true);
    deleteBook({
      id: book._id || '',
      onSuccess: async () => {
        await getBooks();
        onSuccess();
      },
      onFail: (err) => {
        setLoading(false);
        onFail(err);
      },
    });
  }, [setLoading, deleteBook, getBooks]);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      books,
      addBook,
      editBook,
      removeBook,
      isLoading,
      setLoading
    }),
    [
      books,
      addBook,
      editBook,
      removeBook,
      isLoading,
      setLoading,
    ]
  );

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BookContext) as Context;
};
