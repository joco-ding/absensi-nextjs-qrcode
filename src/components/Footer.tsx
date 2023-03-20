import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box mt={5}>
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} Aplikasi Absensi
      </Typography>
    </Box>
  );
};

export default Footer;
