import axios from "axios";

import { AddUpdateBook, DeleteBook } from "../../types/Book";

const API_URL = process.env.REACT_APP_API_URL;

export default function useBook() {
  const createBook = ({ book, onSuccess, onFail }: AddUpdateBook) => {
    setTimeout(() => {
      axios.post(`${API_URL}/books`, book)
        .then((res) => {
          onSuccess();
        })
        .catch((err) => {
          console.error(err);
          onFail(err?.message || "Error creating a book.");
        });
    }, 3000);
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books`)
      return res.data;
    } catch (err) {
      return [];
    }
  };

  const fetchBook = async (id: string) => {
    try {
      const res = await axios.get(`${API_URL}/books/${id}`)
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateBook = async ({ book, onSuccess, onFail }: AddUpdateBook) => {
    try {
      const res = await axios.put(`${API_URL}/books/${book._id}`, book);

      if (res.status === 200) {
        onSuccess();
      } else {
        onFail(res.data.msg || res.data.error || 'Error updating the book.')
      }
    } catch (err) {
      console.error(err);
      onFail(err.message || 'Error updating the book.');
    }
  };

  const deleteBook = async ({ id, onSuccess, onFail }: DeleteBook) => {
    try {
      const res = await axios.delete(`${API_URL}/books/${id}`)
      if (res.status === 200) {
        onSuccess();
      } else {
        onFail(res.data.msg || res.data.error || 'Error deleting the book.')
      }
    } catch (err) {
      console.error(err);
      onFail(err.message || 'Error deleting the book.');
    }
  };

  return { fetchBooks, fetchBook, createBook, updateBook, deleteBook };
};
