export type Book = {
  _id?: string;
  title: string;
  isbn: string;
  author: string;
  description: string;
  published_date: string;
  publisher: string;
};

export type AddUpdateBook = {
  book: Book;
  onSuccess: () => void;
  onFail: (err: string) => void;
};

export type DeleteBook = {
  id: string;
  onSuccess: () => void;
  onFail: (err: string) => void;
}