import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { useBooks } from "../hooks/useBooks";
import { Book } from "../types/Book";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  isEdit: boolean;
  selectedBook?: Book | null;
}

const emptyBook = {
  title: "",
  isbn: "",
  author: "",
  description: "",
  published_date: "",
  publisher: "",
};

const CreateBookModal = ({isOpen, handleClose, isEdit, selectedBook}: Props) => {
  const { addBook, editBook, isLoading } = useBooks();

  const [book, setBook] = useState<Book>(emptyBook);
  
  useEffect(() => {
    if (selectedBook) {
      const date = new Date(selectedBook.published_date);
      const publishedDate = date.toISOString().substring(0,10);
      console.log({date, publishedDate})
      setBook({
        ...selectedBook,
        published_date: publishedDate,
      });
    } else {
      setBook(emptyBook);
    }
  }, [selectedBook]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSuccess = useCallback(() => {
    setBook(emptyBook);
    handleClose();
  }, [handleClose]);

  const onFail = useCallback((err: string) => {
    console.log({err});
    handleClose();
  }, [handleClose]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({book})
    if (isEdit) {
      editBook({ book, onSuccess, onFail });
    } else {
      addBook({ book, onSuccess, onFail });
    }
  }, [book, addBook, editBook, isEdit, onFail, onSuccess]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 600},
        bgcolor: 'common.white',
        borderRadius: 2,
        boxShadow: 24,
        py: 3,
      }}>
        <Typography variant="h4" sx={{ m: 3 }}>
          {`${isEdit ? 'Edit' : 'Add'} Book`}
        </Typography>
        <Divider />
        <Box p={3} display="flex" flexDirection="column">
          <form noValidate onSubmit={onSubmit}>
            <TextField
              type="text"
              placeholder="Title of the Book"
              name="title"
              variant="outlined"
              value={book.title}
              onChange={onChange}
              sx={{ width: '100%' }}
            />
            <TextField
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={onChange}
              sx={{ mt: 2, width: '100%' }}
            />
            <TextField
              type="text"
              placeholder="Author"
              name="author"
              value={book.author}
              onChange={onChange}
              sx={{ mt: 2, width: '100%' }}
            />
            <TextField
              type="text"
              placeholder="Describe this book"
              name="description"
              value={book.description}
              onChange={onChange}
              multiline
              rows={4}
              sx={{ mt: 2, width: '100%' }}
            />
            <TextField
              type="date"
              placeholder="published_date"
              name="published_date"
              value={book.published_date}
              onChange={onChange}
              sx={{ mt: 2, width: '100%' }}
            />
            <TextField
              type="text"
              placeholder="Publisher of this Book"
              name="publisher"
              value={book.publisher}
              onChange={onChange}
              sx={{ mt: 2, width: '100%' }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 2, mt: 3 }}
              disabled={isLoading}
              {...(isLoading && {
                startIcon: <CircularProgress size={20} />
              })}
            >
              {isEdit ? 'Update' : 'Submit'}
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateBookModal;
