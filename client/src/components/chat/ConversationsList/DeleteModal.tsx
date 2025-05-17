'use client'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  title: string;
  loading: boolean;
  isDeleting: boolean;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', 
  maxWidth: 400,
  boxShadow: 24,
  borderRadius: '24px', 
  p: 4,
};

const DeleteModal = ({ isOpen, onClose, onDelete, title, loading, isDeleting }: DeleteModalProps) => {
  return (
    <Modal
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: {
            backdropFilter: 'blur(10px)', 
          },
        },
      }}
    >
      <Fade in={isOpen}>
      <Box sx={modalStyle} className="bg-neutral-200 dark:bg-neutral-800">
          <Typography
            id="delete-modal-title"
            variant="h6"
            component="h3"
            sx={{ marginBottom: 2, textAlign: 'center', fontWeight: '600' }}
            className='dark:text-neutral-200 text-neutral-700'
          >
         Delete {title}?
          </Typography>

          <Typography
            id="delete-modal-text"
            variant="body1"
            component="p"
            sx={{ marginBottom: 2, textAlign: 'center', fontSize: '12' }}
            className='dark:text-neutral-200 text-neutral-700'
          >
           This will delete prompts and responses from your ChatBot Activity.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}> 
            <Button
              style={{
                color: 'black',
                backgroundColor: '#e5e5e5',
                borderRadius: '8px',
                flex: 1,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
              }}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="py-4"
              style={{
                color: 'white',
                backgroundColor: '#B3261E',
                borderRadius: '8px',
                flex: 1,
              }}
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;