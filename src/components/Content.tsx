import React, { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

interface ContentProps {
  children: ReactNode;
}
const Content: React.FC<ContentProps> = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box
      overflow="auto"
      pt="72px"
      pb="8px"
      ml={isDesktop ? "240px" : 0}
      sx={{
        width: isDesktop ? 'calc(100vw - 270px)' : '100%',
        height: 'calc(100vh - 64px)',
      }}
    >
      {children}
    </Box>
  );
};

export default Content;
