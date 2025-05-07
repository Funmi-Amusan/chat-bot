import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Spinner = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size="3rem" style={{ color: '#65558F' }} />
      </Box>
    </div>
  );
}

export default Spinner;
