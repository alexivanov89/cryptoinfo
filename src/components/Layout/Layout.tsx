import { Box } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

const Layout = () => {
  return (
    <Box
      sx={{ backgroundColor: '#14262a', minHeight: '100vh', color: 'white' }}
    >
      <Header />
      <main>
        <Suspense fallback={<div> ... Загрузка</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Box>
  );
};

export default Layout;
