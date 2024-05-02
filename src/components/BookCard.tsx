import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import '../App.css';
import { Book } from '../types/Book';

type Props = {
  book: Book;
  handleEdit: () => void;
  handleDelete: () => void;
};

const BookCard = ({ book, handleEdit, handleDelete }: Props) => {
  return (
    <Grid item xs={4} sm={4} md={3}>
      <Card>
        <CardMedia
          image='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
          sx={{ height: 200, width: '100%' }}
          title={book.title}
        />
        <CardContent sx={{ p: 3, pb: 0 }}>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant='h6'
            color="text.disabled"
          >
            {book.author}
          </Typography>
          <Box
            component="p"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {book.description}
          </Box>
        </CardContent>
        <CardActions sx={{ px: 3, py: 2 }}>
          <Button 
            color="secondary"
            variant="outlined"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookCard;
