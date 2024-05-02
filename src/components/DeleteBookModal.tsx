import React, { useCallback } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from "@mui/material";

import { useBooks } from "../hooks/useBooks";
import { Book } from "../types/Book";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  selectedBook?: Book | null;
};

const DeleteBookModal = ({isOpen, handleClose, selectedBook}: Props) => {
  const { removeBook, isLoading } = useBooks();

  const onSuccess = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const onFail = useCallback((err: string) => {
    handleClose();
  }, [handleClose]);

  const onDelete = useCallback(() => {
    if (selectedBook) {
      removeBook({ book: selectedBook, onSuccess, onFail });
    }
  }, [selectedBook, removeBook, onFail, onSuccess]);

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
        <Typography variant="h5" sx={{ m: 2 }}>
          Confirm Delete Book
        </Typography>
        <Divider />
        <Box p={3} display="flex" flexDirection="column">
          <Typography variant="body1">
            {`Are you sure you want to delete ${selectedBook?.title}? You cannot undo this action.`}
          </Typography>
          <Box display="flex">
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ py: 2, mt: 3 }}
              disabled={isLoading}
              {...(isLoading && {
                startIcon: <CircularProgress size={20} />
              })}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ py: 2, mt: 3, ml:3 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteBookModal;
