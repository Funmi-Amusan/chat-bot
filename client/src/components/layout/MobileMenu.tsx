'use client'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Button, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import ConversationList from '../chat/ConversationsList/ConversationList';

const MobileMenu = () => {

  const list = () => (
    <Box
    sx={{ width: 350, height:'100%', backgroundColor: '#FEF7FF', padding: '16px', overflow: 'scroll' }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
   <ConversationList />
   </Box>
  );

    const [state, setState] = useState({
      right: false,
    });

    const toggleDrawer =
      (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  setState({ ...state, right: open });
      };

  return (
    <>
          <Button onClick={toggleDrawer(true)}>
            <MenuOutlinedIcon style={{ color: 'black' }} />
          </Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </>
  )
}

export default MobileMenu

