import React, { useState } from 'react';
import { Box, Button, Divider, Grid, LinearProgress, Typography } from '@mui/material';

import BookCard from '../components/BookCard';
import { useBooks } from '../hooks/useBooks';
import CreateBookModal from '../components/CreateBookModal';
import DeleteBookModal from '../components/DeleteBookModal';
import { Book } from '../types/Book';

function ShowBookList() {
  const [isOpenSaveModal, setOpenSaveModal] = useState(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>();
  const { books, isLoading } = useBooks();

  const handleAdd = () => {
    setEditing(false);
    setSelectedBook(null);
    setOpenSaveModal(true);
  };

  const handleEdit = (book: Book) => {
    console.log({book})
    setSelectedBook(book);
    setEditing(true);
    setOpenSaveModal(true);
  };

  const handleDelete = (book: Book) => {
    console.log({book})
    setSelectedBook(book);
    setOpenDeleteModal(true);
  };

  return (
    <Box display="flex" flexDirection="column" py={4} mb={4}>
      <CreateBookModal
        isOpen={isOpenSaveModal}
        handleClose={() => setOpenSaveModal(false)}
        isEdit={isEdit}
        selectedBook={selectedBook}
      />
      <DeleteBookModal
        isOpen={isOpenDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        selectedBook={selectedBook}
      />
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'start', sm: "center" }}
      >
        <Typography variant='h3'>Books List</Typography>

        <Box>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{
              py: 2,
              px: 3,
              mt: { xs: 2, sm: 0 },
            }}
          >
            Add New Book
          </Button>
        </Box>
      </Box>
      <br />
      <Divider />
      <br />

      {isLoading && <LinearProgress />}

      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        {!!books.length ? (
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {books.map((book, k) =>
              <BookCard
                book={book}
                key={k}
                handleEdit={() => handleEdit(book)}
                handleDelete={() => handleDelete(book)}
              />
            )}
          </Grid>
        ) : (
          !isLoading && <Typography variant='body1'>No books found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default ShowBookList;
