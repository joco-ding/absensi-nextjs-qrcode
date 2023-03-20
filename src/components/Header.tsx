import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import { Menu } from '@mui/icons-material';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  
  return (
    <>
      <AppBar position="fixed" sx={{height:'64px'}}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarOpen}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6">Sistem Absensi</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
    </>
  );
};

export default Header;
